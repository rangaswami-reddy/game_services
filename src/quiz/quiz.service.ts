import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz, QuizDocument } from './schemas/quiz.schema';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Model } from 'mongoose';
import { QuestionsService } from 'src/api-questions/questions.service';
import { BotUsersService } from 'src/bot-users/bot-users.service';
import { QuizTemplateService } from 'src/quiz-template/quiz-template.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { ConfigurationsService } from 'src/configurations/configurations.service';

@Injectable()
export class QuizService {
  constructor(
    @Inject(forwardRef(() => ConfigurationsService))
    private readonly configurationsService: ConfigurationsService,
    @Inject(forwardRef(() => BotUsersService))
    private readonly botUsersService: BotUsersService,
    @InjectModel(Quiz.name) private QuizModel: Model<QuizDocument>,
    private readonly helpersService: HelpersService,
    private readonly questionsService: QuestionsService,
    private readonly quizTemplateService: QuizTemplateService,
  ) {}

  async join(bodyDto: {
    mode: string;
    firstName: string;
    email: string;
  }): Promise<any> {
    const results = {
      quizId: null,
      numberOfUsers: null,
      numberOfQuestions: null,
      backgroundImage: null,
      countdownBeginDelay: null,
      question: null,
      finished: false,
      players: [],
    };
    const playersIds = [];
    const userEmail = await this.botUsersService.findByEmail(bodyDto.email);
    if (!userEmail) {
      await this.botUsersService.create({
        firstName: bodyDto.firstName,
        email: bodyDto.email,
      });
    }
    const mode: any = await this.configurationsService.quizCategoryFindByName(
      bodyDto.mode,
    );
    if (mode && mode.length === 0) {
      return { status: false, message: 'Mode not found!' };
    }
    const qt: any = await this.quizTemplateService.findByQuizCategory(
      mode[0]._id,
    );
    const attempts: any = await this.QuizModel.count({
      userId: bodyDto.email,
      quizTemplateId: qt._id,
    });
    if (!qt) return { status: false, message: 'Invalid Quiz!' };
    if (
      (qt.numberOfAttempts + '').toLowerCase() !== 'unlimited' &&
      +qt.numberOfAttempts === attempts
    ) {
      return {
        status: false,
        message: 'Maximum attempts reached for this quiz.',
      };
    }
    let userIds = null;
    if (qt.selectionCriteria.name.toLowerCase() === 'random') {
      userIds = await this.QuizModel.aggregate([
        {
          $match: {
            quizTemplateId: qt._id + '',
          },
        },
        {
          $sample: {
            size: +qt.numberOfUsers - 1,
          },
        },
      ]);
    } else {
      userIds = await this.QuizModel.find({
        quizTemplateId: qt._id + '',
      }).limit(+qt.numberOfUsers - 1);
      console.log(userIds);
    }
    const userEmails: any = [];
    console.log(userEmails);
    for (let b = 0; b < userIds.length; b++) {
      userEmails.push(userIds[b].userId);
    }
    if (userEmails.length === 0) {
      return { status: false, message: 'Users not found!' };
    }
    const bots: any = await this.botUsersService.getAllUsers(userEmails);
    for (let b = 0; b < bots.length; b++) {
      if (bots[b].email !== bodyDto.email) {
        playersIds.push(bots[b].email);
        results.players.push({
          email: bots[b].email,
          firstName: bots[b].firstName,
          photo: bots[b].photo ? bots[b].photo.fileURI : '',
        });
      }
    }
    if (qt.questions.length === 0) {
      return { status: false, message: 'No questions in this quiz!' };
    }
    results.question = await this.questionsService.questionById(
      qt.questions[0].questionId,
    );
    results.numberOfQuestions = qt.numberOfQuestions;
    results.numberOfUsers = qt.numberOfUsers;
    results.countdownBeginDelay = qt.countdownBeginDelay;
    results.backgroundImage = qt.backgroundImage;
    const createParams = {
      userId: bodyDto.email,
      quizTemplateId: qt._id,
      overallScore: 0,
      overallCorrect: 0,
      finished: false,
      players: playersIds,
      isBot: false,
    };
    console.log({
      type: 'Quiz',
      event_name: 'Quiz started',
      data: {
        user_id: bodyDto.email,
        quiz_mode: qt.quizCategory.name,
        curriculum: qt.curriculum[0].name,
        grade: qt.grade[0].name,
        subject: qt.subject[0].name,
        topic: qt.topic[0].name,
      },
    });
    const newQuiz = await this.QuizModel.create(createParams);
    results.quizId = newQuiz._id;
    return { status: true, results };
  }

  async submit(bodyDto: {
    quizId: string;
    answer: string;
    questionNumber: number;
    submitInSecound: number;
    uuid: string;
  }): Promise<any> {
    const results = {
      streak: 0,
      winStatus: null,
      finished: false,
      isCorrect: false,
      leaderBoard: [],
      nextQuestion: null,
    };
    const getQuiz: any = await this.QuizModel.findById(bodyDto.quizId);
    if (!getQuiz) {
      return { status: false, message: 'Quiz Not Found!' };
    }
    const qt: any = await this.quizTemplateService.findOne(
      getQuiz.quizTemplateId,
    );
    const lastQuestion = await this.questionsService.questionById(
      qt.questions[bodyDto.questionNumber - 1].questionId,
    );
    const user = await this.botUsersService.findByEmail(getQuiz.userId);
    if (qt.numberOfQuestions !== bodyDto.questionNumber) {
      if (qt.questionSource.name.toLowerCase() === 'fixed') {
        results.nextQuestion = await this.questionsService.questionById(
          qt.questions[bodyDto.questionNumber].questionId,
        );
      } else {
        let nextQuestion = null;
        while (nextQuestion === null) {
          const question =
            qt.questions[Math.floor(Math.random() * qt.questions.length)];
          if (question.questionId !== bodyDto.uuid) {
            nextQuestion = question;
          }
        }
        console.log('bank', nextQuestion);
        results.nextQuestion = await this.questionsService.questionById(
          nextQuestion?.questionId,
        );
      }
    } else {
      results.finished = true;
      console.log({
        type: 'Quiz',
        event_name: 'Quiz finished',
        data: {
          user_id: user.email,
          quiz_mode: qt.quizCategory.name,
          curriculum: qt.curriculum[0].name,
          grade: qt.grade[0].name,
          subject: qt.subject[0].name,
          topic: qt.topic[0].name,
        },
      });
    }
    if (bodyDto.answer !== lastQuestion.answer[0]) {
      const overallCorrect = getQuiz.overallCorrect + 1;
      const answerParams = {
        questionId: qt.questions[bodyDto.questionNumber - 1].questionId,
        score: 0,
        timeSeconds: bodyDto.submitInSecound || 0,
        correct: false,
      };
      await this.QuizModel.findByIdAndUpdate(
        bodyDto.quizId,
        {
          overallCorrect,
          finished: results.finished,
          $push: { answers: answerParams },
        },
        {
          new: true,
        },
      );
      console.log({
        type: 'Quiz',
        event_name: 'Answered wrong',
        data: {
          user_id: user.email,
          quiz_mode: qt.quizCategory.name,
          curriculum: qt.curriculum[0].name,
          grade: qt.grade[0].name,
          subject: qt.subject[0].name,
          topic: qt.topic[0].name,
        },
      });
      results.leaderBoard.push({
        firstName: user.firstName,
        score: 0,
        photo: user.photo ? user.photo.fileURI : '',
      });
    } else {
      let userscore = 0;
      let prev = true;
      for (let st = getQuiz.answers.length - 1; st >= 0; st--) {
        if (getQuiz.answers[st].correct == false) {
          prev = true;
          break;
        }
        if (getQuiz.answers[st].correct == true && prev == true) {
          prev = true;
          results.streak += 1;
        }
      }
      if ((qt.scoringSystem + '').toLowerCase() !== 'custom') {
        for (let ep = 0; ep < qt.enablePoints.length; ep++) {
          let questionscore = 0;
          const params = {
            quizCategoryId: qt.quizCategory._id + '',
            pointsCategoryId: qt.enablePoints[ep]._id + '',
          };
          const points: any =
            await this.configurationsService.pointByPointsCategory(params);
          if (
            points[0]?.pointsCategoryData[0]?.name.toLowerCase() ===
            'question related'
          ) {
            questionscore = points[0] ? points[0].value : 0;
            userscore += points[0] ? points[0].value : 0;
          } else if (
            points[0]?.pointsCategoryData[0]?.name.toLowerCase() ===
            'timing related'
          ) {
            userscore += points[0]
              ? points[0].value
              : 0 * bodyDto.submitInSecound;
          } else {
            userscore +=
              questionscore *
              (points[0] ? points[0].value : 0 / 100) *
              results.streak;
          }
        }
      } else {
        userscore += qt.questions[bodyDto.questionNumber - 1].points;
      }
      const overallCorrect = getQuiz.overallCorrect + 1;
      const overallScore = getQuiz.overallScore + userscore;
      const answerParams = {
        questionId: qt.questions[bodyDto.questionNumber - 1].questionId,
        score: userscore,
        timeSeconds: bodyDto.submitInSecound || 0,
        correct: true,
      };
      results.isCorrect = true;
      results.leaderBoard.push({
        firstName: user.firstName,
        score: userscore,
        photo: user.photo ? user.photo.fileURI : '',
      });
      console.log({
        type: 'Quiz',
        event_name: 'Answered Correct',
        data: {
          user_id: user.email,
          quiz_mode: qt.quizCategory.name,
          curriculum: qt.curriculum[0].name,
          grade: qt.grade[0].name,
          subject: qt.subject[0].name,
          topic: qt.topic[0].name,
        },
      });
      await this.QuizModel.findByIdAndUpdate(
        bodyDto.quizId,
        {
          overallCorrect,
          overallScore: overallScore,
          finished: results.finished,
          $push: { answers: answerParams },
        },
        {
          new: true,
        },
      );
    }
    const players = await this.botUsersService.getAllUsers(getQuiz.players);
    const playerQuizzes = await this.QuizModel.find({
      quizTemplateId: getQuiz.quizTemplateId,
      email: { $in: getQuiz.players },
    });
    for (let pq = 0; pq < playerQuizzes.length; pq++) {
      for (let p = 0; p < players.length; p++) {
        if (playerQuizzes[pq].userId === players[p].email) {
          results.leaderBoard.push({
            firstName: players[p]?.firstName,
            score:
              playerQuizzes[pq]?.answers[bodyDto.questionNumber - 1]?.score,
            photo: players[p]?.photo ? players[p].photo.fileURI : '',
          });
        }
      }
    }
    results.leaderBoard = results.leaderBoard.sort((x, y) => {
      return y.score - x.score;
    });
    results.winStatus = qt.winStatus
      ? { name: qt.winStatus.name, value: qt.winStatus.rankValue }
      : '';
    return { status: true, results };
  }

  async botPlayQuiz(bodyDto: {
    quizTemplateId: string;
    botNums: number;
  }): Promise<any> {
    const results = [];
    const getBots: any = (await this.botUsersService.findAll()).splice(
      0,
      bodyDto.botNums,
    );
    for (let u = 0; u < getBots.length; u++) {
      const createParams = {
        userId: null,
        quizTemplateId: bodyDto.quizTemplateId,
        overallScore: 0,
        overallCorrect: 0,
        finished: true,
        isBot: true,
        answers: [],
        createdBy: 'admin',
      };
      const botsUser: any = await this.botUsersService.findOne(getBots[u]._id);
      createParams.userId = botsUser.email;
      const qt: any = await this.quizTemplateService.findOne(
        bodyDto.quizTemplateId,
      );
      if (qt.questions.length === 0) {
        return {
          status: false,
          message: 'No questions in this quiz!',
        };
      }
      if (qt.questionSource.name.toLowerCase() === 'fixed') {
        for (let q = 0; q < qt.questions.length; q++) {
          const random = [0, 1, 2, 3, 4, 5];
          const submitInSecound =
            random[Math.floor(Math.random() * random.length)];
          const question = await this.questionsService.questionById(
            qt.questions[q].questionId,
          );
          const botAnswer =
            question.options[
              Math.floor(Math.random() * question.options.length)
            ];
          if (botAnswer !== question.answer[0]) {
            createParams.answers.push({
              questionId: qt.questions[q].questionId,
              score: 0,
              timeSeconds: submitInSecound,
              correct: false,
            });
          } else {
            let botscore = 0;
            if (qt.scoringSystem.toLowerCase() !== 'custom') {
              for (let ep = 0; ep < qt.enablePoints.length; ep++) {
                let streak = 0;
                let questionscore = 0;
                const params = {
                  quizCategoryId: qt.quizCategory._id + '',
                  pointsCategoryId: qt.enablePoints[ep]._id + '',
                };
                const points: any =
                  await this.configurationsService.pointByPointsCategory(
                    params,
                  );
                if (
                  points[0]?.pointsCategoryData[0]?.name.toLowerCase() ===
                  'question related'
                ) {
                  questionscore = points[0] ? points[0].value : 0;
                  botscore += points[0] ? points[0].value : 0;
                } else if (
                  points[0]?.pointsCategoryData[0]?.name.toLowerCase() ===
                  'timing related'
                ) {
                  botscore += points[0] ? points[0].value : 0 * submitInSecound;
                } else {
                  let prev = false;
                  for (
                    let st = createParams.answers.length - 1;
                    st >= 0;
                    st--
                  ) {
                    if (createParams.answers[st].correct === false) {
                      break;
                    }
                    if (
                      createParams.answers[st].correct === true &&
                      prev == true
                    ) {
                      prev = true;
                      streak += 1;
                    }
                  }
                  botscore +=
                    questionscore *
                    (points[0] ? points[0].value : 0 / 100) *
                    streak;
                }
              }
            } else {
              botscore += question[q].points;
            }
            createParams.overallCorrect += 1;
            createParams.overallScore += botscore;
            createParams.answers.push({
              questionId: qt.questions[q].questionId,
              score: botscore,
              timeSeconds: submitInSecound,
              correct: true,
            });
          }
        }
        results.push(createParams);
        await this.QuizModel.create(createParams);
      } else {
        const questionList = [];
        while (questionList.length !== qt.numberOfQuestions) {
          const question =
            qt.questions[Math.floor(Math.random() * qt.questions.length)];
          if (questionList.indexOf(question) === -1) {
            questionList.push(question);
          }
        }
        for (let q = 0; q < questionList.length; q++) {
          const random = [0, 1, 2, 3, 4, 5];
          const submitInSecound =
            random[Math.floor(Math.random() * random.length)];
          const question = await this.questionsService.questionById(
            questionList[q].questionId,
          );
          const botAnswer =
            question.options[
              Math.floor(Math.random() * question.options.length)
            ];
          if (botAnswer !== question.answer[0]) {
            createParams.answers.push({
              questionId: qt.questions[q].questionId,
              score: 0,
              timeSeconds: submitInSecound,
              correct: false,
            });
          } else {
            let botscore = 0;
            if (qt.scoringSystem.toLowerCase() !== 'custom') {
              for (let ep = 0; ep < qt.enablePoints.length; ep++) {
                let streak = 0;
                let questionscore = 0;
                const params = {
                  quizCategoryId: qt.quizCategory._id + '',
                  pointsCategoryId: qt.enablePoints[ep]._id + '',
                };
                const points: any =
                  await this.configurationsService.pointByPointsCategory(
                    params,
                  );
                if (
                  points[0]?.pointsCategoryData[0]?.name.toLowerCase() ===
                  'question related'
                ) {
                  questionscore = points[0] ? points[0].value : 0;
                  botscore += points[0] ? points[0].value : 0;
                } else if (
                  points[0]?.pointsCategoryData[0]?.name.toLowerCase() ===
                  'timing related'
                ) {
                  botscore += points[0] ? points[0].value : 0 * submitInSecound;
                } else {
                  let prev = false;
                  for (
                    let st = createParams.answers.length - 1;
                    st >= 0;
                    st--
                  ) {
                    if (createParams.answers[st].correct === false) {
                      break;
                    }
                    if (
                      createParams.answers[st].correct === true &&
                      prev == true
                    ) {
                      prev = true;
                      streak += 1;
                    }
                  }
                  botscore +=
                    questionscore *
                    (points[0] ? points[0].value : 0 / 100) *
                    streak;
                }
              }
            } else {
              botscore += questionList[q].points;
            }
            createParams.overallCorrect += 1;
            createParams.overallScore += botscore;
            createParams.answers.push({
              questionId: qt.questions[q].questionId,
              score: botscore,
              timeSeconds: submitInSecound,
              correct: true,
            });
          }
        }
        results.push(createParams);
        await this.QuizModel.create(createParams);
      }
    }
    return results;
  }

  async findAll(offset = 0, limit?: number) {
    const findQuery = this.QuizModel.find()
      .sort({ createdAt: -1 })
      .skip(offset);
    if (limit) {
      findQuery.limit(limit);
    }
    const results = await findQuery;
    const count = await this.QuizModel.count();

    return { results, count };
  }

  async findOne(id: string): Promise<Quiz> {
    return await this.QuizModel.findById(id).exec();
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    return await this.QuizModel.findByIdAndUpdate(id, updateQuizDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Quiz> {
    return await this.QuizModel.findByIdAndRemove(id);
  }
}

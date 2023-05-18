import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ParticipationJoinModeDocument,
  ParticipationJoinMode,
  SelectionCriteriaDocument,
  SelectionCriteria,
  QuestionSourceDocument,
  QuestionSource,
  QuizContentDocument,
  QuizContent,
  QuestionTypeDocument,
  QuestionType,
  QuestionContentDocument,
  QuestionContent,
  OptionContentDocument,
  OptionContent,
  RankTypeDocument,
  RankType,
} from '../master/schema/master.schema';
import {
  PointsCategoryDocument,
  PointsCategory,
} from '../configurations/schemas/pointsCategory.schema';
import {
  QuizCategoryDocument,
  QuizCategory,
} from '../configurations/schemas/quizCategory.schema';
import {
  WinStatusDocument,
  WinStatus,
} from '../configurations/schemas/winStatus.schema';
import {
  QuizTemplate,
  QuizTemplateDocument,
} from '../quiz-template/schema/quiz-template.schema';
import { Quiz, QuizDocument } from '../quiz/schemas/quiz.schema';
import { QuestionsService } from 'src/api-questions/questions.service';
import { MasterService } from 'src/master/master.service';
import { ConfigurationsService } from 'src/configurations/configurations.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class HelpersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly masterService: MasterService,
    private readonly questionsService: QuestionsService,
    private readonly configurationsService: ConfigurationsService,
    @InjectModel(Quiz.name) private QuizModel: Model<QuizDocument>,
    @InjectModel(RankType.name)
    private RankTypeModel: Model<RankTypeDocument>,
    @InjectModel(ParticipationJoinMode.name)
    private ParticipationJoinModeModel: Model<ParticipationJoinModeDocument>,
    @InjectModel(SelectionCriteria.name)
    private SelectionCriteriaModel: Model<SelectionCriteriaDocument>,
    @InjectModel(QuestionSource.name)
    private QuestionSourceModel: Model<QuestionSourceDocument>,
    @InjectModel(QuizContent.name)
    private QuizContentModel: Model<QuizContentDocument>,
    @InjectModel(QuestionType.name)
    private QuestionTypeModel: Model<QuestionTypeDocument>,
    @InjectModel(QuestionContent.name)
    private QuestionContentModel: Model<QuestionContentDocument>,
    @InjectModel(OptionContent.name)
    private OptionContentModel: Model<OptionContentDocument>,
    @InjectModel(QuizTemplate.name)
    private QuizTemplateModel: Model<QuizTemplateDocument>,
    @InjectModel(PointsCategory.name)
    private PointsCategoryModel: Model<PointsCategoryDocument>,
    @InjectModel(QuizCategory.name)
    private QuizCategoryModel: Model<QuizCategoryDocument>,
    @InjectModel(WinStatus.name)
    private WinStatusModel: Model<WinStatusDocument>,
  ) {}

  async quizTemplateById(id: any) {
    const results: any = {
      _id: null,
      quizContent: null,
      curriculum: null,
      grade: null,
      subject: null,
      topic: null,
      quizCategory: null,
      participationJoinMode: null,
      selectionCriteria: null,
      winStatus: null,
      winRankType: null,
      winValue: 0,
      numberOfAttempts: null,
      scoringSystem: null,
      enablePoints: [],
      backgroundImage: null,
      questionSource: null,
      numberOfQuestions: null,
      numberOfUsers: null,
      questionType: null,
      questionContent: [],
      optionContent: [],
      countdownBeginDelay: 0,
      status: null,
      isEnable: true,
      createdBy: null,
      createdById: null,
      updatedBy: null,
      updatedById: null,
      createdAt: null,
      updatedAt: null,
    };
    const qt: any = await this.QuizTemplateModel.findById(id);
    if (!qt) {
      return null;
    }
    const enablePointsData = [];
    const optionContentData = [];
    const questionContentData = [];
    if (qt.quizContent === '') {
      results.quizContent = '';
    }
    const quizContent = await this.QuizContentModel.findById(qt.quizContent);
    results.quizContent = quizContent ? quizContent : '';

    if (qt.curriculum !== '') {
      const curriculum = await this.questionsService.assetNamebyID(
        qt.curriculum,
      );
      results.curriculum = curriculum ? curriculum : '';
    }

    if (qt.grade !== '') {
      const grade = await this.questionsService.assetNamebyID(qt.grade);
      results.grade = grade ? grade : '';
    }

    if (qt.subject !== '') {
      const subject = await this.questionsService.assetNamebyID(qt.subject);
      results.subject = subject ? subject : '';
    }

    if (qt.topic !== '') {
      const topic = await this.questionsService.assetNamebyID(qt.topic);
      results.topic = topic ? topic : '';
    }

    if (qt.quizCategory !== '') {
      const quizCategory = await this.QuizCategoryModel.findById(
        qt.quizCategory,
      );
      results.quizCategory = quizCategory ? quizCategory : '';
    }

    if (qt.participationJoinMode !== '') {
      const participationJoinMode =
        await this.ParticipationJoinModeModel.findById(
          qt.participationJoinMode,
        );
      results.participationJoinMode = participationJoinMode
        ? participationJoinMode
        : '';
    }

    if (qt.selectionCriteria !== '') {
      const selectionCriteria = await this.SelectionCriteriaModel.findById(
        qt.selectionCriteria,
      );
      results.selectionCriteria = selectionCriteria ? selectionCriteria : '';
    }

    if (qt.winStatus !== '') {
      const winStatus = await this.WinStatusModel.findById(qt.winStatus);
      results.winStatus = winStatus ? winStatus : '';
    }

    if (qt.winRankType !== '') {
      const winRankType = await this.RankTypeModel.findById(qt.winRankType);
      results.winRankType = winRankType ? winRankType : '';
    }

    results.winValue = qt.winValue;
    results.numberOfAttempts = qt.numberOfAttempts;
    results.scoringSystem = qt.scoringSystem;

    if (qt.enablePoints.length !== 0) {
      for (let ep = 0; ep < qt.enablePoints.length; ep++) {
        const enablePoints = await this.PointsCategoryModel.findById(
          qt.enablePoints[ep],
        );
        enablePoints ? enablePointsData.push(enablePoints) : null;
      }
      results.enablePoints =
        enablePointsData.length != 0 ? enablePointsData : [];
    }
    results.backgroundImage = qt.backgroundImage;

    if (qt.questionSource !== '') {
      const questionSource =
        await this.configurationsService.getQuestionSourceId({
          participationJoinId: qt.participationJoinMode,
          quizCategoryId: qt.quizCategory,
          selectionCriteriaId: qt.selectionCriteria,
          questionSourceId: qt.questionSource,
        });
      results.questionSource = questionSource
        ? questionSource.results[0]?.questionSourceData[0]
        : '';
      results.numberOfAttempts = questionSource
        ? questionSource.results[0]?.numberOfAttempts
        : '';
      results.numberOfQuestions = questionSource
        ? questionSource.results[0]?.numberOfQuestionsInQuiz
        : '';
      results.numberOfUsers = questionSource
        ? questionSource.results[0]?.numberOfUsers
        : '';
    }
    if (qt.questionType !== '') {
      const questionType = await this.QuestionTypeModel.findById(
        qt.questionType,
      );
      results.questionType = questionType ? questionType : '';
    }

    if (qt.optionContent.length !== 0) {
      for (let oc = 0; oc < qt.optionContent.length; oc++) {
        const optionContent = await this.OptionContentModel.findById(
          qt.optionContent[oc],
        );
        optionContent ? optionContentData.push(optionContent) : null;
      }
      results.optionContent =
        optionContentData.length != 0 ? optionContentData : [];
    }

    if (qt.questionContent.length !== 0) {
      for (let qc = 0; qc < qt.questionContent.length; qc++) {
        const questionContent = await this.QuestionContentModel.findById(
          qt.questionContent[qc],
        );
        questionContent ? questionContentData.push(questionContent) : null;
      }
      results.questionContent =
        questionContentData.length != 0 ? questionContentData : [];
    }

    results.countdownBeginDelay = qt.countdownBeginDelay;
    results.questions = qt.questions;
    results.status = qt.status;
    results.isEnable = qt.isEnable;
    results.createdBy = qt.createdBy;
    results.createdById = qt.createdById;
    results.updatedBy = qt.updatedBy;
    results.updatedById = qt.updatedById;
    results.createdAt = qt.createdAt;
    results.updatedAt = qt.updatedAt;
    results._id = qt._id;
    return results;
  }

  async userNameGen() {
    let userName = '';
    const charset = 'abcdefghijklmnopqrstuvwxyz';
    const caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    userName += caps.charAt(Math.floor(Math.random() * charset.length));
    for (let i = 0; i < 8; i++)
      userName += charset.charAt(Math.floor(Math.random() * charset.length));
    return userName;
  }

  async event(options): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.post(process.env.EVENTS_URL, options).pipe(
        catchError(() => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizTemplateDto } from './dto/create-quiz-template.dto';
import { UpdateQuizTemplateDto } from './dto/update-quiz-template.dto';
import {
  QuizTemplate,
  QuizTemplateDocument,
} from './schema/quiz-template.schema';
import { HelpersService } from 'src/helpers/helpers.service';
import { QuestionsService } from 'src/api-questions/questions.service';

@Injectable()
export class QuizTemplateService {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly helpersService: HelpersService,
    @InjectModel(QuizTemplate.name)
    private QuizTemplateModel: Model<QuizTemplateDocument>,
  ) {}

  async create(
    createQuizTemplateDto: CreateQuizTemplateDto,
  ): Promise<QuizTemplate> {
    const created = new this.QuizTemplateModel(createQuizTemplateDto);
    return await created.save();
  }

  async findAll(offset = 0, limit = 50) {
    const results = [];
    const findQuary = await this.QuizTemplateModel.find()
      .limit(limit)
      .skip(offset);
    if (findQuary && findQuary.length != 0) {
      for (const qt of findQuary) {
        results.push(await this.helpersService.quizTemplateById(qt._id));
      }
    }
    const count = await this.QuizTemplateModel.count();

    return { results, count };
  }

  async filter({
    offset = 0,
    limit = 50,
    participationJoinMode,
    selectionCriteria,
    winStatus,
    winRankType,
    scoringSystem,
    questionSource,
    enablePoints,
  }: {
    offset: number;
    limit: number;
    participationJoinMode: string;
    selectionCriteria: string;
    winStatus: string;
    winRankType: string;
    scoringSystem: string;
    questionSource: string;
    enablePoints: string;
  }) {
    const results = [];
    const findQuary = await this.QuizTemplateModel.aggregate([
      {
        $match: {
          participationJoinMode,
          selectionCriteria,
          winStatus,
          winRankType,
          scoringSystem,
          questionSource,
          enablePoints,
        },
      },
    ])
      .limit(+limit)
      .skip(+offset);
    console.log(findQuary);
    if (findQuary && findQuary.length != 0) {
      for (const qt of findQuary) {
        results.push(await this.helpersService.quizTemplateById(qt._id));
      }
    }
    const count = await this.QuizTemplateModel.count({
      participationJoinMode,
      selectionCriteria,
      winStatus,
      winRankType,
      scoringSystem,
      questionSource,
      enablePoints,
    });

    return { results, count };
  }

  async getQuestions(id: string): Promise<any> {
    const questionsData = [];
    const qt = await this.QuizTemplateModel.findById(id);
    if (qt.questions.length != 0) {
      for (let q = 0; q < qt.questions.length; q++) {
        const questions = await this.questionsService.questionById(
          qt.questions[q].questionId,
        );
        questionsData.push(
          questions
            ? { questionId: questions, points: qt.questions[q].points }
            : q,
        );
      }
    }
    return questionsData;
  }

  async findByQuizCategory(id: string): Promise<QuizTemplate> {
    const qt: any = await this.QuizTemplateModel.findOne({
      quizCategory: id,
    });
    return await this.helpersService.quizTemplateById(qt._id);
  }

  async findOne(id: string): Promise<QuizTemplate> {
    return await this.helpersService.quizTemplateById(id);
  }

  async findByTeacherId(id: string): Promise<QuizTemplate[]> {
    return await this.QuizTemplateModel.aggregate([
      {
        $match: { createdBy: id },
      },
      {
        $lookup: {
          from: 'questions',
          localField: 'questionIds',
          foreignField: 'questionId',
          as: 'questions',
        },
      },

      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$questions', 0] }, '$$ROOT'],
          },
        },
      },
      { $project: { fromItems: 0 } },
    ]);
  }

  async update(
    id: string,
    updateQuizTemplateDto: UpdateQuizTemplateDto,
  ): Promise<QuizTemplate> {
    return await this.QuizTemplateModel.findByIdAndUpdate(
      id,
      updateQuizTemplateDto,
      {
        new: true,
      },
    );
  }

  async remove(id: string): Promise<QuizTemplate> {
    return await this.QuizTemplateModel.findByIdAndRemove(id);
  }
}

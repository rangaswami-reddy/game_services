import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  WinStatusDto,
  QuizParameterDto,
  QuizCategoryDto,
  PointsCategoryDto,
  PointDto,
  MessagesCategoryDto,
  MessagesTypeDto,
  MessagesTextDto,
} from './dto/create-configration.dto';
import {
  PointsCategoryDocument,
  PointsCategory,
} from './schemas/pointsCategory.schema';
import {
  QuizCategoryDocument,
  QuizCategory,
} from './schemas/quizCategory.schema';
import { WinStatusDocument, WinStatus } from './schemas/winStatus.schema';
import { PointDocument, Point } from './schemas/points.schema';
import {
  QuizParameterDocument,
  QuizParameter,
} from './schemas/quizParamers.schema';
import {
  MessagesCategoryDocument,
  MessagesCategory,
  MessagesTypeDocument,
  MessagesType,
  MessagesTextDocument,
  MessagesText,
} from './schemas/messagesCategory.schema';
import { Quiz, QuizDocument } from '../quiz/schemas/quiz.schema';
import {
  QuizTemplate,
  QuizTemplateDocument,
} from '../quiz-template/schema/quiz-template.schema';

@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectModel(Quiz.name) private QuizModel: Model<QuizDocument>,
    @InjectModel(QuizTemplate.name)
    private QuizTemplateModel: Model<QuizTemplateDocument>,
    @InjectModel(PointsCategory.name)
    private PointsCategoryModel: Model<PointsCategoryDocument>,
    @InjectModel(QuizCategory.name)
    private QuizCategoryModel: Model<QuizCategoryDocument>,
    @InjectModel(WinStatus.name)
    private WinStatusModel: Model<WinStatusDocument>,
    @InjectModel(Point.name)
    private PointModel: Model<PointDocument>,
    @InjectModel(QuizParameter.name)
    private QuizParameterModel: Model<QuizParameterDocument>,
    @InjectModel(MessagesCategory.name)
    private MessagesCategoryModel: Model<MessagesCategoryDocument>,
    @InjectModel(MessagesType.name)
    private MessagesTypeModel: Model<MessagesTypeDocument>,
    @InjectModel(MessagesText.name)
    private MessagesTextModel: Model<MessagesTextDocument>,
  ) {}

  async pointsCategoryCreate(
    pointsCategoryDto: PointsCategoryDto,
  ): Promise<PointsCategory> {
    const created = new this.PointsCategoryModel(pointsCategoryDto);
    return created.save();
  }

  async pointsCategoryFindAll(offset = 0, limit?: number) {
    const findQuery = this.PointsCategoryModel.find()
      .sort({ createdAt: -1 })
      .skip(offset);
    if (limit) {
      findQuery.limit(limit);
    }
    const results = await findQuery;
    const count = await this.PointsCategoryModel.count();

    return { results, count };
  }

  async pointsCategoryAll() {
    return await this.PointsCategoryModel.find();
  }

  async pointsCategoryFindOne(id: string): Promise<PointsCategory> {
    return this.PointsCategoryModel.findById(id);
  }

  async pointsCategoryUpdate(
    id: string,
    pointsCategoryDto: PointsCategoryDto,
  ): Promise<PointsCategory> {
    return this.PointsCategoryModel.findByIdAndUpdate(id, pointsCategoryDto, {
      new: true,
    });
  }

  async pointsCategoryRemove(id: string): Promise<PointsCategory> {
    return this.PointsCategoryModel.findByIdAndRemove(id);
  }

  async quizCategoryCreate(
    quizCategoryDto: QuizCategoryDto,
  ): Promise<QuizCategory> {
    const created = new this.QuizCategoryModel(quizCategoryDto);
    return created.save();
  }

  async quizCategoryFindAll(offset = 0, limit?: number) {
    const findQuery = this.QuizCategoryModel.aggregate([
      {
        $addFields: {
          participationJoinModeObject: {
            $toObjectId: '$participationJoinMode',
          },
        },
      },
      {
        $lookup: {
          from: 'participationjoinmodes',
          localField: 'participationJoinModeObject',
          foreignField: '_id',
          as: 'participationJoinModeData',
        },
      },
      {
        $addFields: {
          selectionCriteriaObject: {
            $toObjectId: '$selectionCriteria',
          },
        },
      },
      {
        $lookup: {
          from: 'selectioncriterias',
          localField: 'selectionCriteriaObject',
          foreignField: '_id',
          as: 'selectionCriteriaData',
        },
      },
    ])
      .sort({ createdAt: -1 })
      .skip(+offset);
    if (limit) {
      findQuery.limit(+limit);
    }
    const results = await findQuery;
    const count = await this.QuizCategoryModel.count();

    return { results, count };
  }

  async quizCategoryAll() {
    return await this.QuizCategoryModel.find();
  }

  async quizCategoryFindOne(id: string): Promise<QuizCategory> {
    return this.QuizCategoryModel.findById(id).exec();
  }

  async quizCategoryFindByName(name: string): Promise<QuizCategory[]> {
    return this.QuizCategoryModel.find({
      name: { $regex: name, $options: 'i' },
    }).sort({ createdAt: -1 });
  }

  async quizCategoryUpdate(
    id: string,
    quizCategoryDto: QuizCategoryDto,
  ): Promise<QuizCategory> {
    return this.QuizCategoryModel.findByIdAndUpdate(id, quizCategoryDto, {
      new: true,
    });
  }

  async quizCategoryRemove(id: string): Promise<QuizCategory> {
    return this.QuizCategoryModel.findByIdAndRemove(id);
  }

  async winStatusCreate(winStatusDto: WinStatusDto): Promise<WinStatus> {
    const created = new this.WinStatusModel(winStatusDto);
    return created.save();
  }

  async winStatusFindAll(offset = 0, limit?: number) {
    const findQuery = this.WinStatusModel.aggregate([
      {
        $addFields: {
          quizCategoryObject: {
            $toObjectId: '$quizCategory',
          },
        },
      },
      {
        $lookup: {
          from: 'quizcategories',
          localField: 'quizCategoryObject',
          foreignField: '_id',
          as: 'quizCategoryData',
        },
      },
      {
        $addFields: {
          participationJoinModeObject: {
            $toObjectId: '$participationJoinMode',
          },
        },
      },
      {
        $lookup: {
          from: 'participationjoinmodes',
          localField: 'participationJoinModeObject',
          foreignField: '_id',
          as: 'participationJoinModeData',
        },
      },
      {
        $addFields: {
          selectionCriteriaObject: {
            $toObjectId: '$selectionCriteria',
          },
        },
      },
      {
        $lookup: {
          from: 'selectioncriterias',
          localField: 'selectionCriteriaObject',
          foreignField: '_id',
          as: 'selectionCriteriaData',
        },
      },
      {
        $addFields: {
          rankTypeObject: {
            $toObjectId: '$rankType',
          },
        },
      },
      {
        $lookup: {
          from: 'ranktypes',
          localField: 'rankTypeObject',
          foreignField: '_id',
          as: 'rankTypeData',
        },
      },
    ])
      .sort({ createdAt: -1 })
      .skip(+offset);
    if (limit) {
      findQuery.limit(+limit);
    }
    const results = await findQuery;
    const count = await this.WinStatusModel.count();

    return { results, count };
  }

  async winStatusAll() {
    return await this.WinStatusModel.find();
  }

  async winStatusFindOne(id: string): Promise<WinStatus> {
    return this.WinStatusModel.findById(id).exec();
  }

  async winStatusUpdate(
    id: string,
    winStatusDto: WinStatusDto,
  ): Promise<WinStatus> {
    return this.WinStatusModel.findByIdAndUpdate(id, winStatusDto, {
      new: true,
    });
  }

  async winStatusRemove(id: string): Promise<WinStatus> {
    return this.WinStatusModel.findByIdAndRemove(id);
  }

  async pointCreate(pointDto: PointDto): Promise<Point> {
    const created = new this.PointModel(pointDto);
    return created.save();
  }

  async pointFindAll(offset = 0, limit?: number) {
    const findQuery = this.PointModel.aggregate([
      {
        $addFields: {
          pointsCategoryObject: {
            $toObjectId: '$pointsCategory',
          },
        },
      },
      {
        $lookup: {
          from: 'pointscategories',
          localField: 'pointsCategoryObject',
          foreignField: '_id',
          as: 'pointsCategoryData',
        },
      },
      {
        $addFields: {
          quizCategoryObject: {
            $toObjectId: '$quizCategory',
          },
        },
      },
      {
        $lookup: {
          from: 'quizcategories',
          localField: 'quizCategoryObject',
          foreignField: '_id',
          as: 'quizCategoryData',
        },
      },
    ])
      .sort({ createdAt: -1 })
      .skip(+offset);
    if (limit) {
      findQuery.limit(+limit);
    }
    const results = await findQuery;
    const count = await this.PointModel.count();

    return { results, count };
  }

  async pointByPointsCategory(bodyDto: {
    pointsCategoryId: string;
    quizCategoryId: string;
  }): Promise<Point[]> {
    return await this.PointModel.aggregate([
      {
        $match: {
          pointsCategory: bodyDto.pointsCategoryId,
          quizCategory: bodyDto.quizCategoryId,
        },
      },
      {
        $addFields: {
          pointsCategoryObject: {
            $toObjectId: '$pointsCategory',
          },
        },
      },
      {
        $lookup: {
          from: 'pointscategories',
          localField: 'pointsCategoryObject',
          foreignField: '_id',
          as: 'pointsCategoryData',
        },
      },
    ]);
  }

  async pointFindOne(id: string): Promise<Point> {
    return this.PointModel.findById(id).exec();
  }

  async pointUpdate(id: string, pointDto: PointDto): Promise<Point> {
    return this.PointModel.findByIdAndUpdate(id, pointDto, {
      new: true,
    });
  }

  async pointRemove(id: string): Promise<Point> {
    return this.PointModel.findByIdAndRemove(id);
  }

  async quizParameterCreate(
    quizParameterDto: QuizParameterDto,
  ): Promise<QuizParameter> {
    const created = new this.QuizParameterModel(quizParameterDto);
    return created.save();
  }

  async quizParameterFindAll(offset = 0, limit?: number) {
    const findQuery = this.QuizParameterModel.aggregate([
      {
        $addFields: {
          quizCategoryObject: {
            $toObjectId: '$quizCategory',
          },
        },
      },
      {
        $lookup: {
          from: 'quizcategories',
          localField: 'quizCategoryObject',
          foreignField: '_id',
          as: 'quizCategoryData',
        },
      },
      {
        $addFields: {
          participationJoinModeObject: {
            $toObjectId: '$participationJoinMode',
          },
        },
      },
      {
        $lookup: {
          from: 'participationjoinmodes',
          localField: 'participationJoinModeObject',
          foreignField: '_id',
          as: 'participationJoinModeData',
        },
      },
      {
        $addFields: {
          selectionCriteriaObject: {
            $toObjectId: '$selectionCriteria',
          },
        },
      },
      {
        $lookup: {
          from: 'selectioncriterias',
          localField: 'selectionCriteriaObject',
          foreignField: '_id',
          as: 'selectionCriteriaData',
        },
      },
      {
        $addFields: {
          questionSourceObject: {
            $toObjectId: '$questionSource',
          },
        },
      },
      {
        $lookup: {
          from: 'questionsources',
          localField: 'questionSourceObject',
          foreignField: '_id',
          as: 'questionSourceData',
        },
      },
    ])
      .sort({ createdAt: -1 })
      .skip(+offset);
    if (limit) {
      findQuery.limit(+limit);
    }
    const results = await findQuery;
    const count = await this.QuizParameterModel.count();

    return { results, count };
  }

  async getQuizCategoryId(id: string): Promise<any> {
    const findQuery = this.QuizParameterModel.aggregate([
      {
        $match: { quizCategory: id },
      },
      {
        $addFields: {
          participationJoinModeObject: {
            $toObjectId: '$participationJoinMode',
          },
        },
      },
      {
        $lookup: {
          from: 'participationjoinmodes',
          localField: 'participationJoinModeObject',
          foreignField: '_id',
          as: 'participationJoinModeData',
        },
      },
      {
        $project: {
          _id: 1,
          participationJoinModeData: 1,
        },
      },
    ]);
    const results = await findQuery;
    return { results };
  }

  async getParticipationJoinModeId(bodyDto: {
    quizCategoryId: string;
    participationJoinId: string;
  }): Promise<any> {
    const findQuery = this.QuizParameterModel.aggregate([
      {
        $match: {
          quizCategory: bodyDto.quizCategoryId,
          participationJoinMode: bodyDto.participationJoinId,
        },
      },
      {
        $addFields: {
          selectionCriteriaObject: {
            $toObjectId: '$selectionCriteria',
          },
        },
      },
      {
        $lookup: {
          from: 'selectioncriterias',
          localField: 'selectionCriteriaObject',
          foreignField: '_id',
          as: 'selectionCriteriaData',
        },
      },
      {
        $project: {
          _id: 1,
          selectionCriteriaData: 1,
        },
      },
    ]);
    const results = await findQuery;
    return { results };
  }

  async getSelectionCriteriaId(bodyDto: {
    participationJoinId: string;
    quizCategoryId: string;
    selectionCriteriaId: string;
  }): Promise<any> {
    const findQuery = this.QuizParameterModel.aggregate([
      {
        $match: {
          selectionCriteria: bodyDto.selectionCriteriaId,
          quizCategory: bodyDto.quizCategoryId,
          participationJoinMode: bodyDto.participationJoinId,
        },
      },
      {
        $addFields: {
          questionSourceObject: {
            $toObjectId: '$questionSource',
          },
        },
      },
      {
        $lookup: {
          from: 'questionsources',
          localField: 'questionSourceObject',
          foreignField: '_id',
          as: 'questionSourceData',
        },
      },
      {
        $project: {
          _id: 1,
          questionSourceData: 1,
        },
      },
    ]);
    const results = await findQuery;
    return { results };
  }

  async getQuestionSourceId(bodyDto: {
    participationJoinId: string;
    quizCategoryId: string;
    selectionCriteriaId: string;
    questionSourceId: string;
  }): Promise<any> {
    const findQuery = this.QuizParameterModel.aggregate([
      {
        $match: {
          questionSource: bodyDto.questionSourceId,
          selectionCriteria: bodyDto.selectionCriteriaId,
          quizCategory: bodyDto.quizCategoryId,
          participationJoinMode: bodyDto.participationJoinId,
        },
      },
      {
        $addFields: {
          questionSourceObject: {
            $toObjectId: '$questionSource',
          },
        },
      },
      {
        $lookup: {
          from: 'questionsources',
          localField: 'questionSourceObject',
          foreignField: '_id',
          as: 'questionSourceData',
        },
      },
      {
        $project: {
          _id: 1,
          questionSourceData: 1,
          numberOfQuestionsInQuiz: 1,
          numberOfUsers: 1,
          numberOfAttempts: 1,
        },
      },
    ]);
    const results = await findQuery;
    return { results };
  }

  async quizParameterFindOne(id: string): Promise<QuizParameter> {
    return this.QuizParameterModel.findById(id).exec();
  }

  async quizParameterUpdate(
    id: string,
    quizParameterDto: QuizParameterDto,
  ): Promise<QuizParameter> {
    return this.QuizParameterModel.findByIdAndUpdate(id, quizParameterDto, {
      new: true,
    });
  }

  async quizParameterRemove(id: string): Promise<QuizParameter> {
    return this.QuizParameterModel.findByIdAndRemove(id);
  }

  async messagesCategoryCreate(
    messagesCategoryDto: MessagesCategoryDto,
  ): Promise<MessagesCategory> {
    const created = new this.MessagesCategoryModel(messagesCategoryDto);
    return created.save();
  }

  async messagesCategoryFindAll(offset = 0, limit?: number) {
    const findQuery = this.MessagesCategoryModel.find()
      .sort({ createdAt: -1 })
      .skip(offset);
    if (limit) {
      findQuery.limit(limit);
    }
    const results = await findQuery;
    const count = await this.MessagesCategoryModel.count();

    return { results, count };
  }

  async messagesCategoryFindOne(id: string): Promise<MessagesCategory> {
    return this.MessagesCategoryModel.findById(id).exec();
  }

  async messagesCategoryUpdate(
    id: string,
    messagesCategoryDto: MessagesCategoryDto,
  ): Promise<MessagesCategory> {
    return this.MessagesCategoryModel.findByIdAndUpdate(
      id,
      messagesCategoryDto,
      {
        new: true,
      },
    );
  }

  async messagesCategoryRemove(id: string): Promise<MessagesCategory> {
    return this.MessagesCategoryModel.findByIdAndRemove(id);
  }

  async messagesTypeCreate(
    messagesTypeDto: MessagesTypeDto,
  ): Promise<MessagesType> {
    const created = new this.MessagesTypeModel(messagesTypeDto);
    return created.save();
  }

  async messagesTypeFindAll(offset = 0, limit?: number) {
    const findQuery = this.MessagesTypeModel.aggregate([
      {
        $addFields: {
          messagesCategoryObject: {
            $toObjectId: '$messagesCategory',
          },
        },
      },
      {
        $lookup: {
          from: 'messagescategories',
          localField: 'messagesCategoryObject',
          foreignField: '_id',
          as: 'messagesCategoryData',
        },
      },
    ])
      .sort({ createdAt: -1 })
      .skip(+offset);
    if (limit) {
      findQuery.limit(+limit);
    }
    const results = await findQuery;
    const count = await this.MessagesTypeModel.count();

    return { results, count };
  }

  async messagesTypeFindOne(id: string): Promise<MessagesType> {
    return this.MessagesTypeModel.findById(id).exec();
  }

  async messagesTypeUpdate(
    id: string,
    messagesTypeDto: MessagesTypeDto,
  ): Promise<MessagesType> {
    return this.MessagesTypeModel.findByIdAndUpdate(id, messagesTypeDto, {
      new: true,
    });
  }

  async messagesTypeRemove(id: string): Promise<MessagesType> {
    return this.MessagesTypeModel.findByIdAndRemove(id);
  }

  async messagesTextCreate(
    messagesTextDto: MessagesTextDto,
  ): Promise<MessagesText> {
    const created = new this.MessagesTextModel(messagesTextDto);
    return created.save();
  }

  async messagesTextFindById(id: string): Promise<MessagesText> {
    return this.MessagesTextModel.findById(id).exec();
  }

  async messagesTextFindOne({
    messagesCategory,
    quizCategory,
    messagesType,
  }: {
    messagesCategory?: string;
    quizCategory?: string;
    messagesType?: string;
  }) {
    const results = await this.MessagesTextModel.find({
      messagesCategory: messagesCategory,
      messagesType: messagesType,
      quizCategory: quizCategory,
    });
    const count = await this.MessagesTextModel.count({
      messagesCategory,
      messagesType,
      quizCategory,
    });

    return { results, count };
  }

  async messagesTextRandom({
    quizCategory,
    messagesCategory,
    messagesType,
  }: {
    quizCategory?: string;
    messagesCategory?: string;
    messagesType?: string;
  }) {
    const results = await this.MessagesTextModel.findOne({
      quizCategory,
      messagesCategory,
      messagesType,
    });
    const message =
      results?.messagesArray[
        Math.floor(Math.random() * results.messagesArray.length)
      ];
    const status = message ? true : false;
    return { status, message };
  }

  async messagesTextFindAll({
    offset = 0,
    limit,
  }: {
    offset: number;
    limit?: number;
  }) {
    const findMessaegs = this.MessagesTextModel.find()
      .sort({ createdAt: -1 })
      .skip(+offset);
    if (limit) {
      findMessaegs.limit(+limit);
    }
    const results = await findMessaegs;
    const count = await this.MessagesTextModel.count();

    return { results, count };
  }

  async messagesTypeByMessageCategoryId(messagesCategory?: string) {
    const results = await this.MessagesTypeModel.find({
      messagesCategory,
    }).sort({ createdAt: -1 });
    return results;
  }

  async messagesTextUpdate(
    id: string,
    messagestTextDto: MessagesTextDto,
  ): Promise<MessagesText> {
    return this.MessagesTextModel.findByIdAndUpdate(id, messagestTextDto, {
      new: true,
    });
  }

  async addMessages(id: string, name: string, describe: string) {
    return this.MessagesTextModel.findOneAndUpdate(
      { _id: id },
      { $push: { messagesArray: { name, describe } } },
      { new: true },
    );
  }

  async updateMessages(id: string, messageId: string, name: string) {
    return this.MessagesTextModel.findOneAndUpdate(
      { _id: id, 'messagesArray._id': messageId },
      { $set: { 'messagesArray.$.name': name } },
      { new: true },
    );
  }

  async messagesTextRemove(
    id: string,
    messageId: string,
  ): Promise<MessagesText> {
    return this.MessagesTextModel.findOneAndUpdate(
      { _id: id },
      { $pull: { messagesArray: { _id: messageId } } },
      { new: true },
    );
  }
  async messagesTextDelete(id: string): Promise<MessagesText> {
    return this.MessagesTextModel.findByIdAndRemove(id);
  }

  async deleteData(version: string): Promise<string> {
    if (version === process.env.VERSION) {
      await this.PointsCategoryModel.deleteMany();
      await this.QuizCategoryModel.deleteMany();
      await this.WinStatusModel.deleteMany();
      await this.PointModel.deleteMany();
      await this.QuizParameterModel.deleteMany();
      await this.MessagesCategoryModel.deleteMany();
      await this.MessagesTypeModel.deleteMany();
      await this.QuizModel.deleteMany();
      await this.QuizTemplateModel.deleteMany();
    }

    return 'data deleted';
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParticipationJoinModeDto } from './dto/create-master.dto';
import {
  ParticipationJoinModeDocument,
  ParticipationJoinMode,
  SelectionCriteriaDocument,
  SelectionCriteria,
  RankTypeDocument,
  RankType,
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
  MasterMessageDocument,
  MasterMessage,
} from './schema/master.schema';

@Injectable()
export class MasterService {
  constructor(
    @InjectModel(ParticipationJoinMode.name)
    private ParticipationJoinModeModel: Model<ParticipationJoinModeDocument>,
    @InjectModel(SelectionCriteria.name)
    private SelectionCriteriaModel: Model<SelectionCriteriaDocument>,
    @InjectModel(RankType.name)
    private RankTypeModel: Model<RankTypeDocument>,
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
    @InjectModel(MasterMessage.name)
    private MasterMessageModel: Model<MasterMessageDocument>,
  ) {}

  async createParticipationJoinMode(
    createMasterDto: ParticipationJoinModeDto,
  ): Promise<ParticipationJoinMode> {
    const created = new this.ParticipationJoinModeModel(createMasterDto);
    return await created.save();
  }

  async createSelectionCriteria(
    createMasterDto: ParticipationJoinModeDto,
  ): Promise<SelectionCriteria> {
    const created = new this.SelectionCriteriaModel(createMasterDto);
    return await created.save();
  }

  async createRankType(
    createMasterDto: ParticipationJoinModeDto,
  ): Promise<RankType> {
    const created = new this.RankTypeModel(createMasterDto);
    return await created.save();
  }

  async createQuestionSource(
    createMasterDto: ParticipationJoinModeDto,
  ): Promise<QuestionSource> {
    const created = new this.QuestionSourceModel(createMasterDto);
    return await created.save();
  }

  async createQuizContent(
    createMasterDto: ParticipationJoinModeDto,
  ): Promise<QuizContent> {
    const created = new this.QuizContentModel(createMasterDto);
    return await created.save();
  }

  async createQuestionType(
    createMasterDto: ParticipationJoinModeDto,
  ): Promise<QuestionType> {
    const created = new this.QuestionTypeModel(createMasterDto);
    return await created.save();
  }

  async createQuestionContent(
    createMasterDto: ParticipationJoinModeDto,
  ): Promise<QuestionContent> {
    const created = new this.QuestionContentModel(createMasterDto);
    return await created.save();
  }

  async createOptionContent(
    createMasterDto: ParticipationJoinModeDto,
  ): Promise<OptionContent> {
    const created = new this.OptionContentModel(createMasterDto);
    return await created.save();
  }

  async createMasterMessage(
    createMasterDto: ParticipationJoinModeDto,
  ): Promise<MasterMessage> {
    const created = new this.MasterMessageModel(createMasterDto);
    return await created.save();
  }

  async findAll() {
    const results = {
      participationJoinMode: await this.ParticipationJoinModeModel.find(),
      selectionCriteria: await this.SelectionCriteriaModel.find(),
      rankType: await this.RankTypeModel.find(),
      questionSource: await this.QuestionSourceModel.find(),
      quizContent: await this.QuizContentModel.find(),
      questionType: await this.QuestionTypeModel.find(),
      questionContent: await this.QuestionContentModel.find(),
      optionContent: await this.OptionContentModel.find(),
      message: await this.MasterMessageModel.find(),
    };
    return results;
  }

  async deleteMasterData(version: string): Promise<string> {
    if (version === process.env.VERSION) {
      await this.ParticipationJoinModeModel.deleteMany();
      await this.SelectionCriteriaModel.deleteMany();
      await this.RankTypeModel.deleteMany();
      await this.QuestionSourceModel.deleteMany();
      await this.QuizContentModel.deleteMany();
      await this.QuestionTypeModel.deleteMany();
      await this.QuestionContentModel.deleteMany();
      await this.OptionContentModel.deleteMany();
      await this.MasterMessageModel.deleteMany();
    }

    return 'master data deleted';
  }
}

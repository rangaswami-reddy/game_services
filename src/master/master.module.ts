import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { HttpModule } from '@nestjs/axios';
import { MasterController } from './master.controller';
import {
  ParticipationJoinModeSchema,
  ParticipationJoinMode,
  SelectionCriteriaSchema,
  SelectionCriteria,
  RankTypeSchema,
  RankType,
  QuestionSourceSchema,
  QuestionSource,
  QuizContentSchema,
  QuizContent,
  QuestionTypeSchema,
  QuestionType,
  QuestionContentSchema,
  QuestionContent,
  OptionContentSchema,
  OptionContent,
  MasterMessageSchema,
  MasterMessage,
} from './schema/master.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParticipationJoinMode.name, schema: ParticipationJoinModeSchema },
    ]),
    MongooseModule.forFeature([
      { name: SelectionCriteria.name, schema: SelectionCriteriaSchema },
    ]),
    MongooseModule.forFeature([
      { name: RankType.name, schema: RankTypeSchema },
    ]),
    MongooseModule.forFeature([
      { name: QuestionSource.name, schema: QuestionSourceSchema },
    ]),
    MongooseModule.forFeature([
      { name: QuizContent.name, schema: QuizContentSchema },
    ]),
    MongooseModule.forFeature([
      { name: QuestionType.name, schema: QuestionTypeSchema },
    ]),
    MongooseModule.forFeature([
      { name: QuestionContent.name, schema: QuestionContentSchema },
    ]),
    MongooseModule.forFeature([
      { name: OptionContent.name, schema: OptionContentSchema },
    ]),
    MongooseModule.forFeature([
      { name: MasterMessage.name, schema: MasterMessageSchema },
    ]),
    HttpModule,
  ],
  controllers: [MasterController],
  providers: [MasterService],
  exports: [MasterService],
})
export class MasterModule {}

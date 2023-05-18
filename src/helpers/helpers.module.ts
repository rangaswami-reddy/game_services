import { Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { QuestionsModule } from 'src/api-questions/questions.module';
import { HelpersController } from './helpers.controller';
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
} from '../master/schema/master.schema';

import {
  PointsCategorySchema,
  PointsCategory,
} from '../configurations/schemas/pointsCategory.schema';
import {
  QuizCategorySchema,
  QuizCategory,
} from '../configurations/schemas/quizCategory.schema';
import {
  WinStatusSchema,
  WinStatus,
} from '../configurations/schemas/winStatus.schema';
import { PointSchema, Point } from '../configurations/schemas/points.schema';
import {
  QuizParameterSchema,
  QuizParameter,
} from '../configurations/schemas/quizParamers.schema';
import {
  MessagesCategorySchema,
  MessagesCategory,
  MessagesTypeSchema,
  MessagesType,
} from '../configurations/schemas/messagesCategory.schema';
import { QuizSchema, Quiz } from '../quiz/schemas/quiz.schema';
import {
  QuizTemplate,
  QuizTemplateSchema,
} from '../quiz-template/schema/quiz-template.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { MasterModule } from 'src/master/master.module';
import { ConfigurationsModule } from 'src/configurations/configurations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
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
    MongooseModule.forFeature([
      { name: PointsCategory.name, schema: PointsCategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: QuizCategory.name, schema: QuizCategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: WinStatus.name, schema: WinStatusSchema },
    ]),
    MongooseModule.forFeature([{ name: Point.name, schema: PointSchema }]),
    MongooseModule.forFeature([
      { name: QuizParameter.name, schema: QuizParameterSchema },
    ]),
    MongooseModule.forFeature([
      { name: MessagesCategory.name, schema: MessagesCategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: MessagesType.name, schema: MessagesTypeSchema },
    ]),
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    MongooseModule.forFeature([
      { name: QuizTemplate.name, schema: QuizTemplateSchema },
    ]),
    HttpModule,
    QuestionsModule,
    MasterModule,
    ConfigurationsModule,
  ],
  controllers: [HelpersController],
  providers: [HelpersService],
  exports: [HelpersService],
})
export class HelpersModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationsService } from './configurations.service';
import { ConfigurationsController } from './configurations.controller';
import {
  PointsCategorySchema,
  PointsCategory,
} from './schemas/pointsCategory.schema';
import {
  QuizCategorySchema,
  QuizCategory,
} from './schemas/quizCategory.schema';
import { WinStatusSchema, WinStatus } from './schemas/winStatus.schema';
import { PointSchema, Point } from './schemas/points.schema';
import {
  QuizParameterSchema,
  QuizParameter,
} from './schemas/quizParamers.schema';
import {
  MessagesCategorySchema,
  MessagesCategory,
  MessagesTypeSchema,
  MessagesType,
  MessagesTextSchema,
  MessagesText,
} from './schemas/messagesCategory.schema';
import { QuizSchema, Quiz } from '../quiz/schemas/quiz.schema';
import {
  QuizTemplate,
  QuizTemplateSchema,
} from '../quiz-template/schema/quiz-template.schema';

@Module({
  imports: [
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
    MongooseModule.forFeature([
      { name: MessagesText.name, schema: MessagesTextSchema },
    ]),
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    MongooseModule.forFeature([
      { name: QuizTemplate.name, schema: QuizTemplateSchema },
    ]),
  ],
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService],
  exports: [ConfigurationsService],
})
export class ConfigurationsModule {}

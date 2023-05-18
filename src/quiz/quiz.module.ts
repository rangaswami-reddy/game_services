import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizSchema, Quiz } from './schemas/quiz.schema';
import {
  QuizTemplate,
  QuizTemplateSchema,
} from '../quiz-template/schema/quiz-template.schema';
import { QuestionsModule } from 'src/api-questions/questions.module';
import { BotUsersModule } from 'src/bot-users/bot-users.module';
import { QuizTemplateModule } from 'src/quiz-template/quiz-template.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { ConfigurationsModule } from 'src/configurations/configurations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    MongooseModule.forFeature([
      { name: QuizTemplate.name, schema: QuizTemplateSchema },
    ]),
    forwardRef(() => BotUsersModule),
    QuestionsModule,
    QuizTemplateModule,
    HelpersModule,
    ConfigurationsModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}

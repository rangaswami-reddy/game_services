import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizTemplateService } from './quiz-template.service';
import { QuizTemplateController } from './quiz-template.controller';
import {
  QuizTemplate,
  QuizTemplateSchema,
} from './schema/quiz-template.schema';
import { HelpersModule } from 'src/helpers/helpers.module';
import { QuestionsModule } from 'src/api-questions/questions.module';

@Module({
  imports: [
    HelpersModule,
    QuestionsModule,
    MongooseModule.forFeature([
      { name: QuizTemplate.name, schema: QuizTemplateSchema },
    ]),
  ],
  providers: [QuizTemplateService],
  controllers: [QuizTemplateController],
  exports: [QuizTemplateService],
})
export class QuizTemplateModule {}

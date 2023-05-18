import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFeilds } from 'src/constants/schema-fields';

export type QuizParameterDocument = HydratedDocument<QuizParameter>;

@Schema({
  timestamps: true,
})
export class QuizParameter extends SchemaFeilds {
  @Prop()
  quizCategory: string;

  @Prop()
  participationJoinMode: string;

  @Prop()
  selectionCriteria: string;

  @Prop()
  questionSource: string;

  @Prop()
  numberOfQuestionsInQuiz: number;

  @Prop()
  numberOfUsers: number;

  @Prop()
  numberOfAttempts: number;
}

export const QuizParameterSchema = SchemaFactory.createForClass(QuizParameter);

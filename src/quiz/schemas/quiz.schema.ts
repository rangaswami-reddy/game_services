import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFeilds } from 'src/constants/schema-fields';

export type QuizDocument = HydratedDocument<Quiz>;

@Schema({
  timestamps: true,
})
export class Quiz extends SchemaFeilds {
  @Prop()
  quizTemplateId: string;

  @Prop()
  userId: string;

  @Prop()
  overallScore?: number;

  @Prop()
  overallCorrect?: number;

  @Prop({ default: false })
  finished?: boolean;

  @Prop({
    type: [
      {
        questionId: { type: String },
        score: { type: Number },
        timeSeconds: { type: Number },
        correct: { type: Boolean },
      },
    ],
  })
  answers?: {
    questionId: string;
    score: number;
    timeSeconds: number;
    correct: boolean;
  }[];

  @Prop({ type: [String] })
  players?: [string];

  @Prop({ default: false })
  isBot?: boolean;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

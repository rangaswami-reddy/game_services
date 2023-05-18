import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFeilds } from 'src/constants/schema-fields';
export type QuizTemplateDocument = HydratedDocument<QuizTemplate>;

@Schema({
  timestamps: true,
})
export class QuizTemplate extends SchemaFeilds {
  @Prop()
  quizContent: string;

  @Prop()
  curriculum: string;

  @Prop()
  grade: string;

  @Prop()
  subject: string;

  @Prop()
  topic: string;

  @Prop()
  subTopic: string;

  @Prop()
  quizCategory: string;

  @Prop()
  participationJoinMode: string;

  @Prop()
  selectionCriteria: string;

  @Prop()
  winStatus: string;

  @Prop()
  winRankType: string;

  @Prop()
  winValue: number;

  @Prop()
  numberOfAttempts: string;

  @Prop()
  scoringSystem: string;

  @Prop({ type: [String] })
  enablePoints: string[];

  @Prop({
    type: {
      fileURI: String,
      fileType: String,
    },
  })
  backgroundImage: {
    fileURI: string;
    fileType: string;
  };

  @Prop()
  questionSource: string;

  @Prop()
  questionType: string;

  @Prop({ type: [String] })
  questionContent: string[];

  @Prop({ type: [String] })
  optionContent: string[];

  @Prop({
    type: [
      {
        questionId: { type: String },
        points: { type: Number },
      },
    ],
  })
  questions: {
    questionId: string;
    points: number;
  }[];

  @Prop()
  countdownBeginDelay: number;

  @Prop()
  status: string;

  @Prop()
  isEnable: boolean;
}

export const QuizTemplateSchema = SchemaFactory.createForClass(QuizTemplate);

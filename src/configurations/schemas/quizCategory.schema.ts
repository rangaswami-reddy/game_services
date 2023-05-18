import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFeilds } from 'src/constants/schema-fields';

export type QuizCategoryDocument = HydratedDocument<QuizCategory>;

@Schema({
  timestamps: true,
})
export class QuizCategory extends SchemaFeilds {
  @Prop()
  name: string;

  @Prop()
  describe: string;

  @Prop()
  participationJoinMode: string;

  @Prop()
  selectionCriteria: string;

  @Prop({ default: false })
  isEnabled: boolean;
}

export const QuizCategorySchema = SchemaFactory.createForClass(QuizCategory);

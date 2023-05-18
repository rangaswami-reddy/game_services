import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFeilds } from 'src/constants/schema-fields';

export type WinStatusDocument = HydratedDocument<WinStatus>;

@Schema({
  timestamps: true,
})
export class WinStatus extends SchemaFeilds {
  @Prop()
  name: string;

  @Prop()
  describe: string;

  @Prop()
  quizCategory: string;

  @Prop()
  participationJoinMode: string;

  @Prop()
  selectionCriteria: string;

  @Prop()
  rankType: string;

  @Prop()
  rankValue: string;
}

export const WinStatusSchema = SchemaFactory.createForClass(WinStatus);

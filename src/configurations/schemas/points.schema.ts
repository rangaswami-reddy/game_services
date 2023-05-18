import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFeilds } from 'src/constants/schema-fields';

export type PointDocument = HydratedDocument<Point>;

@Schema({
  timestamps: true,
})
export class Point extends SchemaFeilds {
  @Prop()
  quizCategory: string;

  @Prop()
  pointsCategory: string;

  @Prop()
  value: number;

  @Prop()
  describe: string;
}

export const PointSchema = SchemaFactory.createForClass(Point);

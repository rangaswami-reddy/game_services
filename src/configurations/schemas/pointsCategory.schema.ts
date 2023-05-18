import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFeilds } from 'src/constants/schema-fields';

export type PointsCategoryDocument = HydratedDocument<PointsCategory>;

@Schema({
  timestamps: true,
})
export class PointsCategory extends SchemaFeilds {
  @Prop()
  name: string;

  @Prop()
  describe: string;

  @Prop({ default: false })
  isEnabled: boolean;
}

export const PointsCategorySchema =
  SchemaFactory.createForClass(PointsCategory);

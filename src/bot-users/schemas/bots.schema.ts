import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFeilds } from 'src/constants/schema-fields';

export type BotDocument = HydratedDocument<Bot>;

@Schema({
  timestamps: true,
})
export class Bot extends SchemaFeilds {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop({
    type: {
      fileURI: String,
      fileType: String,
    },
  })
  photo: {
    fileURI: string;
    fileType: string;
  };
}

export const BotSchema = SchemaFactory.createForClass(Bot);

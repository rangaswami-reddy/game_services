import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFeilds } from 'src/constants/schema-fields';

export type MessagesCategoryDocument = HydratedDocument<MessagesCategory>;
export type MessagesTypeDocument = HydratedDocument<MessagesType>;
export type MessagesTextDocument = HydratedDocument<MessagesText>;

@Schema({
  timestamps: true,
})
export class MessagesCategory extends SchemaFeilds {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  describe: string;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  createdById: string;

  @Prop()
  updatedById: string;
}

@Schema({
  timestamps: true,
})
export class MessagesType extends SchemaFeilds {
  @Prop()
  name: string;

  @Prop()
  describe: string;

  @Prop()
  messagesCategory: string;

  @Prop({ default: false })
  isEnabled: boolean;
}

@Schema({
  timestamps: true,
})
export class MessagesText extends SchemaFeilds {
  @Prop({
    type: [
      {
        name: String,
        describe: String,
      },
    ],
  })
  messagesArray: {
    name: string;
    describe: string;
  }[];

  @Prop()
  messagesCategory: string;

  @Prop()
  messagesType: string;

  @Prop()
  quizCategory: string;

  @Prop({ default: false })
  isEnabled: boolean;
}

export const MessagesCategorySchema =
  SchemaFactory.createForClass(MessagesCategory);
export const MessagesTypeSchema = SchemaFactory.createForClass(MessagesType);
export const MessagesTextSchema = SchemaFactory.createForClass(MessagesText);

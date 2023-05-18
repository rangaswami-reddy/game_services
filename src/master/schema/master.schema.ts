import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ParticipationJoinModeDocument =
  HydratedDocument<ParticipationJoinMode>;
export type SelectionCriteriaDocument = HydratedDocument<SelectionCriteria>;
export type RankTypeDocument = HydratedDocument<RankType>;
export type QuestionSourceDocument = HydratedDocument<QuestionSource>;
export type QuizContentDocument = HydratedDocument<QuizContent>;
export type QuestionTypeDocument = HydratedDocument<QuestionType>;
export type QuestionContentDocument = HydratedDocument<QuestionContent>;
export type OptionContentDocument = HydratedDocument<OptionContent>;
export type MasterMessageDocument = HydratedDocument<MasterMessage>;

@Schema({
  timestamps: true,
})
export class ParticipationJoinMode {
  @Prop()
  name: string;
}

@Schema({
  timestamps: true,
})
export class SelectionCriteria {
  @Prop()
  name: string;
}

@Schema({
  timestamps: true,
})
export class RankType {
  @Prop()
  name: string;
}

@Schema({
  timestamps: true,
})
export class QuestionSource {
  @Prop()
  name: string;
}

@Schema({
  timestamps: true,
})
export class QuizContent {
  @Prop()
  name: string;
}

@Schema({
  timestamps: true,
})
export class QuestionType {
  @Prop()
  name: string;
}

@Schema({
  timestamps: true,
})
export class QuestionContent {
  @Prop()
  name: string;
}

@Schema({
  timestamps: true,
})
export class OptionContent {
  @Prop()
  name: string;
}

@Schema({
  timestamps: true,
})
export class MasterMessage {
  @Prop()
  name: string;
}

export const ParticipationJoinModeSchema = SchemaFactory.createForClass(
  ParticipationJoinMode,
);
export const SelectionCriteriaSchema =
  SchemaFactory.createForClass(SelectionCriteria);
export const RankTypeSchema = SchemaFactory.createForClass(RankType);
export const QuestionSourceSchema =
  SchemaFactory.createForClass(QuestionSource);
export const QuizContentSchema = SchemaFactory.createForClass(QuizContent);
export const QuestionTypeSchema = SchemaFactory.createForClass(QuestionType);
export const QuestionContentSchema =
  SchemaFactory.createForClass(QuestionContent);
export const OptionContentSchema = SchemaFactory.createForClass(OptionContent);
export const MasterMessageSchema = SchemaFactory.createForClass(MasterMessage);

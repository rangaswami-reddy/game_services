import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreateMasterDto {
  @IsArray()
  @IsString({ each: true })
  participationJoinMode: { name: string }[];

  @IsArray()
  @IsString({ each: true })
  selectionCriteria: { name: string }[];

  @IsArray()
  @IsString({ each: true })
  rankType: { name: string }[];

  @IsArray()
  @IsString({ each: true })
  questionSource: { name: string }[];

  @IsArray()
  @IsString({ each: true })
  quizContent: { name: string }[];

  @IsArray()
  @IsString({ each: true })
  curriculum: { name: string }[];

  @IsArray()
  @IsString({ each: true })
  academicSubject: { name: string }[];

  @IsArray()
  @IsString({ each: true })
  questionType: { name: string }[];

  @IsArray()
  @IsString({ each: true })
  questionContent: { name: string }[];

  @IsArray()
  @IsString({ each: true })
  optionContent: { name: string }[];

  @IsArray()
  @IsString({ each: true })
  messageCategory: { name: string }[];

  @IsNumber()
  version: number;
  createdBy?: string;
  updatedBy?: string;
}

export class ParticipationJoinModeDto {
  name: string;
}

export class SelectionCriteria {
  name: string;
}

export class RankType {
  name: string;
}

export class QuestionSource {
  name: string;
}

export class QuizContent {
  name: string;
}

export class Curriculum {
  name: string;
}

export class AcademicSubject {
  name: string;
}

export class QuestionType {
  name: string;
}

export class QuestionContent {
  name: string;
}

export class OptionContent {
  name: string;
}

export class MasterMessage {
  name: string;
}

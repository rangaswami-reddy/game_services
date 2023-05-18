import { IsString, IsNumber, IsArray, IsObject } from 'class-validator';

export class CreateQuizTemplateDto {
  @IsString()
  quizContent: string;
  @IsString()
  curriculum: string;
  @IsString()
  grade: string;
  @IsString()
  subject: string;
  @IsString()
  topic: string;
  @IsString()
  subTopic?: string;
  @IsString()
  quizCategory: string;
  @IsString()
  participationJoinMode: string;
  @IsString()
  selectionCriteria: string;
  @IsString()
  winStatus?: string;
  @IsString()
  winRankType?: string;
  @IsNumber()
  winValue?: number;
  @IsNumber()
  numberOfAttempts?: string;
  @IsString()
  scoringSystem?: string;
  @IsArray()
  enablePoints?: [string];
  @IsObject()
  backgroundImage: {
    fileURI: string;
    fileType: string;
  };
  @IsString()
  questionSource: string;
  @IsString()
  questionType: string;
  @IsArray()
  questionContent: [string];
  @IsArray()
  optionContent: [string];
  @IsArray()
  questions: {
    questionId: string;
    points: number;
  }[];
  @IsNumber()
  countdownBeginDelay?: number;
  status?: string;
  isEnable?: boolean;
  createdBy?: string;
  createdById?: string;
}

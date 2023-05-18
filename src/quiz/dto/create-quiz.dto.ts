import { IsString, IsNumber, IsArray, IsBoolean } from 'class-validator';
export class CreateQuizDto {
  @IsString()
  quizTemplateId: string;
  @IsString()
  userId: string;
  @IsNumber()
  overallScore: number;
  @IsNumber()
  overallCorrect: number;
  @IsBoolean()
  finished: boolean;
  @IsArray()
  players: [string];
  @IsBoolean()
  isBot: boolean;
  @IsArray()
  answers?: {
    questionId: string;
    score: number;
    timeSeconds: number;
    correct: boolean;
  }[];
  createdBy?: string;
  createdById?: string;
}

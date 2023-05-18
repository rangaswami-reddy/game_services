import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QuizTemplateService } from './quiz-template.service';
import { CreateQuizTemplateDto } from './dto/create-quiz-template.dto';
import { UpdateQuizTemplateDto } from './dto/update-quiz-template.dto';
import { QuizTemplate } from './schema/quiz-template.schema';

@Controller('quiz-template')
export class QuizTemplateController {
  constructor(private readonly quizTemplateService: QuizTemplateService) {}

  @Post()
  create(
    @Body() createQuizTemplateDto: CreateQuizTemplateDto,
  ): Promise<QuizTemplate> {
    return this.quizTemplateService.create(createQuizTemplateDto);
  }

  @Get()
  findAll(@Query() { offset, limit }: { offset: number; limit: number }) {
    return this.quizTemplateService.findAll(offset, limit);
  }

  @Get('/filter')
  filter(
    @Query()
    {
      offset,
      limit,
      participationJoinMode,
      selectionCriteria,
      winStatus,
      winRankType,
      scoringSystem,
      questionSource,
      enablePoints,
    }: {
      offset: number;
      limit: number;
      participationJoinMode: string;
      selectionCriteria: string;
      winStatus: string;
      winRankType: string;
      scoringSystem: string;
      questionSource: string;
      enablePoints: string;
    },
  ) {
    return this.quizTemplateService.filter({
      offset,
      limit,
      participationJoinMode,
      selectionCriteria,
      winStatus,
      winRankType,
      scoringSystem,
      questionSource,
      enablePoints,
    });
  }

  @Get('/get-questions/:id')
  getQuestions(@Param('id') id: string): Promise<any> {
    return this.quizTemplateService.getQuestions(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<QuizTemplate> {
    return this.quizTemplateService.findOne(id);
  }

  @Get('/teacher/:id')
  findByTeacherId(@Param('id') id: string): Promise<QuizTemplate[]> {
    return this.quizTemplateService.findByTeacherId(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizTemplateDto: UpdateQuizTemplateDto,
  ): Promise<QuizTemplate> {
    return this.quizTemplateService.update(id, updateQuizTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<QuizTemplate> {
    return this.quizTemplateService.remove(id);
  }
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('api-questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  findAll(
    @Query()
    {
      limit,
      page,
      grade,
      subjects,
      chapters,
      question_type,
    }: {
      limit?: number;
      page?: number;
      grade?: number;
      subjects?: number;
      chapters?: number;
      question_type?: number;
    },
  ) {
    return this.questionsService.findAll(
      limit,
      page,
      grade,
      subjects,
      chapters,
      question_type,
    );
  }

  @Get('/questions/:id')
  questionById(@Param('id') id: string) {
    return this.questionsService.questionById(id);
  }

  @Get('/asset/:id')
  assetNamebyID(@Param('id') id: string) {
    return this.questionsService.assetNamebyID(id);
  }

  @Get('/curriculums')
  curriculum() {
    return this.questionsService.curriculum();
  }

  @Get('/grades/:id')
  grades(@Param('id') id: string) {
    return this.questionsService.grades(id);
  }

  @Get('/subjects/:id')
  subjects(@Param('id') id: string) {
    return this.questionsService.subjects(id);
  }

  @Get('/topics/:id')
  topics(@Param('id') id: string) {
    return this.questionsService.topics(id);
  }

  @Get('/sub-topics/:id')
  subTopics(@Param('id') id: string) {
    return this.questionsService.subTopics(id);
  }
}

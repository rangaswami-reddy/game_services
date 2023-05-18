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
import { QuizService } from './quiz.service';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './schemas/quiz.schema';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('/join')
  join(
    @Body() bodyDto: { mode: string; firstName: string; email: string },
  ): Promise<Quiz> {
    return this.quizService.join(bodyDto);
  }

  @Post('/submit')
  submit(
    @Body()
    bodyDto: {
      quizId: string;
      answer: string;
      questionNumber: number;
      submitInSecound: number;
      uuid: string;
    },
  ): Promise<any> {
    return this.quizService.submit(bodyDto);
  }

  @Post('/bot-play-quiz')
  botPlayQuiz(
    @Body() bodyDto: { quizTemplateId: string; botNums: number },
  ): Promise<any> {
    return this.quizService.botPlayQuiz(bodyDto);
  }

  @Get()
  findAll(@Query() { offset, limit }: { offset: number; limit: number }) {
    return this.quizService.findAll(offset, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Quiz> {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ): Promise<Quiz> {
    return this.quizService.update(id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Quiz> {
    return this.quizService.remove(id);
  }
}

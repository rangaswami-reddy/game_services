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
import { ConfigurationsService } from './configurations.service';
import {
  WinStatusDto,
  QuizParameterDto,
  QuizCategoryDto,
  PointsCategoryDto,
  PointDto,
  MessagesCategoryDto,
  MessagesTypeDto,
  MessagesTextDto,
} from './dto/create-configration.dto';
import { PointsCategory } from './schemas/pointsCategory.schema';
import { QuizCategory } from './schemas/quizCategory.schema';
import { WinStatus } from './schemas/winStatus.schema';
import { Point } from './schemas/points.schema';
import { QuizParameter } from './schemas/quizParamers.schema';
import {
  MessagesCategory,
  MessagesType,
  MessagesText,
} from './schemas/messagesCategory.schema';

@Controller('configurations')
export class ConfigurationsController {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  @Post('/points-category')
  pointsCategoryCreate(
    @Body() pointsCategoryDto: PointsCategoryDto,
  ): Promise<PointsCategory> {
    return this.configurationsService.pointsCategoryCreate(pointsCategoryDto);
  }

  @Get('/points-category')
  pointsCategoryFindAll(
    @Query() { offset, limit }: { offset: number; limit: number },
  ) {
    return this.configurationsService.pointsCategoryFindAll(offset, limit);
  }

  @Get('/points-category-all')
  pointsCategoryAll() {
    return this.configurationsService.pointsCategoryAll();
  }

  @Get('/points-category/:id')
  pointsCategoryFindOne(@Param('id') id: string): Promise<PointsCategory> {
    return this.configurationsService.pointsCategoryFindOne(id);
  }

  @Patch('/points-category/:id')
  pointsCategoryUpdate(
    @Param('id') id: string,
    @Body() pointsCategoryDto: PointsCategoryDto,
  ): Promise<PointsCategory> {
    return this.configurationsService.pointsCategoryUpdate(
      id,
      pointsCategoryDto,
    );
  }

  @Delete('/points-category/:id')
  pointsCategoryRemove(@Param('id') id: string): Promise<PointsCategory> {
    return this.configurationsService.pointsCategoryRemove(id);
  }

  @Post('/quiz-category')
  quizCategoryCreate(
    @Body() quizCategoryDto: QuizCategoryDto,
  ): Promise<QuizCategory> {
    return this.configurationsService.quizCategoryCreate(quizCategoryDto);
  }

  @Get('/quiz-category')
  quizCategoryFindAll(
    @Query() { offset, limit }: { offset: number; limit: number },
  ) {
    return this.configurationsService.quizCategoryFindAll(offset, limit);
  }

  @Get('/quiz-category-all')
  quizCategoryAll() {
    return this.configurationsService.quizCategoryAll();
  }

  @Get('/quiz-category/:id')
  quizCategoryFindOne(@Param('id') id: string): Promise<QuizCategory> {
    return this.configurationsService.quizCategoryFindOne(id);
  }

  @Patch('/quiz-category/:id')
  quizCategoryUpdate(
    @Param('id') id: string,
    @Body() quizCategoryDto: QuizCategoryDto,
  ): Promise<QuizCategory> {
    return this.configurationsService.quizCategoryUpdate(id, quizCategoryDto);
  }

  @Delete('/quiz-category/:id')
  quizCategoryRemove(@Param('id') id: string): Promise<QuizCategory> {
    return this.configurationsService.quizCategoryRemove(id);
  }

  @Post('/win-status')
  winStatusCreate(@Body() winStatusDto: WinStatusDto): Promise<WinStatus> {
    return this.configurationsService.winStatusCreate(winStatusDto);
  }

  @Get('/win-status')
  winStatusFindAll(
    @Query() { offset, limit }: { offset: number; limit: number },
  ) {
    return this.configurationsService.winStatusFindAll(offset, limit);
  }

  @Get('/win-status-all')
  winStatusAll() {
    return this.configurationsService.winStatusAll();
  }

  @Get('/win-status/:id')
  winStatusFindOne(@Param('id') id: string): Promise<WinStatus> {
    return this.configurationsService.winStatusFindOne(id);
  }

  @Patch('/win-status/:id')
  winStatusUpdate(
    @Param('id') id: string,
    @Body() winStatusDto: WinStatusDto,
  ): Promise<WinStatus> {
    return this.configurationsService.winStatusUpdate(id, winStatusDto);
  }

  @Delete('/win-status/:id')
  winStatusRemove(@Param('id') id: string): Promise<WinStatus> {
    return this.configurationsService.winStatusRemove(id);
  }

  @Post('/point')
  pointCreate(@Body() pointDto: PointDto): Promise<Point> {
    return this.configurationsService.pointCreate(pointDto);
  }

  @Get('/point')
  pointFindAll(@Query() { offset, limit }: { offset: number; limit: number }) {
    return this.configurationsService.pointFindAll(offset, limit);
  }

  @Get('/point/:id')
  pointFindOne(@Param('id') id: string): Promise<Point> {
    return this.configurationsService.pointFindOne(id);
  }

  @Patch('/point/:id')
  pointUpdate(
    @Param('id') id: string,
    @Body() pointDto: PointDto,
  ): Promise<Point> {
    return this.configurationsService.pointUpdate(id, pointDto);
  }

  @Delete('/point/:id')
  pointRemove(@Param('id') id: string): Promise<Point> {
    return this.configurationsService.pointRemove(id);
  }

  @Post('/quiz-parameter')
  quizParameterCreate(
    @Body() quizParameterDto: QuizParameterDto,
  ): Promise<QuizParameter> {
    return this.configurationsService.quizParameterCreate(quizParameterDto);
  }

  @Get('/quiz-parameter')
  quizParameterFindAll(
    @Query() { offset, limit }: { offset: number; limit: number },
  ) {
    return this.configurationsService.quizParameterFindAll(offset, limit);
  }

  @Get('/quiz-parameter/quiz-category/:id')
  getQuizCategoryId(@Param('id') id: string): Promise<any> {
    return this.configurationsService.getQuizCategoryId(id);
  }

  @Post('/quiz-parameter/participation-join')
  getParticipationJoinModeId(
    @Body() bodyDto: { participationJoinId: string; quizCategoryId: string },
  ): Promise<any> {
    return this.configurationsService.getParticipationJoinModeId(bodyDto);
  }

  @Post('/quiz-parameter/selection-criteria')
  getSelectionCriteriaId(
    @Body()
    bodyDto: {
      participationJoinId: string;
      quizCategoryId: string;
      selectionCriteriaId: string;
    },
  ): Promise<any> {
    return this.configurationsService.getSelectionCriteriaId(bodyDto);
  }

  @Post('/quiz-parameter/question-source')
  getQuestionSourceId(
    @Body()
    bodyDto: {
      participationJoinId: string;
      quizCategoryId: string;
      selectionCriteriaId: string;
      questionSourceId: string;
    },
  ): Promise<any> {
    return this.configurationsService.getQuestionSourceId(bodyDto);
  }

  @Get('/quiz-parameter/:id')
  quizParameterFindOne(@Param('id') id: string): Promise<QuizParameter> {
    return this.configurationsService.quizParameterFindOne(id);
  }

  @Patch('/quiz-parameter/:id')
  quizParameterUpdate(
    @Param('id') id: string,
    @Body() quizParameterDto: QuizParameterDto,
  ): Promise<QuizParameter> {
    return this.configurationsService.quizParameterUpdate(id, quizParameterDto);
  }

  @Delete('/quiz-parameter/:id')
  quizParameterRemove(@Param('id') id: string): Promise<QuizParameter> {
    return this.configurationsService.quizParameterRemove(id);
  }

  @Post('/messages-category')
  messagesCategoryCreate(
    @Body() messagesCategoryDto: MessagesCategoryDto,
  ): Promise<MessagesCategory> {
    return this.configurationsService.messagesCategoryCreate(
      messagesCategoryDto,
    );
  }

  @Get('/messages-category')
  messagesCategoryFindAll(
    @Query() { offset, limit }: { offset: number; limit: number },
  ) {
    return this.configurationsService.messagesCategoryFindAll(offset, limit);
  }

  @Get('/messages-category/:id')
  messagesCategoryFindOne(@Param('id') id: string): Promise<MessagesCategory> {
    return this.configurationsService.messagesCategoryFindOne(id);
  }

  @Patch('/messages-category/:id')
  messagesCategoryUpdate(
    @Param('id') id: string,
    @Body() messagesCategoryDto: MessagesCategoryDto,
  ): Promise<MessagesCategory> {
    return this.configurationsService.messagesCategoryUpdate(
      id,
      messagesCategoryDto,
    );
  }

  @Delete('/messages-category/:id')
  messagesCategoryRemove(@Param('id') id: string): Promise<MessagesCategory> {
    return this.configurationsService.messagesCategoryRemove(id);
  }

  @Post('/messages-type')
  messagesTypeCreate(
    @Body() messagesTypeDto: MessagesTypeDto,
  ): Promise<MessagesType> {
    return this.configurationsService.messagesTypeCreate(messagesTypeDto);
  }

  @Get('/messages-type')
  messagesTypeFindAll(
    @Query() { offset, limit }: { offset: number; limit: number },
  ) {
    return this.configurationsService.messagesTypeFindAll(offset, limit);
  }

  @Get('/messages-type/:id')
  messagesTypeFindOne(@Param('id') id: string): Promise<MessagesType> {
    return this.configurationsService.messagesTypeFindOne(id);
  }

  @Patch('/messages-type/:id')
  messagesTypeUpdate(
    @Param('id') id: string,
    @Body() messagesTypeDto: MessagesTypeDto,
  ): Promise<MessagesType> {
    return this.configurationsService.messagesTypeUpdate(id, messagesTypeDto);
  }

  @Delete('/messages-type/:id')
  messagesTypeRemove(@Param('id') id: string): Promise<MessagesType> {
    return this.configurationsService.messagesTypeRemove(id);
  }

  @Post('/messages-text')
  messagesTextCreate(
    @Body() messagesTextDto: MessagesTextDto,
  ): Promise<MessagesText> {
    return this.configurationsService.messagesTextCreate(messagesTextDto);
  }

  @Get('/messages-text/:id')
  messagesTextFindById(@Param('id') id: string): Promise<MessagesText> {
    return this.configurationsService.messagesTextFindById(id);
  }

  @Get('/messages-text')
  messagesTypeByMessageCategoryId(
    @Query()
    { messagesCategory }: { messagesCategory: string; quizCategory: string },
  ) {
    return this.configurationsService.messagesTypeByMessageCategoryId(
      messagesCategory,
    );
  }

  @Patch('/messages-text/:id')
  messagesTextUpdate(
    @Param('id') id: string,
    @Body() messagesTextDto: MessagesTextDto,
  ): Promise<MessagesText> {
    return this.configurationsService.messagesTextUpdate(id, messagesTextDto);
  }

  @Post('/messages/add')
  addMessages(
    @Body()
    { id, name, describe }: { id: string; name: string; describe: string },
  ): Promise<MessagesText> {
    return this.configurationsService.addMessages(id, name, describe);
  }

  @Post('/messages/update')
  updateMessages(
    @Body()
    { id, messageId, name }: { id: string; messageId: string; name: string },
  ): Promise<MessagesText> {
    return this.configurationsService.updateMessages(id, messageId, name);
  }

  @Get('/messages/one')
  messagesTextFindOne(
    @Query()
    {
      messagesCategory,
      quizCategory,
      messagesType,
    }: {
      messagesCategory: string;
      quizCategory: string;
      messagesType: string;
    },
  ) {
    return this.configurationsService.messagesTextFindOne({
      messagesCategory,
      quizCategory,
      messagesType,
    });
  }

  @Get('/messages/random')
  messagesTextRandom(
    @Query()
    {
      quizCategory,
      messagesCategory,
      messagesType,
    }: {
      quizCategory: string;
      messagesCategory: string;
      messagesType: string;
    },
  ) {
    return this.configurationsService.messagesTextRandom({
      quizCategory,
      messagesCategory,
      messagesType,
    });
  }

  @Get('/messages/all')
  messagesTextFindAll(
    @Query()
    { offset, limit }: { offset: number; limit: number },
  ) {
    return this.configurationsService.messagesTextFindAll({
      offset,
      limit,
    });
  }

  @Post('/messages/remove')
  messagesTextRemove(
    @Body() { messageId, id }: { messageId: string; id: string },
  ): Promise<MessagesText> {
    return this.configurationsService.messagesTextRemove(id, messageId);
  }

  @Delete('/messages-text')
  messagesTextDelete(@Param('id') id: string): Promise<MessagesText> {
    return this.configurationsService.messagesTextDelete(id);
  }

  @Get('/delete/:version')
  deleteData(@Param('version') version: string): Promise<string> {
    return this.configurationsService.deleteData(version);
  }
}

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MasterService } from './master.service';
import { ParticipationJoinModeDto } from './dto/create-master.dto';
import {
  ParticipationJoinMode,
  SelectionCriteria,
  RankType,
  QuestionSource,
  QuizContent,
  QuestionType,
  QuestionContent,
  OptionContent,
  MasterMessage,
} from './schema/master.schema';

@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Post('/participationJoinMode')
  createParticipationJoinMode(
    @Body() createMasterDto: ParticipationJoinModeDto,
  ): Promise<ParticipationJoinMode> {
    return this.masterService.createParticipationJoinMode(createMasterDto);
  }
  @Post('/selectionCriteria')
  createSelectionCriteria(
    @Body() createMasterDto: ParticipationJoinModeDto,
  ): Promise<SelectionCriteria> {
    return this.masterService.createSelectionCriteria(createMasterDto);
  }
  @Post('/rankType')
  createRankType(
    @Body() createMasterDto: ParticipationJoinModeDto,
  ): Promise<RankType> {
    return this.masterService.createRankType(createMasterDto);
  }
  @Post('/questionSource')
  createQuestionSource(
    @Body() createMasterDto: ParticipationJoinModeDto,
  ): Promise<QuestionSource> {
    return this.masterService.createQuestionSource(createMasterDto);
  }
  @Post('/quizContent')
  createQuizContent(
    @Body() createMasterDto: ParticipationJoinModeDto,
  ): Promise<QuizContent> {
    return this.masterService.createQuizContent(createMasterDto);
  }

  @Post('/questionType')
  createQuestionType(
    @Body() createMasterDto: ParticipationJoinModeDto,
  ): Promise<QuestionType> {
    return this.masterService.createQuestionType(createMasterDto);
  }
  @Post('/questionContent')
  createQuestionContent(
    @Body() createMasterDto: ParticipationJoinModeDto,
  ): Promise<QuestionContent> {
    return this.masterService.createQuestionContent(createMasterDto);
  }
  @Post('/optionContent')
  createOptionContent(
    @Body() createMasterDto: ParticipationJoinModeDto,
  ): Promise<OptionContent> {
    return this.masterService.createOptionContent(createMasterDto);
  }

  @Post('/masterMessage')
  createMasterMessage(
    @Body() createMasterDto: ParticipationJoinModeDto,
  ): Promise<MasterMessage> {
    return this.masterService.createMasterMessage(createMasterDto);
  }

  @Get('/all')
  findAll() {
    return this.masterService.findAll();
  }

  @Get('/delete/:version')
  deleteMasterData(@Param('version') version: string): Promise<string> {
    return this.masterService.deleteMasterData(version);
  }
}

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
import { BotUsersService } from './bot-users.service';
import { CreateBotUserDto } from './dto/create-bot-user.dto';
import { UpdateBotUserDto } from './dto/update-bot-user.dto';

@Controller('bot-users')
export class BotUsersController {
  constructor(private readonly botUsersService: BotUsersService) {}

  @Post()
  create(@Body() createBotUserDto: CreateBotUserDto) {
    return this.botUsersService.create(createBotUserDto);
  }

  @Get('/create-dynamicbots')
  createDynamicBots(@Query('num') num: number) {
    return this.botUsersService.createDynamicBots(num);
  }

  @Get()
  findAll() {
    return this.botUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.botUsersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBotUserDto: UpdateBotUserDto) {
    return this.botUsersService.update(id, updateBotUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.botUsersService.remove(id);
  }

  @Delete('/delete/all')
  removeAll() {
    return this.botUsersService.removeAll();
  }
}

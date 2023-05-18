import { forwardRef, Module } from '@nestjs/common';
import { BotUsersService } from './bot-users.service';
import { BotUsersController } from './bot-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bot, BotSchema } from './schemas/bots.schema';
import { HelpersModule } from 'src/helpers/helpers.module';
import { QuizModule } from 'src/quiz/quiz.module';

@Module({
  imports: [
    forwardRef(() => QuizModule),
    MongooseModule.forFeature([{ name: Bot.name, schema: BotSchema }]),
    HelpersModule,
  ],
  controllers: [BotUsersController],
  providers: [BotUsersService],
  exports: [BotUsersService],
})
export class BotUsersModule {}

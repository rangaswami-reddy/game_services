import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HelpersService } from 'src/helpers/helpers.service';
import { QuizService } from 'src/quiz/quiz.service';
import { CreateBotUserDto } from './dto/create-bot-user.dto';
import { UpdateBotUserDto } from './dto/update-bot-user.dto';
import { Bot, BotDocument } from './schemas/bots.schema';

@Injectable()
export class BotUsersService {
  constructor(
    @Inject(forwardRef(() => QuizService))
    private readonly quizService: QuizService,
    private readonly helpersService: HelpersService,
    @InjectModel(Bot.name) private BotModel: Model<BotDocument>,
  ) {}

  async create(createBotUserDto: CreateBotUserDto): Promise<Bot> {
    const created = new this.BotModel(createBotUserDto);
    return await created.save();
  }

  async createDynamicBots(num: number): Promise<Bot[]> {
    const bots = [];
    for (let b = 0; b < num; b++) {
      const firstName = await this.helpersService.userNameGen();
      const lastName = await this.helpersService.userNameGen();
      bots.push({
        firstName,
        lastName,
        email: firstName + '@gmail.com',
        createdBy: 'admin',
      });
    }
    return await this.BotModel.insertMany(bots);
  }

  async findAll() {
    return await this.BotModel.find();
  }

  async findOne(id: string) {
    return await this.BotModel.findById(id);
  }
  async findByEmail(email: string) {
    return await this.BotModel.findOne({ email });
  }

  async getAllUsers(emails: [string]) {
    return await this.BotModel.find({ email: { $in: emails } });
  }

  async update(id: string, updateBotUserDto: UpdateBotUserDto): Promise<Bot> {
    return await this.BotModel.findByIdAndUpdate(id, updateBotUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.BotModel.findByIdAndRemove(id);
  }

  async removeAll() {
    return await this.BotModel.deleteMany();
  }
}

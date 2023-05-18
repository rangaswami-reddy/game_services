import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { QuizModule } from './quiz/quiz.module';
import { QuizTemplateModule } from './quiz-template/quiz-template.module';
import { ConfigurationsModule } from './configurations/configurations.module';
import { MasterModule } from './master/master.module';
import { join } from 'path';
import { QuestionsModule } from './api-questions/questions.module';
import { BotUsersModule } from './bot-users/bot-users.module';

@Module({
  imports: [
    process.env.NODE_ENV === 'prod'
      ? ConfigModule.forRoot({
          envFilePath: '.prod.env',
        })
      : ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    HttpModule,
    QuizModule,
    QuizTemplateModule,
    ConfigurationsModule,
    MasterModule,
    QuestionsModule,
    BotUsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

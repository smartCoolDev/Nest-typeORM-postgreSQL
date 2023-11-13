import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summoner } from './summoner/summoner.entity';
import { SummonerService } from './summoner/summoner.service';
import { SummonerController } from './summoner/summoner.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestControllerController } from './test-controller/test-controller.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'summoner_db',
      entities: [Summoner],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Summoner]),
  ],
  controllers: [AppController, TestControllerController, SummonerController],
  providers: [AppService, SummonerService],
})
export class AppModule {}

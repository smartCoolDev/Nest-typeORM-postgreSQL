import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summoner } from './summoner/summoner.entity';
import { SummonerService } from './summoner/summoner.service';
import { SummonerController } from './summoner/summoner.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from "@nestjs/axios";

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
    HttpModule,
    TypeOrmModule.forFeature([Summoner]),
  ],
  controllers: [AppController, SummonerController],
  providers: [AppService, SummonerService],
})
export class AppModule {}

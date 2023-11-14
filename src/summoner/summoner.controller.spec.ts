import { Test, TestingModule } from '@nestjs/testing';
import { SummonerController } from './summoner.controller';
import { SummonerService } from './summoner.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Summoner } from './summoner.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AXIOS_INSTANCE_TOKEN } from "@nestjs/axios/dist/http.constants";

describe('SummonerController', () => {
  let controller: SummonerController;
  let service: SummonerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummonerController],
      providers: [
        SummonerService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            // ... define other methods you need for testing
          },
        },
        {
          provide: AXIOS_INSTANCE_TOKEN,
          useExisting: HttpService,
        },
        {
          provide: getRepositoryToken(Summoner),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<SummonerController>(SummonerController);
    service = module.get<SummonerService>(SummonerService);
  });

  describe('createSpecifiedSummoner', () => {
    it('should create a specified summoner', async () => {
      const region = 'na1';
      const apiKey = 'RGAPI-05dc110e-8e1c-4958-a0fd-73c8f89b116f';

      const mockResponse: AxiosResponse<any> = {
        headers: undefined,
        config: undefined,
        data: {
          entries: [
            {
              summonerId: 'wbTY3IQ5GjwsNc89FRj9fb4fRRnyK1osXsQAHmBZoPbAaVc',
              summonerName: 'MySwordCrimson',
              leaguePoints: 1258,
              rank: 'I',
              wins: 185,
              losses: 152,
              veteran: true,
              inactive: false,
              freshBlood: false,
              hotStreak: false,
            },
            {
              summonerId:
                '2-oZ6aB8d_hkGA8HeiyPp5-zVQxnGPOYrwk1Z--EcqCCkbuIjTBdlj_A6Q',
              summonerName: 'P1ng',
              leaguePoints: 844,
              rank: 'I',
              wins: 281,
              losses: 228,
              veteran: false,
              inactive: false,
              freshBlood: true,
              hotStreak: true,
            },
            {
              summonerId: 'B838tMD3WkTgELmVcpvYKsQUQTeIrhsYO5T0VpuL2KiujxA',
              summonerName: 'Mister Wubz',
              leaguePoints: 948,
              rank: 'I',
              wins: 229,
              losses: 180,
              veteran: false,
              inactive: false,
              freshBlood: false,
              hotStreak: false,
            },
            {
              summonerId: 'x8br8Z1Q1UMMjNoQfjWRj1pGEJAigSNeVPNAq6LRf3GmHp4',
              summonerName: 'ARMAO',
              leaguePoints: 1910,
              rank: 'I',
              wins: 337,
              losses: 272,
              veteran: true,
              inactive: false,
              freshBlood: false,
              hotStreak: false,
            },
            {
              summonerId: 'Zd187HHtUdJPAv-UH1m9M3e8np4rHr_xvCvRY2QBCw8Nllc',
              summonerName: 'rege',
              leaguePoints: 873,
              rank: 'I',
              wins: 133,
              losses: 111,
              veteran: false,
              inactive: false,
              freshBlood: false,
              hotStreak: false,
            },
          ],
        },
        status: HttpStatus.OK,
        statusText: 'OK',
      };

      jest
        .spyOn(service, 'createSpecifiedSummoner')
        .mockResolvedValueOnce(mockResponse.data);

      const result = await controller.createSpecifiedSummoner({
        region,
        apiKey,
      });

      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getAllSummoners', () => {
    it('should return all summoners', async () => {
      const mockSummoners: Summoner[] = [
        // Define your mock summoners here
      ];

      jest
        .spyOn(service, 'getAllSummoners')
        .mockResolvedValueOnce(mockSummoners);

      const result = await controller.getAllSummoners();

      expect(result).toEqual(mockSummoners);
    });
  });

  describe('getLeaderboard', () => {
    it('should return the leaderboard for a summoner', async () => {
      const summonerName = 'YourSummonerName';
      const region = 'na1';

      const mockLeaderboard: Summoner[] = [
        // Define your mock leaderboard here
      ];

      jest
        .spyOn(service, 'getLeaderboard')
        .mockResolvedValueOnce(mockLeaderboard);

      const result = await controller.getLeaderboard(summonerName, region);

      expect(result).toEqual(mockLeaderboard);
    });
  });
});

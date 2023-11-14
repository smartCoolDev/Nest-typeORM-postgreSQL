import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Summoner } from './summoner.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class SummonerService {
  private newRow: Promise<Summoner>;

  constructor(
    @InjectRepository(Summoner)
    private readonly summonerRepository: Repository<Summoner>,
    private readonly httpService: HttpService,
  ) {}

  async createSpecifiedSummoner(
    region: string,
    apiKey: string,
  ): Promise<Summoner> {
    try {
      // const region = 'na1'; // Replace with the desired region
      // const apiKey = 'RGAPI-05dc110e-8e1c-4958-a0fd-73c8f89b116f'; // Replace with your actual API key

      const response: AxiosResponse<any> = await this.httpService
        .get(
          `https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${apiKey}`,
        )
        .toPromise();
      const responseData = response.data.entries; // Store the response data
      if (Array.isArray(responseData)) {
        for (const row of responseData) {
          const newRow = this.summonerRepository.create(row);
          // await this.summonerRepository.save(newRow);
          try {
            await this.summonerRepository.save(newRow);
          } catch (error) {
            console.error(error);
            throw {
              statusCode: HttpStatus.NOT_FOUND,
              message: 'Database operation failed',
            };
          }
        }
      }
      return this.newRow; // Return the created row
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllSummoners(): Promise<Summoner[]> {
    return this.summonerRepository.find();
  }

  async getLeaderboard(
    summonerName: string,
    region: string,
  ): Promise<Summoner[]> {
    // Perform any necessary validation or formatting of the summonerName and region

    // Retrieve the leaderboard from the summonerRepository based on the summoner name and region
    const leaderboard = await this.summonerRepository.find({
      where: {
        summonerName,
      },
    });

    return leaderboard;
  }
}

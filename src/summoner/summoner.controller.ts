import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SummonerService } from './summoner.service';

@Controller('summoners')
export class SummonerController {
  constructor(private readonly pollService: SummonerService) {}

  @Post()
  createSpecifiedSummoner(
    @Body()
    { region, apiKey }: { region: string; apiKey: string },
  ) {
    return this.pollService.createSpecifiedSummoner(region, apiKey);
  }

  @Get()
  getAllSummoners() {
    return this.pollService.getAllSummoners();
  }

  @Get(':summonerName/:region')
  async getLeaderboard(
    @Param('summonerName') summonerName: string,
    @Param('region') region: string,
  ) {
    // Perform any necessary validation or formatting of the summonerName and region

    // Call the appropriate method in the SummonerService
    return this.pollService.getLeaderboard(summonerName, region);
  }
}

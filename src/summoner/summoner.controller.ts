import { Controller, Get, Post, Body } from '@nestjs/common';
import { SummonerService } from './summoner.service';

@Controller('summoners')
export class SummonerController {
    constructor(private readonly pollService: SummonerService) {}

    @Post()
    createPoll(@Body() { question, options }: { question: string; options: string[] }) {
        return this.pollService.createPoll(question, options);
    }

    @Get()
    getAllPolls() {
        return this.pollService.getAllPolls();
    }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Summoner } from './summoner.entity';

@Injectable()
export class SummonerService {
    constructor(
        @InjectRepository(Summoner)
        private readonly pollRepository: Repository<Summoner>,
    ) {}

    async createPoll(question: string, options: string[]): Promise<Summoner> {
        const poll = this.pollRepository.create({ question, options });
        return this.pollRepository.save(poll);
    }

    async getAllPolls(): Promise<Summoner[]> {
        return this.pollRepository.find();
    }
}
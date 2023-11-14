import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(['summonerId'])
export class Summoner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    summonerId: string;

    @Column({ nullable: true })
    summonerName: string;

    @Column({ nullable: true })
    leaguePoints: number;

    @Column({ nullable: true })
    rank: string;

    @Column({ nullable: true })
    wins: number;

    @Column({ nullable: true })
    losses: number;

    @Column({ nullable: true })
    veteran: boolean;

    @Column({ nullable: true })
    inactive: boolean;

    @Column({ nullable: true })
    freshBlood: boolean;

    @Column({ nullable: true })
    hotStreak: boolean;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Summoner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column('jsonb', { nullable: true })
    options: string[];
}
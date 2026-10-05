import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateActivityLogDto {
    @IsNotEmpty()
    userId!: number;

    @IsNotEmpty()
    routineId!: number;

    @IsDate()
    startedAt!: Date;

    @IsDate()
    completedAt!: Date;

    @IsDate()
    createdAt!: Date;
}

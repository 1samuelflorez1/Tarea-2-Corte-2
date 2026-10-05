import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateRoutineDto {
    @IsNumber()
    UserId!: number;

    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsDateString()
    createdAt!: Date;

    @IsDateString()
    updateAt!: Date;
}

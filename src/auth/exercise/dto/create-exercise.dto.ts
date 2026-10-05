import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateExerciseDto {
    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsString()
    type!: string;

    @IsNotEmpty()
    estimatedCalories!: number;

    @IsNotEmpty()
    estimatedDistanceKM!: number;

    @IsNotEmpty()
    estimatedDurartionMin!: number;

    @IsString()
    icon!: string;

    @IsDateString()
    createdAt!: Date;
}

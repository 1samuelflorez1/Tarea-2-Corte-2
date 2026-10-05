import { IsDate, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateRoutineExerciseDto {
    @IsNotEmpty()
    routineId!: number;

    @IsNotEmpty()
    exerciseId!: number;

    @IsNotEmpty()
    orderIndex!: number;

    @IsNotEmpty()
    targetSets!: number;

    @IsNotEmpty()
    targetweightKg!: number;

    @IsNotEmpty()
    targetDurationMin!: number;

    @IsDateString()
    createdAt!: Date;
}

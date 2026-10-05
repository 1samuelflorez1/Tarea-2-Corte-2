import { IsNotEmpty } from 'class-validator';

export class CreateActivityExerciseDto {
    @IsNotEmpty()
    activityLogId!: number;

    @IsNotEmpty()
    routineExerciseId!: number;

    @IsNotEmpty()
    actualSets!: number;

    @IsNotEmpty()
    actualReps!: number;

    @IsNotEmpty()
    actualWeightKg!: number;

    @IsNotEmpty()
    actualDurationMin!: number;

    @IsNotEmpty()
    caloriesBurned!: number;

    @IsNotEmpty()
    distanceCoveredKm!: number;
}

export class CreateExerciseDto {
    name: string;
    description?: string;
    type?: string;
    estimatedCalories?: number;
    estimatedDistanceKm?: number;
    estimatedDurationMin?: number;
    icon?: string;
}

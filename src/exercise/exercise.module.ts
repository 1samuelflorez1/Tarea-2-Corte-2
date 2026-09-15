import { Module } from '@nestjs/common';

import { ExerciseSubModule } from './exercise/exercise.module';
import { RoutinesModule } from './routines/routines.module';

@Module({
    imports: [ExerciseSubModule, RoutinesModule],
})
export class MainExerciseModule {}

import { Module } from '@nestjs/common';
import { RoutineExerciseService } from './routine_exercise.service';
import { RoutineExerciseController } from './routine_exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutinesExercice } from '../entities/routineExercise.entity';
import { RoutineModule } from '../routine/routine.module';
import { ExerciseModule } from '../exercise/exercise.module';

@Module({
    controllers: [RoutineExerciseController],
    providers: [RoutineExerciseService],
    imports: [TypeOrmModule.forFeature([RoutinesExercice]), RoutineModule, ExerciseModule],
    exports: [RoutineExerciseService],
})
export class RoutineExerciseModule {}

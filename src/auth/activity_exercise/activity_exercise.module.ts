import { Module } from '@nestjs/common';
import { ActivityExerciseService } from './activity_exercise.service';
import { ActivityExerciseController } from './activity_exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityExercise } from '../entities/activityExercise.entity';
import { ActivityLogModule } from '../activity_log/activity_log.module';
import { RoutineExerciseModule } from '../routine_exercise/routine_exercise.module';

@Module({
    controllers: [ActivityExerciseController],
    providers: [ActivityExerciseService],
    imports: [TypeOrmModule.forFeature([ActivityExercise]), ActivityLogModule, RoutineExerciseModule],
    exports: [ActivityExerciseService],
})
export class ActivityExerciseModule {}

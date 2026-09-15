import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExerciseEntity } from '../entities/exercise.entity';
import { ExerciseSubService } from './exercise.service';
import { ExerciseSubController } from './exercise.controller';

@Module({
    controllers: [ExerciseSubController],
    providers: [ExerciseSubService],
    imports: [TypeOrmModule.forFeature([ExerciseEntity])],
    exports: [ExerciseSubService],
})
export class ExerciseSubModule {}

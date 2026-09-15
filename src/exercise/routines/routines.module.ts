import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoutineEntity } from '../entities/routine.entity';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';

@Module({
    controllers: [RoutinesController],
    providers: [RoutinesService],
    imports: [TypeOrmModule.forFeature([RoutineEntity])],
    exports: [RoutinesService],
})
export class RoutinesModule {}

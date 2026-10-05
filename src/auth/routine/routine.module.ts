import { Module } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { RoutineController } from './routine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from '../entities/routine.entity';
import { UserModule } from '../user/user.module';

@Module({
    controllers: [RoutineController],
    providers: [RoutineService],
    imports: [TypeOrmModule.forFeature([Routine]), UserModule],
    exports: [RoutineService],
})
export class RoutineModule {}

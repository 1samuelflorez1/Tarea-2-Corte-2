import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity_log.service';
import { ActivityLogController } from './activity_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from '../entities/activityLog.entity';
import { UserModule } from '../user/user.module';
import { RoutineModule } from '../routine/routine.module';

@Module({
    controllers: [ActivityLogController],
    providers: [ActivityLogService],
    imports: [TypeOrmModule.forFeature([ActivityLog]), UserModule, RoutineModule],
    exports: [ActivityLogService],
})
export class ActivityLogModule {}

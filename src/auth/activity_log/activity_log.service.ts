import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityLogDto } from './dto/create-activity_log.dto';
import { UpdateActivityLogDto } from './dto/update-activity_log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLog } from '../entities/activityLog.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RoutineService } from '../routine/routine.service';

@Injectable()
export class ActivityLogService {
    constructor(
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        private readonly userService: UserService,
        private readonly routineService: RoutineService,
    ) {}

    async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
        const { userId, routineId, ...activityLogData } = createActivityLogDto;

        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        const routine = await this.routineService.findOne(routineId);
        if (!routine) {
            throw new NotFoundException(`Routine with id ${routineId} not found`);
        }

        const newActivityLog = this.activityLogRepository.create({
            ...activityLogData,
            user: user,
            routine: routine,
        });

        return await this.activityLogRepository.save(newActivityLog);
    }

    async findAll(): Promise<ActivityLog[]> {
        return await this.activityLogRepository.find();
    }

    async findOne(id: number): Promise<ActivityLog | null> {
        return await this.activityLogRepository.findOneBy({ id });
    }

    async update(id: number, updateActivityLogDto: UpdateActivityLogDto): Promise<ActivityLog> {
        const activityLog = await this.activityLogRepository.findOneBy({ id });
        if (!activityLog) {
            throw new NotFoundException(`ActivityLog with id ${id} not found`);
        }

        if (updateActivityLogDto.userId) {
            const user = await this.userService.findOne(updateActivityLogDto.userId);
            if (!user) {
                throw new NotFoundException(`User with id ${updateActivityLogDto.userId} not found`);
            }
        }

        if (updateActivityLogDto.routineId) {
            const routine = await this.routineService.findOne(updateActivityLogDto.routineId);
            if (!routine) {
                throw new NotFoundException(`Routine with id ${updateActivityLogDto.routineId} not found`);
            }
        }

        const updatedActivityLog = this.activityLogRepository.merge(activityLog, updateActivityLogDto);
        return await this.activityLogRepository.save(updatedActivityLog);
    }

    async remove(id: number): Promise<void> {
        const result = await this.activityLogRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`No fue posible eliminar el registro de actividad con ID ${id}`);
        }
    }
}

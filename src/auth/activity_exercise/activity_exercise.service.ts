import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityExerciseDto } from './dto/create-activity_exercise.dto';
import { UpdateActivityExerciseDto } from './dto/update-activity_exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityExercise } from '../entities/activityExercise.entity';
import { Repository } from 'typeorm';
import { ActivityLogService } from '../activity_log/activity_log.service';
import { RoutineExerciseService } from '../routine_exercise/routine_exercise.service';

@Injectable()
export class ActivityExerciseService {
    constructor(
        @InjectRepository(ActivityExercise)
        private readonly activityExerciseRepository: Repository<ActivityExercise>,
        private readonly activityLogService: ActivityLogService,
        private readonly routineExerciseService: RoutineExerciseService,
    ) {}

    async create(createActivityExerciseDto: CreateActivityExerciseDto): Promise<ActivityExercise> {
        const { activityLogId, routineExerciseId, ...activityExerciseData } = createActivityExerciseDto;

        const activityLog = await this.activityLogService.findOne(activityLogId);
        if (!activityLog) {
            throw new NotFoundException(`ActivityLog with id ${activityLogId} not found`);
        }

        const routineExercise = await this.routineExerciseService.findOne(routineExerciseId);
        if (!routineExercise) {
            throw new NotFoundException(`RoutineExercise with id ${routineExerciseId} not found`);
        }

        const newActivityExercise = this.activityExerciseRepository.create({
            ...activityExerciseData,
            activityLog: activityLog,
            routineExercise: routineExercise,
        });

        return await this.activityExerciseRepository.save(newActivityExercise);
    }

    async findAll(): Promise<ActivityExercise[]> {
        return await this.activityExerciseRepository.find();
    }

    async findOne(id: number): Promise<ActivityExercise | null> {
        return await this.activityExerciseRepository.findOneBy({ id });
    }

    async update(id: number, updateActivityExerciseDto: UpdateActivityExerciseDto): Promise<ActivityExercise> {
        const activityExercise = await this.activityExerciseRepository.findOneBy({ id });
        if (!activityExercise) {
            throw new NotFoundException(`ActivityExercise with id ${id} not found`);
        }

        if (updateActivityExerciseDto.activityLogId) {
            const activityLog = await this.activityLogService.findOne(updateActivityExerciseDto.activityLogId);
            if (!activityLog) {
                throw new NotFoundException(`ActivityLog with id ${updateActivityExerciseDto.activityLogId} not found`);
            }
        }

        if (updateActivityExerciseDto.routineExerciseId) {
            const routineExercise = await this.routineExerciseService.findOne(
                updateActivityExerciseDto.routineExerciseId,
            );
            if (!routineExercise) {
                throw new NotFoundException(
                    `RoutineExercise with id ${updateActivityExerciseDto.routineExerciseId} not found`,
                );
            }
        }

        const updatedActivityExercise = this.activityExerciseRepository.merge(
            activityExercise,
            updateActivityExerciseDto,
        );
        return await this.activityExerciseRepository.save(updatedActivityExercise);
    }

    async remove(id: number): Promise<void> {
        const result = await this.activityExerciseRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`No fue posible eliminar el ejercicio de actividad con ID ${id}`);
        }
    }
}

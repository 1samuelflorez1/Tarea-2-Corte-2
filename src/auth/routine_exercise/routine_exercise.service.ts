import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoutineExerciseDto } from './dto/create-routine_exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine_exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutinesExercice } from '../entities/routineExercise.entity';
import { Repository } from 'typeorm';
import { RoutineService } from '../routine/routine.service';
import { ExerciseService } from '../exercise/exercise.service';

@Injectable()
export class RoutineExerciseService {
    constructor(
        @InjectRepository(RoutinesExercice)
        private readonly routineExerciseRepository: Repository<RoutinesExercice>,
        private readonly routineService: RoutineService,
        private readonly exerciseService: ExerciseService,
    ) {}

    async create(createRoutineExerciseDto: CreateRoutineExerciseDto): Promise<RoutinesExercice> {
        const { routineId, exerciseId, ...routineExerciseData } = createRoutineExerciseDto;

        const routine = await this.routineService.findOne(routineId);
        if (!routine) {
            throw new NotFoundException(`Routine with id ${routineId} not found`);
        }

        const exercise = await this.exerciseService.findOne(exerciseId);
        if (!exercise) {
            throw new NotFoundException(`Exercise with id ${exerciseId} not found`);
        }

        const routineExercise = this.routineExerciseRepository.create({
            ...routineExerciseData,
            RoutineExerciseLink: routine,
            RoutineExerciseLink2: exercise,
        });

        return await this.routineExerciseRepository.save(routineExercise);
    }

    async findAll(): Promise<RoutinesExercice[]> {
        return await this.routineExerciseRepository.find();
    }

    async findOne(id: number): Promise<RoutinesExercice | null> {
        return await this.routineExerciseRepository.findOneBy({ id });
    }

    async update(id: number, updateRoutineExerciseDto: UpdateRoutineExerciseDto): Promise<RoutinesExercice> {
        const routineExercise = await this.routineExerciseRepository.findOneBy({ id });
        if (!routineExercise) {
            throw new NotFoundException(`RoutineExercise with id ${id} not found`);
        }

        if (updateRoutineExerciseDto.routineId) {
            const routine = await this.routineService.findOne(updateRoutineExerciseDto.routineId);
            if (!routine) {
                throw new NotFoundException(`Routine with id ${updateRoutineExerciseDto.routineId} not found`);
            }
        }

        if (updateRoutineExerciseDto.exerciseId) {
            const exercise = await this.exerciseService.findOne(updateRoutineExerciseDto.exerciseId);
            if (!exercise) {
                throw new NotFoundException(`Exercise with id ${updateRoutineExerciseDto.exerciseId} not found`);
            }
        }

        const updatedRoutineExercise = this.routineExerciseRepository.merge(routineExercise, updateRoutineExerciseDto);
        return await this.routineExerciseRepository.save(updatedRoutineExercise);
    }

    async remove(id: number): Promise<void> {
        const result = await this.routineExerciseRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`No fue posible eliminar la rutina ejercicio con ID ${id}`);
        }
    }
}

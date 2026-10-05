import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from '../entities/exercise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciseService {
    constructor(
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ) {}

    async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
        const newExercise = this.exerciseRepository.create(createExerciseDto);
        return await this.exerciseRepository.save(newExercise);
    }

    async findAll() {
        return await this.exerciseRepository.find();
    }

    async findOne(id: number): Promise<Exercise | null> {
        return await this.exerciseRepository.findOneBy({ id });
    }

    async update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
        const exercise = await this.exerciseRepository.findOneBy({ id });
        if (!exercise) {
            throw new NotFoundException(`Exercise with id ${id} not found`);
        }

        const updatedExercise = this.exerciseRepository.merge(exercise, updateExerciseDto);
        return await this.exerciseRepository.save(updatedExercise);
    }

    async remove(id: number): Promise<void> {
        const result = await this.exerciseRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`No fue posible eliminar el ejercicio con ID ${id}`);
        }
    }
}

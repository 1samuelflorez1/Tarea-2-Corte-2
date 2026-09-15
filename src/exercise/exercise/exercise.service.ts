import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExerciseEntity } from '../entities/exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExerciseSubService {
    constructor(
        @InjectRepository(ExerciseEntity)
        private readonly exerciseRepository: Repository<ExerciseEntity>,
    ) {}

    async create(createExerciseDto: CreateExerciseDto) {
        const exercise = this.exerciseRepository.create(createExerciseDto);
        return await this.exerciseRepository.save(exercise);
    }

    async findAll() {
        return await this.exerciseRepository.find();
    }

    async findOne(id: number) {
        return await this.exerciseRepository.findOneBy({ id });
    }
}

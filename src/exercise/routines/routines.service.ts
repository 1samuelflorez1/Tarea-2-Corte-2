import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoutineEntity } from '../entities/routine.entity';
import { CreateRoutineDto } from './dto/create-routine.dto';

@Injectable()
export class RoutinesService {
    constructor(
        @InjectRepository(RoutineEntity)
        private readonly routineRepository: Repository<RoutineEntity>,
    ) {}

    async create(createRoutineDto: CreateRoutineDto) {
        const routine = this.routineRepository.create(createRoutineDto);
        return await this.routineRepository.save(routine);
    }

    async findAll() {
        return await this.routineRepository.find();
    }

    async findOne(id: number) {
        return await this.routineRepository.findOneBy({ id });
    }
}

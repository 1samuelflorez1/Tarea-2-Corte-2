import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from '../entities/routine.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class RoutineService {
    constructor(
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
        private readonly userService: UserService,
    ) {}

    async create(createRoutineDto: CreateRoutineDto): Promise<Routine> {
        const { UserId, ...routineData } = createRoutineDto;

        const user = await this.userService.findOne(UserId);
        if (!user) {
            throw new NotFoundException(`User with id ${UserId} not found`);
        }

        const newRoutine = this.routineRepository.create({
            ...routineData,
            RoutineLink: user,
        });

        return await this.routineRepository.save(newRoutine);
    }

    async findAll(): Promise<Routine[]> {
        return await this.routineRepository.find();
    }

    async findOne(id: number): Promise<Routine | null> {
        return await this.routineRepository.findOneBy({ id });
    }

    async update(id: number, updateRoutineDto: UpdateRoutineDto): Promise<Routine> {
        const routine = await this.routineRepository.findOneBy({ id });
        if (!routine) {
            throw new NotFoundException(`Routine with id ${id} not found`);
        }

        const { UserId, ...routineData } = updateRoutineDto;

        if (UserId) {
            const user = await this.userService.findOne(UserId);
            if (!user) {
                throw new NotFoundException(`User with id ${UserId} not found`);
            }
        }

        const updatedRoutine = this.routineRepository.merge(routine, {
            ...routineData,
            ...(UserId && { userId: UserId }),
        });
        return await this.routineRepository.save(updatedRoutine);
    }

    async remove(id: number): Promise<void> {
        const result = await this.routineRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`No fue posible eliminar la rutina con ID ${id}`);
        }
    }
}

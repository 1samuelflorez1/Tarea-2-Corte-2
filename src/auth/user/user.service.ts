import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RoleService } from '../role/role.service';
import { User } from '../entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RoleService,
    ) {}
    async create(createUserDto: CreateUserDto) {
        // Saber si el rol existe
        const role = await this.roleService.findOne(createUserDto.roleId);
        if (!role) {
            throw new NotFoundException('El rol no existe :)');
        }
        // Si sí existe, crearemos el usuario.
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}

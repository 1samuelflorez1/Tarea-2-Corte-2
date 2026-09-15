import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from '../entities/role.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async create(createRoleDto: CreateRoleDto) {
        // Validar información
        console.log('hOLA QUE ESTA PASANDO', createRoleDto);
        if (createRoleDto.nombre.length < 10) {
            return null;
        }

        // Transformamos de dto a entity
        const newRole = this.roleRepository.create({
            name: createRoleDto.nombre,
            description: createRoleDto.descripcion,
        });
        // Guardar la informacion en la base de datos
        const result = await this.roleRepository.save(newRole);
        return result;
    }

    async findAll() {
        return this.roleRepository.find();
    }

    findOne(id: number) {
        return this.roleRepository.findOneBy({ id });
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return `This action updates a #${id} role`;
    }

    async remove(id: number) {
        return await this.roleRepository.delete(id);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Permission } from '../../entities/permission.entity';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {}

    async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        const permission = this.permissionRepository.create(createPermissionDto);
        return await this.permissionRepository.save(permission);
    }

    async findAll(): Promise<Permission[]> {
        return await this.permissionRepository.find();
    }

    async findOne(id: number): Promise<Permission> {
        const permission = await this.permissionRepository.findOneBy({ id });
        if (!permission) {
            throw new NotFoundException(`Permiso con id ${id} no encontrado`);
        }
        return permission;
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
        const permission = await this.findOne(id);
        const updatedPermission = this.permissionRepository.merge(permission, updatePermissionDto);
        return await this.permissionRepository.save(updatedPermission);
    }

    async remove(id: number): Promise<{ id: number }> {
        const permission = await this.findOne(id);
        await this.permissionRepository.remove(permission);
        return { id };
    }
}

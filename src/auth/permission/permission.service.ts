import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {}

    async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        const newPermission = this.permissionRepository.create(createPermissionDto);
        return await this.permissionRepository.save(newPermission);
    }

    async findAll() {
        return await this.permissionRepository.find();
    }

    async findOne(id: number): Promise<Permission | null> {
        return await this.permissionRepository.findOneBy({ id });
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
        const permission = await this.permissionRepository.findOneBy({ id });
        if (!permission) {
            throw new NotFoundException(`Permission with id ${id} not found`);
        }

        const updatedPermission = this.permissionRepository.merge(permission, updatePermissionDto);
        return await this.permissionRepository.save(updatedPermission);
    }

    async remove(id: number): Promise<void> {
        const result = await this.permissionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`No fue posible eliminar el permiso con ID ${id}`);
        }
    }
}

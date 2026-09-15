import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RolePermission } from '../entities/role-permission.entity';
import { RoleService } from '../role/role.service';
import { PermissionService } from '../permission/permission.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: Repository<RolePermission>,
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService,
    ) {}

    async create(createRolePermissionDto: CreateRolePermissionDto) {
        const role = await this.roleService.findOne(createRolePermissionDto.roleId);
        if (!role) {
            throw new NotFoundException('El rol no existe');
        }

        const permission = await this.permissionService.findOne(createRolePermissionDto.permissionId);
        if (!permission) {
            throw new NotFoundException('El permiso no existe');
        }

        const rolePermission = this.rolePermissionRepository.create(createRolePermissionDto);
        return await this.rolePermissionRepository.save(rolePermission);
    }

    async findAll() {
        return await this.rolePermissionRepository.find();
    }

    async findOne(id: number) {
        return await this.rolePermissionRepository.findOneBy({ id });
    }

    async remove(id: number) {
        return await this.rolePermissionRepository.delete(id);
    }
}

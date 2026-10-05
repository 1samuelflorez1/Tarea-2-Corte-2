import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-role_permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from '../entities/role-permission.entity';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class RolePermissionService {
    constructor(
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: Repository<RolePermission>,
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService,
    ) {}

    async create(createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermission> {
        const { role: roleId, permission: permissionId } = createRolePermissionDto;

        const role = await this.roleService.findOne(roleId);
        if (!role) {
            throw new NotFoundException(`Role with id ${roleId} not found`);
        }

        const permission = await this.permissionService.findOne(permissionId);
        if (!permission) {
            throw new NotFoundException(`Permission with id ${permissionId} not found`);
        }

        const newRolePermission = this.rolePermissionRepository.create({
            role: role,
            permission: permission,
        });

        return await this.rolePermissionRepository.save(newRolePermission);
    }

    async findAll(): Promise<RolePermission[]> {
        return await this.rolePermissionRepository.find();
    }

    async findOne(id: number): Promise<RolePermission | null> {
        return await this.rolePermissionRepository.findOneBy({ id });
    }

    async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto): Promise<RolePermission> {
        const rolePermission = await this.rolePermissionRepository.findOneBy({ id });
        if (!rolePermission) {
            throw new NotFoundException(`RolePermission with id ${id} not found`);
        }

        const { role: roleId, permission: permissionId, ...otherData } = updateRolePermissionDto;

        if (roleId) {
            const role = await this.roleService.findOne(roleId);
            if (!role) {
                throw new NotFoundException(`Role with id ${roleId} not found`);
            }
        }

        if (permissionId) {
            const permission = await this.permissionService.findOne(permissionId);
            if (!permission) {
                throw new NotFoundException(`Permission with id ${permissionId} not found`);
            }
        }

        const updatedRolePermission = this.rolePermissionRepository.merge(rolePermission, {
            ...otherData,
            ...(roleId && { roleId }),
            ...(permissionId && { permissionId }),
        });

        return await this.rolePermissionRepository.save(updatedRolePermission);
    }

    async remove(id: number): Promise<void> {
        const result = await this.rolePermissionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`No fue posible eliminar el rol permiso con ID ${id}`);
        }
    }
}

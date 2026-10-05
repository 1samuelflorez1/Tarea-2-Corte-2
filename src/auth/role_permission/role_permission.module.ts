import { Module } from '@nestjs/common';
import { RolePermissionService } from './role_permission.service';
import { RolePermissionController } from './role_permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from '../entities/role-permission.entity';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
    controllers: [RolePermissionController],
    providers: [RolePermissionService],
    imports: [TypeOrmModule.forFeature([RolePermission]), RoleModule, PermissionModule],
    exports: [RolePermissionService],
})
export class RolePermissionModule {}

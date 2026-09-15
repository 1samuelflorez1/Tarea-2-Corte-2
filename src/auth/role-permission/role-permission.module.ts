import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePermission } from '../entities/role-permission.entity';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';

import { RolePermissionService } from './role-permission.service';
import { RolePermissionController } from './role-permission.controller';

@Module({
    controllers: [RolePermissionController],
    providers: [RolePermissionService],
    imports: [
        TypeOrmModule.forFeature([RolePermission]),
        RoleModule,
        PermissionModule,
    ],
    exports: [RolePermissionService],
})
export class RolePermissionModule {}

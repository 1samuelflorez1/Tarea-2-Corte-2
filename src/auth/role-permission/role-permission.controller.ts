import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { RolePermissionService } from './role-permission.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';

@Controller('role-permission')
export class RolePermissionController {
    constructor(private readonly rolePermissionService: RolePermissionService) {}

    @Post()
    create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
        return this.rolePermissionService.create(createRolePermissionDto);
    }

    @Get()
    findAll() {
        return this.rolePermissionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rolePermissionService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.rolePermissionService.remove(+id);
    }
}

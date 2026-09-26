import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Get()
    findAll(@Query('search') search?: string) {
        if (search) {
            return this.roleService.searchByName(search);
        }
        return this.roleService.findAll();
    }

    @Get('with-users')
    findAllWithUsers() {
        return this.roleService.findAllWithUsers();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.findOne(id);
    }

    @Get(':id/permissions')
    findOneWithPermissions(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.findOneWithPermissions(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(id, updateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.remove(id);
    }
}

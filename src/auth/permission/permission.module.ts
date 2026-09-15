import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Permission } from '../entities/permission.entity';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Module({
    controllers: [PermissionController],
    providers: [PermissionService],
    imports: [TypeOrmModule.forFeature([Permission])],
    exports: [PermissionService],
})
export class PermissionModule {}

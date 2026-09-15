import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role-permission/role-permission.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [UserModule, RoleModule, PermissionModule, RolePermissionModule],
})
export class AuthModule {}

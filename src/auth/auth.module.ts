import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ActivityExerciseModule } from './activity_exercise/activity_exercise.module';
import { RoutineExerciseModule } from './routine_exercise/routine_exercise.module';
import { RoutineModule } from './routine/routine.module';
import { RolePermissionModule } from './role_permission/role_permission.module';
import { PermissionModule } from './permission/permission.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ActivityLogModule } from './activity_log/activity_log.module';

@Module({
    imports: [
        UserModule,
        RoleModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET') || 'defaultSecret',
                signOptions: {
                    expiresIn: config.get<StringValue | number>('JWT_EXPIRES_IN') || '1h',
                },
            }),
        }),
        ActivityExerciseModule,
        ActivityLogModule,
        ExerciseModule,
        PermissionModule,
        RolePermissionModule,
        RoutineModule,
        RoutineExerciseModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}

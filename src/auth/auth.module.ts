import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UserModule,
        RoleModule,
        // Generar el token, con una firma, fecha de expiración
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<StringValue | number>('EXPIRES_IN') ?? '1h',
                },
            }),
        }),
    ],
    exports: [],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginInputDto } from './dto/login-input.dto';
import { UserService } from './user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    async login(loginInputDto: LoginInputDto) {
        // Validar el correo (encontrar al usuario por su correo)
        // Si el usuario no existe, o la contraseña es incorrecta, debería de fallar
        const user = await this.userService.findByEmail(loginInputDto.email);

        if (!user) {
            throw new NotFoundException('El usuario no existe, wa wa');
        }
        // Comparar las contraseñas ingresada, guardada
        const isMatch = await bcrypt.compare(loginInputDto.password, user.passwordHash);
        if (!isMatch) {
            throw new UnauthorizedException('Credenciales invalidas');
        }

        // ["read", "create", "update"]
        const permissions = user.role?.rolePermissions?.map((rp) => rp.permission.name) ?? [];

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            permission: permissions,
        };

        return this.jwtService.sign(payload);
    }
}

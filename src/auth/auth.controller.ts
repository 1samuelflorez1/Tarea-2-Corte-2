import { Body, Controller, Post } from '@nestjs/common';

import { LoginInputDto } from './dto/login-input.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body() loginInput: LoginInputDto) {
        // Llamar al servicio y pasarle la informacion del usuario
        return this.authService.login(loginInput);
    }
}

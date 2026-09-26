import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
    @IsEmail({}, { message: 'El correo electr�nico suministrado no es v�lido' })
    @IsNotEmpty({ message: 'El correo electr�nico es requerido' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'La contrase�a es requerida' })
    @MinLength(6, { message: 'La contrase�a debe tener al menos 6 caracteres' })
    password!: string;
}

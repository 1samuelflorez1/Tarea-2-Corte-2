import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
    @IsString({ message: 'El nombre del rol debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
    @MaxLength(50, { message: 'El nombre del rol no puede superar 50 caracteres' })
    name: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    @MaxLength(255, { message: 'La descripción no puede superar 255 caracteres' })
    description: string;
}

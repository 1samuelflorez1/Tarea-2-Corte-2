import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePermissionDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MaxLength(50, { message: 'El nombre no puede exceder 50 caracteres' })
    name: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    @MaxLength(255, { message: 'La descripción no puede exceder 255 caracteres' })
    description: string;
}

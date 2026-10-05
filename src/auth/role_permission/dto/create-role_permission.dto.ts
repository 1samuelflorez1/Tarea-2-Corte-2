import { IsNotEmpty } from 'class-validator';

export class CreateRolePermissionDto {
    @IsNotEmpty()
    role!: number;

    @IsNotEmpty()
    permission!: number;
}

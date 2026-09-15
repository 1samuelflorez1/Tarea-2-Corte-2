import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role_permissions')
export class RolePermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'role_id' })
    roleId: number;

    @Column({ name: 'permission_id' })
    permissionId: number;
}

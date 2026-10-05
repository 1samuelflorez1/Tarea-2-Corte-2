import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity({ name: 'role_permissions' }) // This decorator marks the class as a database entity and specifies the table name as 'role_permissions'
export class RolePermission {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'role_id' })
    roleId!: number;

    @ManyToOne(() => Role, (role) => role.rolePermissions, { onDelete: 'CASCADE', nullable: false, eager: false })
    @JoinColumn({ name: 'role_id' })
    role!: Role;

    @Column({ name: 'permission_id' })
    permissionId!: number;

    @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
        onDelete: 'CASCADE',
        nullable: false,
        eager: false,
    })
    @JoinColumn({ name: 'permission_id' })
    permission!: Permission;
}

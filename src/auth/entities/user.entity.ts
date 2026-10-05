import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from './role.entity';
import { Routine } from './routine.entity';
import { ActivityLog } from './activityLog.entity';

@Entity('users') // This decorator marks the class as a database entity and specifies the table name as 'users'
// DON'T CALL IT USER, IT'S A RESERVED WORD IN SQL
export class User {
    @PrimaryGeneratedColumn() // Primary key, auto-incremented
    id!: number;

    @Column({ unique: true, length: 50 }) // Unique username with a maximum length of 50 characters
    username!: string;

    @Column({ unique: true, length: 255 }) // Unique email address for each user
    email!: string;

    @Column({ length: 255, name: 'password_hash' }) // Hashed password for each user
    passwordHash!: string;

    @Column({ length: 255, nullable: true }) // Optional full name of the user
    bio!: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Automatically set the creation date of the user record to the current timestamp
    createdAt!: Date;

    // @Column({ name: 'role_id' })
    // roleId!: number;

    @ManyToOne(() => Role, (role) => role.users, { nullable: false })
    @JoinColumn({ name: 'role_id' })
    role!: Role;

    @OneToMany(() => Routine, (Routine) => Routine.RoutineLink)
    userId!: Routine[];

    @OneToMany(() => ActivityLog, (ActivityLog) => ActivityLog.userId)
    userId2!: ActivityLog[];
}

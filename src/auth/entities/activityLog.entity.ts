import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Routine } from './routine.entity';
import { Exercise } from './exercise.entity';
import { User } from './user.entity';
import { ActivityExercise } from './activityExercise.entity';

@Entity('activityLogs')
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id' })
    userId!: number;

    @ManyToOne(() => User, (User) => User.userId2, { nullable: false, eager: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ name: 'routine_id' })
    routineId!: number;

    @ManyToOne(() => Routine, (Routine) => Routine.routineId2, { nullable: false, eager: false })
    @JoinColumn({ name: 'routine_id' })
    routine!: Routine;

    @Column()
    startedAt!: Date;

    @Column()
    completedAt!: Date;

    @Column()
    createdAt!: Date;

    @OneToMany(() => ActivityExercise, (ActivityExercise) => ActivityExercise.activityLogId) // One-to-many relationship with User entity, meaning that a role can be assigned to many users, but each user can have only one role
    ActivityExercises!: ActivityExercise[];
}

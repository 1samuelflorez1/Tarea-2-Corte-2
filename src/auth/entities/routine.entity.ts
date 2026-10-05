import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Timestamp } from 'typeorm/driver/mongodb/bson.typings.js';
import { RoutinesExercice } from './routineExercise.entity';
import { ActivityLog } from './activityLog.entity';

@Entity('routines')
export class Routine {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id' })
    UserId!: number;

    @ManyToOne(() => User, (User) => User.userId, { nullable: false, eager: false })
    @JoinColumn({ name: 'user_id' })
    RoutineLink!: User;

    @Column({ length: 50 })
    name!: string;

    @Column({ length: 150 })
    description!: string;

    @Column()
    createdAt!: Date;

    @Column()
    updateAt!: Date;

    @OneToMany(() => RoutinesExercice, (RoutinesExercice) => RoutinesExercice.RoutineExerciseLink)
    routineId!: RoutinesExercice[];

    @OneToMany(() => ActivityLog, (ActivityLog) => ActivityLog.routineId)
    routineId2!: ActivityLog[];
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RolePermission } from './role-permission.entity';
import { Timestamp } from 'typeorm/driver/mongodb/bson.typings.js';
import { RoutinesExercice } from './routineExercise.entity';

@Entity('exercises')
export class Exercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true, length: 50 })
    name!: string;

    @Column({ length: 255 })
    description!: string;

    @Column()
    type!: string;

    @Column()
    estimatedCalories!: number;

    @Column()
    estimatedDistanceKM!: number;

    @Column()
    estimatedDurartionMin!: number;

    @Column()
    icon!: string;

    @Column()
    createdAt!: Date;

    @OneToMany(() => RoutinesExercice, (RoutinesExercice) => RoutinesExercice.RoutineExerciseLink2)
    exerciseId!: RoutinesExercice[];
}

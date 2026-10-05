import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RolePermission } from './role-permission.entity';
import { User } from './user.entity';
import { Routine } from './routine.entity';
import { Exercise } from './exercise.entity';
import { ActivityExercise } from './activityExercise.entity';

@Entity('routinesExercices')
export class RoutinesExercice {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'routine_id' })
    routineId!: number;

    @ManyToOne(() => Routine, (Routine) => Routine.routineId, { nullable: false, eager: false })
    @JoinColumn({ name: 'routine_id' })
    RoutineExerciseLink!: Routine;

    @Column({ name: 'exercise_id' })
    exerciseId!: number;

    @ManyToOne(() => Exercise, (Exercise) => Exercise.exerciseId, { nullable: false, eager: false })
    @JoinColumn({ name: 'exercise_id' })
    RoutineExerciseLink2!: Exercise;

    @Column()
    orderIndex!: number;

    @Column()
    targetSets!: number;

    @Column()
    targetweightKg!: number;

    @Column()
    targetDurationMin!: number;

    @Column()
    createdAt!: Date;

    @OneToMany(() => ActivityExercise, (ActivityExercise) => ActivityExercise.routineExerciseId)
    activityExerciseid2!: User[];
}

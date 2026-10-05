import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ActivityLog } from './activityLog.entity';
import { RoutinesExercice } from './routineExercise.entity';

@Entity('activitiesExercises')
export class ActivityExercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'activity_log_id' })
    activityLogId!: number;

    @ManyToOne(() => ActivityLog, (ActivityLog) => ActivityLog.ActivityExercises, { nullable: false, eager: false })
    @JoinColumn({ name: 'activity_log_id' })
    activityLog!: ActivityLog;

    @Column({ name: 'routines_exercice_id' })
    routineExerciseId!: number;

    @ManyToOne(() => RoutinesExercice, (RoutinesExercice) => RoutinesExercice.activityExerciseid2, {
        nullable: false,
        eager: false,
    })
    @JoinColumn({ name: 'routines_exercice_id' })
    routineExercise!: RoutinesExercice;

    @Column()
    actualSets!: number;

    @Column()
    actualReps!: number;

    @Column()
    actualWeightKg!: number;

    @Column()
    actualDurationMin!: number;

    @Column()
    caloriesBurned!: number;

    @Column()
    distanceCoveredKm!: number;
}

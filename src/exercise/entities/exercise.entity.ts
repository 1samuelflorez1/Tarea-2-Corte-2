import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exercises')
export class ExerciseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 255, nullable: true })
    description: string;

    @Column({ length: 50, nullable: true })
    type: string;

    @Column({ name: 'estimated_calories', type: 'decimal', precision: 5, scale: 2, nullable: true })
    estimatedCalories: number;

    @Column({ name: 'estimated_distance_km', type: 'decimal', precision: 5, scale: 2, nullable: true })
    estimatedDistanceKm: number;

    @Column({ name: 'estimated_duration_min', type: 'int', nullable: true })
    estimatedDurationMin: number;

    @Column({ length: 255, nullable: true })
    icon: string;
}

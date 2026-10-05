import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineExerciseDto } from './create-routine_exercise.dto';

export class UpdateRoutineExerciseDto extends PartialType(CreateRoutineExerciseDto) {}

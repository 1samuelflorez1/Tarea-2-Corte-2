import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityExerciseDto } from './create-activity_exercise.dto';

export class UpdateActivityExerciseDto extends PartialType(CreateActivityExerciseDto) {}

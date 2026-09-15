import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { ExerciseSubService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('exercise')
export class ExerciseSubController {
    constructor(private readonly exerciseSubService: ExerciseSubService) {}

    @Post()
    create(@Body() createExerciseDto: CreateExerciseDto) {
        return this.exerciseSubService.create(createExerciseDto);
    }

    @Get()
    findAll() {
        return this.exerciseSubService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.exerciseSubService.findOne(+id);
    }
}

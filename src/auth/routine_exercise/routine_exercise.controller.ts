import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutineExerciseService } from './routine_exercise.service';
import { CreateRoutineExerciseDto } from './dto/create-routine_exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine_exercise.dto';

@Controller('routine-exercise')
export class RoutineExerciseController {
    constructor(private readonly routineExerciseService: RoutineExerciseService) {}

    @Post()
    create(@Body() createRoutineExerciseDto: CreateRoutineExerciseDto) {
        return this.routineExerciseService.create(createRoutineExerciseDto);
    }

    @Get()
    findAll() {
        return this.routineExerciseService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.routineExerciseService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoutineExerciseDto: UpdateRoutineExerciseDto) {
        return this.routineExerciseService.update(+id, updateRoutineExerciseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.routineExerciseService.remove(+id);
    }
}

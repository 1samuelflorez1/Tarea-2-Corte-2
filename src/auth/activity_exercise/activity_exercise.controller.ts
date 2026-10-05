import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityExerciseService } from './activity_exercise.service';
import { CreateActivityExerciseDto } from './dto/create-activity_exercise.dto';
import { UpdateActivityExerciseDto } from './dto/update-activity_exercise.dto';

@Controller('activity-exercise')
export class ActivityExerciseController {
    constructor(private readonly activityExerciseService: ActivityExerciseService) {}

    @Post()
    create(@Body() createActivityExerciseDto: CreateActivityExerciseDto) {
        return this.activityExerciseService.create(createActivityExerciseDto);
    }

    @Get()
    findAll() {
        return this.activityExerciseService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.activityExerciseService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateActivityExerciseDto: UpdateActivityExerciseDto) {
        return this.activityExerciseService.update(+id, updateActivityExerciseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activityExerciseService.remove(+id);
    }
}

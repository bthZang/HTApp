import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtStudentAuthGuard } from '../auth/guards/jwt-student-auth.guard';
import { AuthenticatedStudentRequest } from '../auth/types/authenticated-student-request.type';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { JoinLessonDto } from './dto/join-lesson.dto';
import { CreateOffClassDto } from './dto/update-lesson-create-offclass.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Post(':id/join')
  @UseGuards(JwtStudentAuthGuard)
  joinLesson(
    @Param('id') lessonId: string,
    @Body() options: JoinLessonDto,
    @Request() request: AuthenticatedStudentRequest,
  ) {
    console.log(request, request.user);
    return this.lessonService.joinLesson(
      request.user,
      lessonId,
      options.isJoinOff,
    );
  }

  @Post(':id/leave')
  @UseGuards(JwtStudentAuthGuard)
  leaveLesson(
    @Param('id') lessonId: string,
    @Request() request: AuthenticatedStudentRequest,
  ) {
    return this.lessonService.leaveLesson(request.user, lessonId);
  }

  @Get()
  findAll(@Query('q') keyword: string) {
    return this.lessonService.findAll(keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @Post('/:id/offclass')
  createOffClass(
    @Param('id') id: string,
    @Body() createOffClassDto: CreateOffClassDto,
  ) {
    return this.lessonService.createOffClass(id, createOffClassDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}

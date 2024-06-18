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
import { JwtInstructorAuthGuard } from '../auth/guards/jwt-instructor-auth.guard';
import { AuthenticatedInstructorRequest } from '../auth/types/authenticated-instructor-request.type';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @UseGuards(JwtInstructorAuthGuard)
  create(
    @Body() createLessonDto: CreateLessonDto,
    @Request() request: AuthenticatedInstructorRequest,
  ) {
    return this.lessonService.create({
      ...createLessonDto,
      instructorId: request.user.id,
    });
  }

  @Post(':id/join')
  @UseGuards(JwtStudentAuthGuard)
  joinLesson(
    @Param('id') lessonId: string,
    @Body() options: JoinLessonDto,
    @Request() request: AuthenticatedStudentRequest,
  ) {
    return this.lessonService.joinLesson(
      request.user,
      lessonId,
      options.isJoinOff,
    );
  }

  @Post(':id/save')
  @UseGuards(JwtStudentAuthGuard)
  saveLesson(
    @Param('id') lessonId: string,
    @Request() request: AuthenticatedStudentRequest,
  ) {
    return this.lessonService.saveLesson(request.user, lessonId);
  }

  @Post(':id/leave')
  @UseGuards(JwtStudentAuthGuard)
  leaveLesson(
    @Param('id') lessonId: string,
    @Request() request: AuthenticatedStudentRequest,
  ) {
    return this.lessonService.leaveLesson(request.user, lessonId);
  }

  @Post(':id/unsave')
  @UseGuards(JwtStudentAuthGuard)
  unsaveLesson(
    @Param('id') lessonId: string,
    @Request() request: AuthenticatedStudentRequest,
  ) {
    return this.lessonService.unsaveLesson(request.user, lessonId);
  }

  @Get()
  findAll(@Query('q') keyword: string, @Query('category') category?: string) {
    return this.lessonService.findAll(keyword, category);
  }

  @Get('today')
  findToday() {
    return this.lessonService.findToday();
  }

  @Get('/date')
  @UseGuards(JwtStudentAuthGuard)
  findByDate(
    @Query('date') date: string,
    @Request() request: AuthenticatedStudentRequest,
  ) {
    return this.lessonService.findByDate(parseInt(date), request.user.id);
  }

  @Get('offline')
  @UseGuards(JwtInstructorAuthGuard)
  findOffline(@Request() request: AuthenticatedInstructorRequest) {
    return this.lessonService.findOffline(request.user.id);
  }

  @Get('own')
  @UseGuards(JwtStudentAuthGuard)
  findOwn(@Request() request: AuthenticatedStudentRequest) {
    return this.lessonService.findOwn(request.user.id);
  }

  @Get('saved')
  @UseGuards(JwtStudentAuthGuard)
  findSaved(@Request() request: AuthenticatedStudentRequest) {
    return this.lessonService.findSaved(request.user.id);
  }

  @Get(':id')
  @UseGuards(JwtStudentAuthGuard)
  findOne(
    @Param('id') id: string,
    @Request() request: AuthenticatedStudentRequest,
  ) {
    return this.lessonService.findOne(id, request.user.id);
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

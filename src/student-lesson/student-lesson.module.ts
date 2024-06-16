import { Module } from '@nestjs/common';
import { StudentLessonService } from './student-lesson.service';
import { StudentLessonController } from './student-lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentLesson } from './entities/studentLesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentLesson])],
  controllers: [StudentLessonController],
  providers: [StudentLessonService],
  exports: [StudentLessonService],
})
export class StudentLessonModule {}

import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { StudentLessonModule } from '../student-lesson/student-lesson.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), StudentLessonModule],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}

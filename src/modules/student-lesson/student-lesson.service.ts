import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from '../lesson/entities/lesson.entity';
import { Student } from '../student/entities/student.entity';
import { StudentLesson } from './entities/studentLesson.entity';

@Injectable()
export class StudentLessonService {
  constructor(
    @InjectRepository(StudentLesson)
    private readonly studentLessonRepo: Repository<StudentLesson>,
  ) {}

  async create(student: Student, lesson: Lesson, isJoinOff: boolean) {
    const studentLesson = await this.studentLessonRepo.findOneBy({
      student,
      lesson,
    });
    if (studentLesson) {
      await this.studentLessonRepo.remove(studentLesson);
    }

    return this.studentLessonRepo.save({
      student,
      lesson,
      isJoinOff,
    });
  }

  async remove(student: Student, lesson: Lesson) {
    const studentLesson = await this.studentLessonRepo.findOneBy({
      student,
      lesson,
    });
    return await this.studentLessonRepo.remove(studentLesson);
  }
}

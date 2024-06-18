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
      student: {
        id: student.id,
      },
      lesson: {
        id: lesson.id,
      },
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

  async remove(student: Student, lessonId: string) {
    const studentLesson = await this.studentLessonRepo.findOneBy({
      student: {
        id: student.id,
      },
      lesson: { id: lessonId },
    });
    return await this.studentLessonRepo.remove(studentLesson);
  }
}

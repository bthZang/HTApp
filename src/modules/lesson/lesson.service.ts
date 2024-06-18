import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, MoreThan, Repository } from 'typeorm';
import { StudentLessonService } from '../student-lesson/student-lesson.service';
import { Student } from '../student/entities/student.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateOffClassDto } from './dto/update-lesson-create-offclass.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
    private readonly studentLessonService: StudentLessonService,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    return await this.lessonRepo.save(createLessonDto);
  }

  async createOffClass(id: string, createOffClass: CreateOffClassDto) {
    const lesson = await this.lessonRepo.findOne({
      where: { id },
    });
    Object.assign(lesson, createOffClass);
    return await this.lessonRepo.save(lesson);
  }

  findAll(keyword: string) {
    return this.lessonRepo.find({
      where: { name: ILike(`%${keyword || ''}%`) },
      relations: { program: true, instructor: true },
      order: { createdAt: 'desc' },
    });
  }

  findByIds(ids: string[]) {
    return this.lessonRepo.findBy({
      id: In(ids),
    });
  }

  findToday() {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);

    return this.lessonRepo.find({
      where: {
        createdAt: MoreThan(today),
      },
      relations: { program: true },
    });
  }

  findOwn(studentId: string) {
    return this.lessonRepo.find({
      where: { studentLessons: { student: { id: studentId } } },
      relations: { program: true },
      order: { createdAt: 'desc' },
    });
  }

  findSaved(studentId: string) {
    return this.lessonRepo.find({
      where: { savedStudents: { id: studentId } },
      relations: { program: true },
    });
  }

  async findOne(id: string, studentId: string) {
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      relations: {
        program: true,
        comments: true,
        instructor: true,
        savedStudents: true,
        studentLessons: {
          student: true,
        },
      },
    });
    return {
      ...lesson,
      isSaved: lesson.savedStudents.some((student) => student.id === studentId),
      isJoined: lesson.studentLessons.some(
        (studentLesson) => studentLesson.student.id === studentId,
      ),
    };
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonRepo.findOne({
      where: { id },
    });
    Object.assign(lesson, updateLessonDto);
    return await this.lessonRepo.save(lesson);
  }

  remove(id: string) {
    return this.lessonRepo.softDelete({ id });
  }

  async joinLesson(student: Student, lessonId: string, isJoinOff: boolean) {
    const lesson = await this.lessonRepo.findOneBy({ id: lessonId });
    return this.studentLessonService.create(student, lesson, isJoinOff);
  }

  async leaveLesson(student: Student, lessonId: string) {
    return this.studentLessonService.remove(student, lessonId);
  }

  async saveLesson(student: Student, lessonId: string) {
    const lesson = await this.lessonRepo.findOne({
      where: { id: lessonId },
      relations: {
        savedStudents: true,
      },
    });
    lesson.savedStudents.push(student);
    return await this.lessonRepo.save(lesson);
  }

  async unsaveLesson(student: Student, lessonId: string) {
    const lesson = await this.lessonRepo.findOne({
      where: { id: lessonId },
      relations: {
        savedStudents: true,
      },
    });
    lesson.savedStudents = lesson.savedStudents.filter(
      (s) => s.id != student.id,
    );
    return await this.lessonRepo.save(lesson);
  }
}

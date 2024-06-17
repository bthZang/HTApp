import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateOffClassDto } from './dto/update-lesson-create-offclass.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
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
      relations: { program: true },
    });
  }

  findOne(id: string) {
    return this.lessonRepo.findOne({
      where: { id },
      relations: {
        program: true,
        comments: true,
        studentLessons: true,
      },
    });
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
}

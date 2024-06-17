import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { CreateOffClassDto } from './dto/update-lesson-create-offclass.dto';

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

  findAll() {
    return this.lessonRepo.find();
  }

  findOne(id: string) {
    return this.lessonRepo.findOneBy({ id });
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

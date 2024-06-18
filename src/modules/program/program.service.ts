import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';
import { LessonService } from '../lesson/lesson.service';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepo: Repository<Program>,
    private readonly lessonService: LessonService,
  ) {}

  async create(createProgramDto: CreateProgramDto, instructorId: string) {
    const lessons = await this.lessonService.findByIds(
      createProgramDto.lessonIds,
    );
    return await this.programRepo.save({
      ...createProgramDto,
      lessons,
      instructorId,
    });
  }

  findAll(keyword: string) {
    return this.programRepo.find({
      where: { name: ILike(`%${keyword || ''}%`) },
      relations: {
        instructor: true,
        lessons: true,
      },
    });
  }

  findOne(id: string) {
    return this.programRepo.findOne({
      where: { id },
      relations: {
        instructor: true,
        lessons: true,
      },
    });
  }

  async update(id: string, updateProgramDto: UpdateProgramDto) {
    const program = await this.programRepo.findOneBy({ id });
    Object.assign(program, updateProgramDto);
    return this.programRepo.save(program);
  }

  remove(id: string) {
    return this.programRepo.softDelete({ id });
  }
}

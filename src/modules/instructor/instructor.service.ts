import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { Instructor } from './entities/instructor.entity';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepo: Repository<Instructor>,
  ) {}

  async create(createInstructorDto: CreateInstructorDto) {
    const instructor = await this.instructorRepo.findOneBy({
      username: createInstructorDto.username,
    });
    if (instructor)
      throw new BadRequestException('Instructor with this username existed');
    return this.instructorRepo.save(createInstructorDto);
  }

  findAll(keyword: string) {
    return this.instructorRepo.find({
      where: { name: ILike(`%${keyword || ''}%`) },
      relations: {},
    });
  }

  findOne(id: string) {
    return this.instructorRepo.find({
      where: { id },
      relations: {},
    });
  }

  findByUsername(username: string) {
    return this.instructorRepo.findOneBy({ username });
  }

  async update(id: string, updateInstructorDto: UpdateInstructorDto) {
    const instructor = await this.instructorRepo.findOneBy({ id });
    Object.assign(instructor, updateInstructorDto);
    return this.instructorRepo.save(instructor);
  }

  remove(id: string) {
    return this.instructorRepo.softDelete({ id });
  }
}

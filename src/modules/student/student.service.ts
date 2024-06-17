import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    return this.studentRepo.save(createStudentDto);
  }

  findAll(keyword: string | null) {
    return this.studentRepo.find({
      where: { name: ILike(`%${keyword || ''}%`) },
      relations: {},
    });
  }

  findOne(id: string) {
    return this.studentRepo.findOne({
      where: { id },
      relations: {
        studentLessons: {
          lesson: true,
        },
      },
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepo.findOneBy({ id });
    Object.assign(student, updateStudentDto);
    return this.studentRepo.save(student);
  }

  remove(id: string) {
    return this.studentRepo.softDelete({ id });
  }
}

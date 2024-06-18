import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepo.save({
      content: createCommentDto.content,
      student: {
        id: createCommentDto.studentId,
      },
      lesson: { id: createCommentDto.lessonId },
    });
  }

  findByLessonId(id: string) {
    return this.commentRepo.find({
      where: {
        lesson: { id },
      },
      relations: { student: true },
      order: { createdAt: 'desc' },
    });
  }
}

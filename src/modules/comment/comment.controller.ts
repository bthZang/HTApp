import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtStudentAuthGuard } from '../auth/guards/jwt-student-auth.guard';
import { AuthenticatedStudentRequest } from '../auth/types/authenticated-student-request.type';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtStudentAuthGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Request() request: AuthenticatedStudentRequest,
  ) {
    return this.commentService.create({
      ...createCommentDto,
      studentId: request.user.id,
    });
  }
}

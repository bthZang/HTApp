import { Controller } from '@nestjs/common';
import { StudentLessonService } from './student-lesson.service';

@Controller('student-lesson')
export class StudentLessonController {
  constructor(private readonly studentLessonService: StudentLessonService) {}
}

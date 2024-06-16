import { CreateLessonDto } from "src/modules/lesson/dto/create-lesson.dto";

export class CreateProgramDto {
  name: string;
  level: string;
  category: string;
  introduce: string;
  goal: string;
  preparation: string;
}

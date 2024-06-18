export class CreateProgramDto {
  name: string;
  level: string;
  category: string;
  introduce: string;
  goal: string;
  preparation: string;
  image_link!: string;
  learn!: string;
  need!: string;
  lessonIds: string[];
}

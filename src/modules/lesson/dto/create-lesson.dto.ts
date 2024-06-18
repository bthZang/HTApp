export class CreateLessonDto {
  name!: string;
  description!: string;
  videoUrl!: string;
  imageUrl!: string;
  programId!: string;
  timeDuring!: number;
  instructorId: string;
}

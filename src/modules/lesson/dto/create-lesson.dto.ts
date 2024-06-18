export class CreateLessonDto {
  name!: string;
  description!: string;
  videoUrl!: string;
  imageUrl!: string;
  programId!: string;
  timeDuring!: number;
  instructorId: string;
  level!: string;
  category!: string;
  address!: string; //for off class
}

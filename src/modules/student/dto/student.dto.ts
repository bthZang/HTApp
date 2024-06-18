import { Student } from '../entities/student.entity';

export class StudentDto {
  id: string;
  name!: string;
  photoUrl!: string;
  googleId!: string;

  constructor(student: Student) {
    this.id = student.id;
    this.name = student.name;
    this.photoUrl = student.photoUrl;
    this.googleId = student.googleId;
  }
}

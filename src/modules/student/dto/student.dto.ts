import { Student } from '../entities/student.entity';

export class StudentDto {
  name!: string;
  photoUrl!: string;
  googleId!: string;

  constructor(student: Student) {
    this.name = student.name;
    this.photoUrl = student.photoUrl;
    this.googleId = student.googleId;
  }
}

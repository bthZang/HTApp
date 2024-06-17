import { Student } from 'src/modules/student/entities/student.entity';

export type AuthenticatedStudentRequest = {
  user: Student;
} & Request;

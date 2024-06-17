import { Instructor } from 'src/modules/instructor/entities/instructor.entity';

export type AuthenticatedInstructorRequest = {
  instructor: Instructor;
} & Request;

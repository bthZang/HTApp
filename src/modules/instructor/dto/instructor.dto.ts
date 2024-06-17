import { Instructor } from '../entities/instructor.entity';

export class InstructorDto {
  id: string;
  name!: string;
  username!: string;
  phone!: string;
  email!: string;
  password!: string;
  introduce!: string;

  constructor(instructor: Instructor) {
    this.id = instructor.id;
    this.name = instructor.name;
    this.username = instructor.username;
    this.phone = instructor.phone;
    this.email = instructor.email;
    this.password = instructor.password;
    this.introduce = instructor.introduce;
  }
}

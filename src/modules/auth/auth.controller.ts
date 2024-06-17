import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { InstructorService } from '../instructor/instructor.service';
import { StudentDto } from '../student/dto/student.dto';
import { StudentService } from '../student/student.service';
import { AuthService } from './auth.service';
import { InstructorAuthDto } from './dto/instructor-auth.dto';
import { StudentAuthDto } from './dto/student-auth.dto';
import { JwtStudentAuthGuard } from './guards/jwt-student-auth.guard';
import { AuthenticatedStudentRequest } from './types/authenticated-student-request.type';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly studentService: StudentService,
    private readonly instructorService: InstructorService,
  ) {}

  @Get('student/profile')
  @UseGuards(JwtStudentAuthGuard)
  profile(@Request() req: AuthenticatedStudentRequest) {
    const student = req.user;
    return student;
  }

  @Post('student/login')
  async login(@Body() authDto: StudentAuthDto) {
    const user = await this.studentService.findByGoogleId(authDto.googleId);

    if (user) {
      return this.authService.generateStudentToken(new StudentDto(user));
    } else {
      const newUser = await this.studentService.create(authDto);
      return this.authService.generateStudentToken(new StudentDto(newUser));
    }
  }

  @Post('instructor/login')
  async registerInstructor(@Body() authDto: InstructorAuthDto) {
    const instructor = await this.instructorService.findByUsername(
      authDto.username,
    );

    if (await bcrypt.compare(authDto.password, instructor.password)) {
      return this.authService.generateInstructorToken(instructor);
    } else {
      throw new ForbiddenException('Wrong password');
    }
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { StudentDto } from '../student/dto/student.dto';
import { StudentService } from '../student/student.service';
import { AuthService } from './auth.service';
import { StudentAuthDto } from './dto/auth.dto';
import { JwtStudentAuthGuard } from './guards/jwt-auth.guard';
import { AuthenticatedStudentRequest } from './types/authenticated-request.type';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly studentService: StudentService,
    private readonly authService: AuthService,
  ) {}

  @Get('student/profile')
  @UseGuards(JwtStudentAuthGuard)
  profile(@Request() req: AuthenticatedStudentRequest) {
    const student = req.student;
    return student;
  }

  @Post('student/login')
  async login(@Body() authDto: StudentAuthDto) {
    const user = await this.studentService.findByGoogleId(authDto.googleId);

    if (user) {
      return this.authService.generateToken(new StudentDto(user));
    } else {
      const newUser = await this.studentService.create(authDto);
      return this.authService.generateToken(new StudentDto(newUser));
    }
  }
}

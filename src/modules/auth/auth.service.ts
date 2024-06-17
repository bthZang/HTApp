import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { StudentDto } from '../student/dto/student.dto';
import { InstructorDto } from '../instructor/dto/instructor.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateStudentToken(studentDto: StudentDto) {
    const access_token = this.jwtService.sign(
      {
        ...studentDto,
        sub: studentDto.googleId,
      },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn:
          this.configService.get('ENVIRONMENT') === 'development'
            ? '100d'
            : '1h',
      },
    );

    return {
      access_token,
    };
  }

  generateInstructorToken(instructorDto: InstructorDto) {
    const access_token = this.jwtService.sign(
      {
        ...instructorDto,
        sub: instructorDto.id,
      },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn:
          this.configService.get('ENVIRONMENT') === 'development'
            ? '100d'
            : '1h',
      },
    );

    return {
      access_token,
    };
  }
}

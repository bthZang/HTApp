import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { InstructorModule } from '../instructor/instructor.module';
import { StudentModule } from '../student/student.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStudentStrategy } from './strategies/jwt-student.strategy';
import { JwtInstructorStrategy } from './strategies/jwt-instructor.strategy';

@Module({
  imports: [
    StudentModule,
    InstructorModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'),
      }),
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtInstructorStrategy, JwtStudentStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

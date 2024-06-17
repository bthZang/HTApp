import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StudentModule } from '../student/student.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStudentStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    StudentModule,
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
  providers: [AuthService, JwtStudentStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

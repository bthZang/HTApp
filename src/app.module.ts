import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramModule } from './modules/program/program.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { InstructorModule } from './modules/instructor/instructor.module';
import { StudentModule } from './modules/student/student.module';
import { CommentModule } from './modules/comment/comment.module';
import { StudentLessonModule } from './student-lesson/student-lesson.module';

@Module({
  imports: [
    ProgramModule,
    LessonModule,
    CommentModule,
    InstructorModule,
    StudentModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('MAIN_DB_HOST'),
        port: parseInt(configService.get<string>('MAIN_DB_PORT')),
        username: configService.get<string>('MAIN_DB_USERNAME'),
        password: configService.get<string>('MAIN_DB_PASSWORD'),
        database: configService.get<string>('MAIN_DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    StudentLessonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

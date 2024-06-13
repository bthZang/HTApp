import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramModule } from './program/program.module';
import { LessonModule } from './lesson/lesson.module';
import { OfflineClassModule } from './offline-class/offline-class.module';
import { CommentModule } from './comment/comment.module';
import { DescriptionModule } from './description/description.module';
import { InstructorModule } from './instructor/instructor.module';
import { StudentModule } from './student/student.module';
import { DiscussionModule } from './discussion/discussion.module';

@Module({
  imports: [ProgramModule, LessonModule, OfflineClassModule, CommentModule, DescriptionModule, InstructorModule, StudentModule, DiscussionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

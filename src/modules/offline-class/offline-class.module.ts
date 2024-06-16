import { Module } from '@nestjs/common';
import { OfflineClassService } from './offline-class.service';
import { OfflineClassController } from './offline-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfflineClass } from './entities/offline-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfflineClass])],
  controllers: [OfflineClassController],
  providers: [OfflineClassService],
  exports: [OfflineClassService],
})
export class OfflineClassModule {}

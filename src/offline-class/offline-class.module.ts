import { Module } from '@nestjs/common';
import { OfflineClassService } from './offline-class.service';
import { OfflineClassController } from './offline-class.controller';

@Module({
  controllers: [OfflineClassController],
  providers: [OfflineClassService],
})
export class OfflineClassModule {}

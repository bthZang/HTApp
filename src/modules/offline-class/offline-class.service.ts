import { Injectable } from '@nestjs/common';
import { CreateOfflineClassDto } from './dto/create-offline-class.dto';
import { UpdateOfflineClassDto } from './dto/update-offline-class.dto';

@Injectable()
export class OfflineClassService {
  create(createOfflineClassDto: CreateOfflineClassDto) {
    return 'This action adds a new offlineClass';
  }

  findAll() {
    return `This action returns all offlineClass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} offlineClass`;
  }

  update(id: number, updateOfflineClassDto: UpdateOfflineClassDto) {
    return `This action updates a #${id} offlineClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} offlineClass`;
  }
}

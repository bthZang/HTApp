import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OfflineClassService } from './offline-class.service';
import { CreateOfflineClassDto } from './dto/create-offline-class.dto';
import { UpdateOfflineClassDto } from './dto/update-offline-class.dto';

@Controller('offline-class')
export class OfflineClassController {
  constructor(private readonly offlineClassService: OfflineClassService) {}

  @Post()
  create(@Body() createOfflineClassDto: CreateOfflineClassDto) {
    return this.offlineClassService.create(createOfflineClassDto);
  }

  @Get()
  findAll() {
    return this.offlineClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offlineClassService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfflineClassDto: UpdateOfflineClassDto) {
    return this.offlineClassService.update(+id, updateOfflineClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offlineClassService.remove(+id);
  }
}

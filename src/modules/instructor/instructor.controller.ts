import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InstructorService } from './instructor.service';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post()
  create(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorService.create(createInstructorDto);
  }

  @Get()
  findAll(@Query('q') keyword: string) {
    return this.instructorService.findAll(keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    return this.instructorService.update(id, updateInstructorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructorService.remove(id);
  }
}

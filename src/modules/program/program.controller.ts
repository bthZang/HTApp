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
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { ProgramService } from './program.service';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programService.create(createProgramDto);
  }

  @Get()
  findAll(@Query('q') keyword: string) {
    return this.programService.findAll(keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programService.update(id, updateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programService.remove(id);
  }
}

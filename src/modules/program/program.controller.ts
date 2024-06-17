import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { ProgramService } from './program.service';
import { JwtInstructorAuthGuard } from '../auth/guards/jwt-instructor-auth.guard';
import { AuthenticatedInstructorRequest } from '../auth/types/authenticated-instructor-request.type';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  @UseGuards(JwtInstructorAuthGuard)
  create(
    @Body() createProgramDto: CreateProgramDto,
    @Request() request: AuthenticatedInstructorRequest,
  ) {
    return this.programService.create(createProgramDto, request.user.id);
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

import { PartialType } from '@nestjs/mapped-types';
import { CreateOfflineClassDto } from './create-offline-class.dto';

export class UpdateOfflineClassDto extends PartialType(CreateOfflineClassDto) {}

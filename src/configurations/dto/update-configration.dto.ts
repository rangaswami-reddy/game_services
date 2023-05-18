import { PartialType } from '@nestjs/mapped-types';
import { CreateConfigurationDto } from './create-configration.dto';

export class UpdateConfigurationDto extends PartialType(
  CreateConfigurationDto,
) {}

import { IsString, IsObject } from 'class-validator';
export class CreateBotUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName?: string;
  @IsString()
  email: string;
  @IsObject()
  photo?: {
    fileURI: string;
    fileType: string;
  };
  createdBy?: string;
  createdById?: string;
}

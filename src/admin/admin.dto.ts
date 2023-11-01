import { IsEmail, IsString } from 'class-validator';

export class AdminDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

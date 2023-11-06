import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UserResponseDto {
  @IsBoolean()
  success: boolean;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  data?: any;
}
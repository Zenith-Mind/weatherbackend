import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ResponseDto {
  @IsBoolean()
  success: boolean;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  data?: any;
}

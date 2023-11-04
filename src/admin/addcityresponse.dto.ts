import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AddCityResponseDto {
  @IsBoolean()
  success: boolean;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  data?: any;
}

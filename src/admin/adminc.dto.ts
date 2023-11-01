import { IsString } from 'class-validator';
export class AdmincDto {
  @IsString()
  city: string;
}

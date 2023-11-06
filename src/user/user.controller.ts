import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dtos/userresponse.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('weather-data')
  async getWeatherData(): Promise<UserResponseDto> {
    //return this.userService.getWeather();
    const res = await this.userService.getWeather();
    const responseDto: UserResponseDto = {
      success: true,
      message: 'Weather Data',
      data: res,
    };

    return responseDto;
  }
}

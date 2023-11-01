import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { AdminService } from 'src/admin/admin.service';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(private adminService: AdminService) {}

  async getWeather() {
    const API_KEY = '33711ae1f14490268b375855fc1f5eb9';
    const allCities = await this.adminService.findAllc();
    const data = [];
    for (const cities of allCities) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cities.city}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(url);
      const obj = response.data.main;
      obj['city'] = cities.city;
      //console.log(response.data.weather[0].description);
      obj['description'] = response.data.weather[0].description;
      data.push(obj);
    }
    return data;
  }
}

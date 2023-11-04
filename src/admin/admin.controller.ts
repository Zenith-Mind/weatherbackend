import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
  Req,
  Session,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdmincDto } from './adminc.dto';
import { from, Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Request } from 'express';
import { AdminDto } from './admin.dto';
import { AddCityResponseDto } from './addcityresponse.dto';
import { validate } from 'class-validator';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('add-city')
  add(@Body() body: AdmincDto, @Session() session: any): AddCityResponseDto {
    if (session.userId === undefined) {
      throw new BadRequestException('Admin access needed');
    }
    const res = this.adminService.addCity(body);
    const responseDto: AddCityResponseDto = {
      success: true,
      message: 'City added successfully',
      //data: res,
    };

    return responseDto;
    // const responseDto = new AddCityResponseDto();
    // responseDto.success = true;
    // responseDto.message = 'City added successfully';
    // responseDto.data = res;

    // const errors = await validate(responseDto);
    // if (errors.length > 0) {
    //   throw new BadRequestException(errors);
    // }

    // return responseDto;
  }

  @Get('all-cities')
  findAll(@Session() session: any) {
    if (session.userId === undefined) {
      return new BadRequestException('Admin access needed');
    }
    return this.adminService.findAllc();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    body: AdmincDto,
    @Session() session: any,
  ) {
    if (session.userId === undefined) {
      return new BadRequestException('Admin access needed');
    }
    return this.adminService.updatec(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Session() session: any) {
    if (session.userId === undefined) {
      return new BadRequestException('Admin access needed');
    }
    return this.adminService.deletec(id);
  }

  @Post('/signup')
  async signup(@Body() body: AdminDto, @Session() session: any) {
    const user = await this.adminService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/login')
  async login(@Body() body: AdminDto, @Session() session: any) {
    const user = await this.adminService.login(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/logout')
  async signout(@Session() session: any) {
    session.userId = undefined;
    return { Message: 'Logged Out Successfully' };
  }
}

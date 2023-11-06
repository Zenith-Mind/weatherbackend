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
import { AdmincDto } from './dtos/adminc.dto';
import { from, Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Request } from 'express';
import { AdminDto } from './dtos/admin.dto';
import { ResponseDto } from './dtos/response.dto';
import { validate } from 'class-validator';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('add-city')
  async add(
    @Body() body: AdmincDto,
    @Session() session: any,
  ): Promise<ResponseDto> {
    if (session.userId === undefined) {
      throw new BadRequestException('Admin access needed');
    }
    const res = await this.adminService.addCity(body);
    const responseDto: ResponseDto = {
      success: true,
      message: 'City added successfully',
      data: res,
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
  async findAll(@Session() session: any): Promise<ResponseDto> {
    if (session.userId === undefined) {
      throw new BadRequestException('Admin access needed');
    }
    //return this.adminService.findAllc();
    const res = await this.adminService.findAllc();
    const responseDto: ResponseDto = {
      success: true,
      message: 'List of cities',
      data: res,
    };

    return responseDto;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    body: AdmincDto,
    @Session() session: any,
  ): Promise<ResponseDto> {
    if (session.userId === undefined) {
      throw new BadRequestException('Admin access needed');
    }
    //return this.adminService.updatec(id, body);
    const res = await this.adminService.updatec(id, body);
    const responseDto: ResponseDto = {
      success: true,
      message: `Updated city with id=${id}`,
      data: res,
    };

    return responseDto;
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Session() session: any,
  ): Promise<ResponseDto> {
    if (session.userId === undefined) {
      throw new BadRequestException('Admin access needed');
    }
    const res = await this.adminService.deletec(id);
    const responseDto: ResponseDto = {
      success: true,
      message: `Deleted city with id=${id}`,
      data: res,
    };

    return responseDto;
  }

  @Post('/signup')
  async signup(
    @Body() body: AdminDto,
    @Session() session: any,
  ): Promise<ResponseDto> {
    const user = await this.adminService.signup(body.email, body.password);
    session.userId = user.id;

    const responseDto: ResponseDto = {
      success: true,
      message: 'New admin created successfully',
      data: user,
    };

    return responseDto;
  }

  @Post('/login')
  async login(
    @Body() body: AdminDto,
    @Session() session: any,
  ): Promise<ResponseDto> {
    const user = await this.adminService.login(body.email, body.password);
    session.userId = user.id;
    const responseDto: ResponseDto = {
      success: true,
      message: 'Login successful',
      data: user,
    };

    return responseDto;
  }

  @Post('/logout')
  async signout(@Session() session: any): Promise<ResponseDto> {
    session.userId = undefined;
    const responseDto: ResponseDto = {
      success: true,
      message: 'Logout successful',
    };

    return responseDto;
  }
}

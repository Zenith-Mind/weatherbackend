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

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('add-city')
  add(@Body() body: AdmincDto, @Session() session: any) {
    if (session.userId === undefined) {
      return new BadRequestException('Admin access needed');
    }
    return this.adminService.addCity(body);
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

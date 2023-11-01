import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmincEntity } from './adminc.entity';
import { AdminEntity } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdmincEntity, AdminEntity])],
  controllers: [AdminController],
  providers: [AdminService, AdmincEntity],
  exports: [AdminService, AdmincEntity],
})
export class AdminModule {}

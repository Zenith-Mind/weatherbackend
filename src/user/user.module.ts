import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AdminModule } from 'src/admin/admin.module';
import { AdminService } from 'src/admin/admin.service';
import { AdmincEntity } from 'src/admin/adminc.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AdminModule, AdmincEntity],
})
export class UserModule {}

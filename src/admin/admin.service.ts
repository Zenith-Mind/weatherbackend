import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AdmincEntity } from './adminc.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdmincDto } from './adminc.dto';
import { from, Observable } from 'rxjs';
import { AdminEntity } from './admin.entity';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdmincEntity)
    private readonly admincRepository: Repository<AdmincEntity>,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}
  addCity(addcity: AdmincDto) {
    return this.admincRepository.save(addcity);
  }
  findAllc() {
    return this.admincRepository.find();
  }
  updatec(id: number, city: AdmincDto) {
    return this.admincRepository.update(id, city);
  }
  deletec(id: number) {
    return this.admincRepository.delete(id);
  }
  async signup(email: string, password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const res = salt + '.' + hash.toString('hex');
    password = res;
    return this.adminRepository.save({ email, password });
  }

  async login(email: string, password: string) {
    const users = await this.adminRepository.find({ where: { email: email } });
    const [user] = users;
    if (!user) return user;
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) return null;

    return user;
  }
}

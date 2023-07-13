import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { jwtService } from 'src/JWT';

@Injectable()
export class UsersService {
	constructor( 
		@InjectRepository(User)
		private repo: Repository<User>)
	{

	}

	async signUp(name, password) {
		var user = new User();
		if (await this.repo.findOne({where: {name: name}}) != null)
			throw new UnauthorizedException();
		user.name = name;
		user.password = password;
		user.rights = name == "root" ? 2 : 1;
		user = await this.repo.save(user);
		return await jwtService.sign({
			name: user.name,
			id: user.id,
			rights: user.rights,
		});
  	}

	  async me(name) {
		var user = await this.repo.findOne({where: {name: name},  relations: ['projects']});
		return user;
  	}

	async signIn(name, password) {
		var user = await this.repo.findOne({where: {name: name, password: password}})
		if (user == null)
		{
			throw new UnauthorizedException();
		}
		return await jwtService.sign({
			name: user.name,
			id: user.id,
			rights: user.rights,
		});
	}

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

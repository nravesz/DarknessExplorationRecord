import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { LoginResponseDTO } from './dto/login-response.dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService
	) {}

	async login(createUserDTO: CreateUserDTO) {
		const user = await this.validateUser(createUserDTO);
		if (!user) {
			throw new UnauthorizedException('Invalidate credentials');
		}
		const payload = {
			sub: user._id,
			email: user.email,
		};
		const doc: LoginResponseDTO = {
			accessToken: this.jwtService.sign(payload),
		};
		return doc;
	}

	async validateUser(createUserDTO: CreateUserDTO) {
		const user = await this.usersService.findByEmail(createUserDTO.email);
		if (!user) return null;

		const isMatch = await bcrypt.compare(createUserDTO.password, user.password);
		if (!isMatch) return null;

		return user;
	}
}

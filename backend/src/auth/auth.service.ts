import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import { LoginResponseDTO } from './dto/login-response.dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService
	) {}

	async login(createUserDTO: LoginDTO): Promise<LoginResponseDTO> {
		const user = await this.validateUser(createUserDTO);
		if (!user) {
			throw new UnauthorizedException('Invalidate credentials');
		}
		const payload = {
			sub: user.id,
			email: user.email,
		};

		const accessToken = this.jwtService.sign(payload, {
			expiresIn: '15m',
		});

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: '7d',
		});

		const doc: LoginResponseDTO = {
			accessToken,
			refreshToken,
			email: user.email,
			codename: user.codename,
		};
		return doc;
	}

	refresh(refreshToken: string): { accessToken: string } {
		const payload = this.jwtService.verify(refreshToken);
		const accessToken = this.jwtService.sign(
			{ sub: payload.sub, email: payload.email },
			{ expiresIn: '15m' }
		);
		return { accessToken };
	}

	async validateUser(
		createUserDTO: LoginDTO
	): Promise<{ id: string; email: string; codename: string } | null> {
		const user = await this.usersService.findByEmail(createUserDTO.email);
		if (!user) return null;

		const isMatch = await bcrypt.compare(createUserDTO.password, user.password);
		if (!isMatch) return null;

		return user;
	}
}

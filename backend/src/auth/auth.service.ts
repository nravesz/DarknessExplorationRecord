import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findByEmail(email);
		if (!user) return null;

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return null;

		return user;
	}

	async login(user: any) {
		const payload = { sub: user._id, email: user.email };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}

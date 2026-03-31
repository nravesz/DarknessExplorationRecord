import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { LoginResponseDTO } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(
		@Body() createUserDTO: LoginDTO,
		@Res({ passthrough: true }) res: Response
	): Promise<{ accessToken: string }> {
		const data: LoginResponseDTO = await this.authService.login(createUserDTO);

		res.cookie('refreshToken', data.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return { accessToken: data.accessToken };
	}
}

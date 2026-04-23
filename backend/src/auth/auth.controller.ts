import { Body, Controller, HttpCode, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';
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
	): Promise<{ accessToken: string; email: string; codename: string; role: string }> {
		const data: LoginResponseDTO = await this.authService.login(createUserDTO);

		res.cookie('refreshToken', data.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return { accessToken: data.accessToken, email: data.email, codename: data.codename, role: data.role };
	}

	@Post('refresh')
	@HttpCode(200)
	refresh(@Req() req: Request): { accessToken: string } {
		const token = req.cookies?.refreshToken;
		if (!token) throw new UnauthorizedException('No refresh token provided');
		return this.authService.refresh(token);
	}

	@Post('logout')
	@HttpCode(200)
	logout(@Res({ passthrough: true }) res: Response): void {
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		});
	}
}

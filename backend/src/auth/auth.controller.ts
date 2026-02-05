import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { LoginResponseDTO } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() createUserDTO: CreateUserDTO): Promise<LoginResponseDTO> {
		return this.authService.login(createUserDTO);
	}
}

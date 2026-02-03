import { Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class GhostStoriesController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(createUserDTO: CreateUserDTO) {
		const user = await this.authService.validateUser(
			createUserDTO.email,
			createUserDTO.password
		);
        if (!user) {
          throw new UnauthorizedException('Credenciales inválidas');
        }
        return this.authService.login(user);
	}

}

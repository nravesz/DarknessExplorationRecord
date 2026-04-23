import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    @Post()
    async createUser(
        @Body() createUserDTO: CreateUserDTO,
        @Res({ passthrough: true }) res: Response
    ) {
        const user = await this.userService.create(createUserDTO);

        const payload = { sub: user.id, email: user.email, role: user.role };

        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { accessToken, email: user.email, codename: user.codename, role: user.role };
    }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async createGhostStory(
        @Body()
        createUserDTO: CreateUserDTO
    ) {
        const user = await this.userService.create(createUserDTO);
        return user;
    }
}

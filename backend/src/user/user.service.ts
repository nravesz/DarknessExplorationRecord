import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UserRepository } from "./user.repository";


@Injectable()
export class UserService {
    constructor(private repository: UserRepository) {}

    async create(createUserDTO: CreateUserDTO)
    {
        const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
        const newUser: CreateUserDTO = {
            email: createUserDTO.email,
            password: hashedPassword
        }

        return this.repository.create(newUser);
    }

    async findByEmail(email: string)
    {
        return this.repository.findByEmail(email);
    }
}
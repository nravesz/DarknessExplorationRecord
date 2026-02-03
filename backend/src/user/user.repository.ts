import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {}

    async create(createUserDTO: CreateUserDTO)
    {
        const session = await this.userModel.db.startSession();
		session.startTransaction();

		try {
			const doc = new this.userModel(createUserDTO);
			const saved = await doc.save({ session });

			await session.commitTransaction();
			session.endSession();
			return saved;
		} catch (err) {
			await session.abortTransaction();
			session.endSession();
			throw err;
		}
    }
}
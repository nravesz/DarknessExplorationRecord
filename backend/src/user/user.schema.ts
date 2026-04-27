import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from './enums/user-role.enum';

@Schema()
export class User {
	@Prop({
		unique: true,
		required: true,
	})
	email!: string;

	@Prop({ required: true })
	password!: string;

	@Prop({ required: true })
	name!: string;

	@Prop({ unique: true, required: true })
	codename!: string;

	@Prop({ enum: UserRole, default: UserRole.DEMO_USER })
	role!: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

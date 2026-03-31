import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
	@Prop({
		unique: true,
		required: true,
	})
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true })
	name: string;

	@Prop({ unique: true, required: true })
	codename: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

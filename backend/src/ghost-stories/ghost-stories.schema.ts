import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { GhostClass } from './enums/ghost-stories.enum';

@Schema()
export class GhostStory {
	@Prop({ required: true })
	storyId!: number;

	@Prop({ required: true })
	name!: string;

	@Prop({
		required: true,
		enum: GhostClass,
	})
	class!: GhostClass;

	@Prop()
	summary!: string;

	@Prop()
	mediumToEnter!: string;

	@Prop()
	description!: string;

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	author!: Types.ObjectId;
}

export const GhostStorySchema = SchemaFactory.createForClass(GhostStory);

GhostStorySchema.index({ class: 1, storyId: 1 }, { unique: true });

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { GhostClass } from './enums/ghost-stories.enum';

@Schema()
export class GhostStory {
	@Prop({ required: true })
	storyId: number;

	@Prop({ require: true })
	name: string;

	@Prop({
		required: true,
		enum: GhostClass,
	})
	class: GhostClass;
}

export const GhostStorySchema = SchemaFactory.createForClass(GhostStory);

GhostStorySchema.index({ class: 1, storyId: 1 }, { unique: true });

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { GhostClass } from './enums/ghost-stories.enum';

@Schema()
export class GhostStory {
	@Prop({ require: true })
	name: string;

	@Prop({
		required: true,
		enum: GhostClass,
	})
	class: GhostClass;
}

export const GhostStorySchema = SchemaFactory.createForClass(GhostStory);

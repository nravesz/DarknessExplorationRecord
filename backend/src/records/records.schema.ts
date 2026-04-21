import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Record {
	@Prop({ type: Types.ObjectId, ref: 'GhostStory', required: true })
	ghostStory!: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	user!: Types.ObjectId;

	@Prop()
	notes!: string;

	@Prop({ default: Date.now })
	encounteredAt!: Date;
}

export const RecordSchema = SchemaFactory.createForClass(Record);

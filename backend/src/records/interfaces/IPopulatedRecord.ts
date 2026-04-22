import { Types } from 'mongoose';

export interface IPopulatedRecord {
	_id: Types.ObjectId;
	ghostStory: { class: string; storyId: number; name: string };
	user: { codename: string } | null;
	notes: string;
	encounteredAt: Date;
}

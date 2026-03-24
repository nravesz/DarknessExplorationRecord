import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GhostStory } from './ghost-stories.schema';
import { Model } from 'mongoose';
import { CreateGhostStoryDTO } from './dto/create-ghost-story.dto';

@Injectable()
export class GhostStoriesRepository {
	constructor(
		@InjectModel(GhostStory.name)
		private ghostStoryModel: Model<GhostStory>
	) {}

	async getAll() {
		const session = await this.ghostStoryModel.db.startSession();
		session.startTransaction();

		try {
			const doc = await this.ghostStoryModel.find().session(session);

			await session.commitTransaction();
			session.endSession();
			return doc;
		} catch (err) {
			await session.abortTransaction();
			session.endSession();
			throw err;
		}
	}

	async createGhostStory(dto: CreateGhostStoryDTO) {
		const session = await this.ghostStoryModel.db.startSession();
		session.startTransaction();

		try {
			const count = await this.ghostStoryModel
				.countDocuments({ class: dto.class })
				.session(session);

			let storyId = count + 1;
			while (await this.ghostStoryModel.exists({ class: dto.class, storyId }).session(session)) {
				storyId++;
			}

			const doc = new this.ghostStoryModel({ ...dto, storyId });
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

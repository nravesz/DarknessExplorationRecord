import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GhostStory } from './ghost-stories.schema';
import { Model } from 'mongoose';
import { CreateGhostStoryDTO } from './dto/create-ghost-story.dto';
import { UpdateGhostStoryDTO } from './dto/update-ghost-story.dto';

@Injectable()
export class GhostStoriesRepository {
	constructor(
		@InjectModel(GhostStory.name)
		private ghostStoryModel: Model<GhostStory>
	) {}

	async getAll() {
		return this.ghostStoryModel.find().populate('author', 'codename');
	}

	async getOne(ghostClass: string, storyId: number) {
		return this.ghostStoryModel.findOne({ class: ghostClass, storyId }).populate('author', 'codename');
	}

	async getByAuthor(userId: string) {
		return this.ghostStoryModel.find({ author: userId }).populate('author', 'codename');
	}

	async update(ghostClass: string, storyId: number, dto: UpdateGhostStoryDTO, userId: string) {
		const story = await this.ghostStoryModel.findOne({ class: ghostClass, storyId });
		if (!story) throw new NotFoundException('Ghost story not found');
		if (story.author.toString() !== userId) throw new ForbiddenException();

		return this.ghostStoryModel
			.findOneAndUpdate({ class: ghostClass, storyId }, dto, { new: true })
			.populate('author', 'codename');
	}

	async createGhostStory(dto: CreateGhostStoryDTO, userId: string) {
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

			const doc = new this.ghostStoryModel({ ...dto, storyId, author: userId });
			const saved = await doc.save({ session });

			await session.commitTransaction();
			session.endSession();
			return saved.populate('author', 'codename');
		} catch (err) {
			await session.abortTransaction();
			session.endSession();
			throw err;
		}
	}
}

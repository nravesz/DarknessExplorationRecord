import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GhostStory } from '../ghost-stories/ghost-stories.schema';
import { CreateRecordDTO } from './dto/create-record.dto';
import { UpdateRecordDTO } from './dto/update-record.dto';
import { Record } from './records.schema';

@Injectable()
export class RecordsRepository {
	constructor(
		@InjectModel(Record.name) private recordModel: Model<Record>,
		@InjectModel(GhostStory.name) private ghostStoryModel: Model<GhostStory>
	) {}

	async getAll() {
		return this.recordModel
			.find()
			.sort({ _id: -1 })
			.populate('user', 'codename')
			.populate('ghostStory', 'name class storyId');
	}

	async getByAuthor(userId: string) {
		return this.recordModel
			.find({ user: userId })
			.sort({ _id: -1 })
			.populate('user', 'codename')
			.populate('ghostStory', 'name class storyId');
	}

	async getByGhostStory(ghostClass: string, storyId: number) {
		const ghostStory = await this.ghostStoryModel.findOne({ class: ghostClass, storyId });
		if (!ghostStory) throw new NotFoundException('Ghost story not found');

		return this.recordModel
			.find({ ghostStory: ghostStory._id })
			.sort({ _id: -1 })
			.populate('user', 'codename')
			.populate('ghostStory', 'name class storyId');
	}

	async delete(recordId: string, userId: string) {
		const record = await this.recordModel.findById(recordId);
		if (!record) throw new NotFoundException('Record not found');
		if (record.user.toString() !== userId) throw new ForbiddenException();

		await record.deleteOne();
	}

	async update(recordId: string, dto: UpdateRecordDTO, userId: string) {
		const record = await this.recordModel.findById(recordId);
		if (!record) throw new NotFoundException('Record not found');
		if (record.user.toString() !== userId) throw new ForbiddenException();

		return this.recordModel
			.findByIdAndUpdate(recordId, dto, { new: true })
			.populate('user', 'codename')
			.populate('ghostStory', 'name class storyId');
	}

	async create(dto: CreateRecordDTO, userId: string) {
		const ghostStory = await this.ghostStoryModel.findOne({ class: dto.class, storyId: dto.storyId });
		if (!ghostStory) throw new NotFoundException('Ghost story not found');

		const doc = new this.recordModel({
			ghostStory: ghostStory._id,
			user: userId,
			notes: dto.notes,
		});

		return (await doc.save())
			.populate('user', 'codename')
			.then((d) => d.populate('ghostStory', 'name class storyId'));
	}
}

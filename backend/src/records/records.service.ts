import { Injectable } from '@nestjs/common';
import { CreateRecordDTO } from './dto/create-record.dto';
import { UpdateRecordDTO } from './dto/update-record.dto';
import { RecordsRepository } from './records.repository';
import { IPopulatedRecord } from './interfaces/IPopulatedRecord';

@Injectable()
export class RecordsService {
	constructor(private repository: RecordsRepository) {}

	private toResponse(doc: IPopulatedRecord) {
		return {
			id: doc._id,
			ghostStory: {
				id: `Qterw-${doc.ghostStory.class}-${doc.ghostStory.storyId}`,
				name: doc.ghostStory.name,
				class: doc.ghostStory.class,
			},
			user: doc.user?.codename,
			notes: doc.notes,
			encounteredAt: doc.encounteredAt,
		};
	}

	async getAll() {
		const docs = await this.repository.getAll();
		return docs.map((doc) => this.toResponse(doc as unknown as IPopulatedRecord));
	}

	async getMyRecords(userId: string) {
		const docs = await this.repository.getByAuthor(userId);
		return docs.map((doc) => this.toResponse(doc as unknown as IPopulatedRecord));
	}

	async getByGhostStory(ghostClass: string, storyId: number) {
		const docs = await this.repository.getByGhostStory(ghostClass, storyId);
		return docs.map((doc) => this.toResponse(doc as unknown as IPopulatedRecord));
	}

	async delete(recordId: string, userId: string) {
		await this.repository.delete(recordId, userId);
	}

	async update(recordId: string, dto: UpdateRecordDTO, userId: string) {
		const doc = await this.repository.update(recordId, dto, userId);
		return this.toResponse(doc as unknown as IPopulatedRecord);
	}

	async create(dto: CreateRecordDTO, userId: string) {
		const doc = await this.repository.create(dto, userId);
		return this.toResponse(doc as unknown as IPopulatedRecord);
	}
}

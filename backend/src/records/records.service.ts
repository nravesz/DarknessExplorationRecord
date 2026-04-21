import { Injectable } from '@nestjs/common';
import { CreateRecordDTO } from './dto/create-record.dto';
import { RecordsRepository } from './records.repository';

@Injectable()
export class RecordsService {
	constructor(private repository: RecordsRepository) {}

	private toResponse(doc: any) {
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
		return docs.map((doc) => this.toResponse(doc));
	}

	async getByGhostStory(ghostClass: string, storyId: number) {
		const docs = await this.repository.getByGhostStory(ghostClass, storyId);
		return docs.map((doc) => this.toResponse(doc));
	}

	async create(dto: CreateRecordDTO, userId: string) {
		const doc = await this.repository.create(dto, userId);
		return this.toResponse(doc);
	}
}

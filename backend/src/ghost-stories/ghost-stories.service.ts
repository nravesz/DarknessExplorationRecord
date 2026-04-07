import { Injectable } from '@nestjs/common';
import { CreateGhostStoryDTO } from './dto/create-ghost-story.dto';
import { GhostStoriesRepository } from './ghost-stories.repository';

@Injectable()
export class GhostStoriesService {
	constructor(private repository: GhostStoriesRepository) {}

	private toResponse(doc: any) {
		return {
			id: `Qterw-${doc.class}-${doc.storyId}`,
			name: doc.name,
			class: doc.class,
			summary: doc.summary,
			mediumToEnter: doc.mediumToEnter,
			description: doc.description,
			author: doc.author,
		};
	}

	async getAll() {
		const docs = await this.repository.getAll();
		return docs.map((doc) => this.toResponse(doc));
	}

	async getOne(ghostClass: string, storyId: number) {
		const doc = await this.repository.getOne(ghostClass, storyId);
		return this.toResponse(doc);
	}

	async createGhostStory(createGhostStoryDTO: CreateGhostStoryDTO, userId: string) {
		const doc = await this.repository.createGhostStory(createGhostStoryDTO, userId);
		return this.toResponse(doc);
	}
}

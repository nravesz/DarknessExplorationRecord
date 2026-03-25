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
		};
	}

	async getAll() {
		const docs = await this.repository.getAll();
		return docs.map((doc) => this.toResponse(doc));
	}

	async createGhostStory(createGhostStoryDTO: CreateGhostStoryDTO) {
		const doc = await this.repository.createGhostStory(createGhostStoryDTO);
		return this.toResponse(doc);
	}
}

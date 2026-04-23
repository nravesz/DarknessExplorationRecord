import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGhostStoryDTO } from './dto/create-ghost-story.dto';
import { UpdateGhostStoryDTO } from './dto/update-ghost-story.dto';
import { GhostStoriesRepository } from './ghost-stories.repository';
import { IPopulatedGhostStory } from './interfaces/IPopulatedGhostStory';

@Injectable()
export class GhostStoriesService {
	constructor(private repository: GhostStoriesRepository) {}

	private toResponse(doc: IPopulatedGhostStory) {
		return {
			id: `Qterw-${doc.class}-${doc.storyId}`,
			name: doc.name,
			class: doc.class,
			summary: doc.summary,
			mediumToEnter: doc.mediumToEnter,
			description: doc.description,
			author: doc.author?.codename,
		};
	}

	async getAll() {
		const docs = await this.repository.getAll();
		return docs.map((doc) => this.toResponse(doc as unknown as IPopulatedGhostStory));
	}

	async getOne(ghostClass: string, storyId: number) {
		const doc = await this.repository.getOne(ghostClass, storyId);
		if (!doc) throw new NotFoundException('Ghost story not found');
		return this.toResponse(doc as unknown as IPopulatedGhostStory);
	}

	async getMyStories(userId: string) {
		const docs = await this.repository.getByAuthor(userId);
		return docs.map((doc) => this.toResponse(doc as unknown as IPopulatedGhostStory));
	}

	async createGhostStory(createGhostStoryDTO: CreateGhostStoryDTO, userId: string) {
		const doc = await this.repository.createGhostStory(createGhostStoryDTO, userId);
		return this.toResponse(doc as unknown as IPopulatedGhostStory);
	}

	async update(ghostClass: string, storyId: number, dto: UpdateGhostStoryDTO, userId: string) {
		const doc = await this.repository.update(ghostClass, storyId, dto, userId);
		return this.toResponse(doc as unknown as IPopulatedGhostStory);
	}

	async delete(ghostClass: string, storyId: number, userId: string) {
		await this.repository.delete(ghostClass, storyId, userId);
	}
}

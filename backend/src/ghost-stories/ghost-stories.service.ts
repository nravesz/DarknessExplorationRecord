import { Injectable } from '@nestjs/common';
import { CreateGhostStoryDTO } from './dto/create-ghost-story.dto';
import { GhostStoriesRepository } from './ghost-stories.repository';

@Injectable()
export class GhostStoriesService {
	constructor(private repository: GhostStoriesRepository) {}

	async getAll() {
		return this.repository.getAll();
	}

	async createGhostStory(createGhostStoryDTO: CreateGhostStoryDTO) {
		return this.repository.createGhostStory(createGhostStoryDTO);
	}
}

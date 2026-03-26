import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GhostStoriesService } from './ghost-stories.service';
import { CreateGhostStoryDTO } from './dto/create-ghost-story.dto';

@Controller('ghost-stories')
export class GhostStoriesController {
	constructor(private ghostStoriesService: GhostStoriesService) {}

	@Get()
	async getAll() {
		const ghostStory = await this.ghostStoriesService.getAll();
		return ghostStory;
	}

	@Get(':class/:storyId')
	async getOne(
		@Param('class') ghostClass: string,
		@Param('storyId') storyId: number
	) {
		return this.ghostStoriesService.getOne(ghostClass, storyId);
	}

	@Post()
	async createGhostStory(
		@Body()
		createGhostStoryDTO: CreateGhostStoryDTO
	) {
		const ghostStory = await this.ghostStoriesService.createGhostStory(createGhostStoryDTO);
		return ghostStory;
	}
}

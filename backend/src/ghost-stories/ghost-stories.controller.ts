import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { GhostStoriesService } from './ghost-stories.service';
import { CreateGhostStoryDTO } from './dto/create-ghost-story.dto';
import { UpdateGhostStoryDTO } from './dto/update-ghost-story.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ghost-stories')
export class GhostStoriesController {
	constructor(private ghostStoriesService: GhostStoriesService) {}

	@Get()
	async getAll() {
		const ghostStory = await this.ghostStoriesService.getAll();
		return ghostStory;
	}

	@Get('my')
	@UseGuards(JwtAuthGuard)
	async getMyStories(@Request() req: any) {
		return this.ghostStoriesService.getMyStories(req.user.sub);
	}

	@Get(':class/:storyId')
	async getOne(
		@Param('class') ghostClass: string,
		@Param('storyId', ParseIntPipe) storyId: number
	) {
		return this.ghostStoriesService.getOne(ghostClass, storyId);
	}

	@Patch(':class/:storyId')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param('class') ghostClass: string,
		@Param('storyId', ParseIntPipe) storyId: number,
		@Body() dto: UpdateGhostStoryDTO,
		@Request() req: any
	) {
		return this.ghostStoriesService.update(ghostClass, storyId, dto, req.user.sub);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async createGhostStory(
		@Body() createGhostStoryDTO: CreateGhostStoryDTO,
		@Request() req: any
	) {
		const ghostStory = await this.ghostStoriesService.createGhostStory(createGhostStoryDTO, req.user.sub);
		return ghostStory;
	}
}

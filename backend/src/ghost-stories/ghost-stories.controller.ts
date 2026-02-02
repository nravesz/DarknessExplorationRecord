import { Body, Controller, Get, Post } from "@nestjs/common";
import { GhostStoriesService } from "./ghost-stories.service";
import { CreateGhostStoryDTO } from "./dto/create-ghost-story.dto";

@Controller('ghost-stories')
export class GhostStoriesController {
    constructor(private ghostStoriesService: GhostStoriesService) {}

    @Get()
    async getAll()
    {
        const ghostStory = await this.ghostStoriesService.getAll();;
        return ghostStory;
    }

    @Post()
    async createGhostStory(
        @Body()
        createGhostStoryDTO : CreateGhostStoryDTO
    ) {
        const ghostStory = await this.ghostStoriesService.createGhostStory(createGhostStoryDTO);;
        return ghostStory;
    }
}
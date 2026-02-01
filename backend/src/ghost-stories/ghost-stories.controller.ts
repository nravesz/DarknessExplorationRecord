import { Body, Controller, Post } from "@nestjs/common";
import { GhostStoriesService } from "./ghost-stories.service";
import { CreateGhostStoryDTO } from "./dto/create-ghost-story.dto";

@Controller('ghost-stories')
export class GhostStoriesController {
    constructor(private ghostStoriesService: GhostStoriesService) {}

    @Post()
    async createGhostStory(
        @Body()
        createGhostStoryDTO : CreateGhostStoryDTO
    ) {
        console.log(createGhostStoryDTO);
        const ghostStory = await this.ghostStoriesService.createGhostStory(createGhostStoryDTO);;
        return ghostStory;
    }
}
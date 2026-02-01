import { Body, Controller, Post } from "@nestjs/common";
import { GhostStoriesService } from "./ghost-stories.service";
import { CreateGhostStoryDTO } from "./dto/create-ghost-story.dto";

@Controller('ghost-stories')
export class GhostStoriesController {
    constructor(private ghostStoriesService: GhostStoriesService) {}

    @Post()
    createGhostStory(
        @Body()
        createGhostStoryDTO : CreateGhostStoryDTO
    ) {
        console.log(createGhostStoryDTO);
    }
}
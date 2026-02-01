import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { GhostStory } from "./ghost-stories.schema";
import { Model } from "mongoose";
import { CreateGhostStoryDTO } from "./dto/create-ghost-story.dto";
import { GhostStoriesRepository } from "./ghost-stories.repository";

@Injectable()
export class GhostStoriesService {
    constructor(
        @InjectModel(GhostStory.name)
        private ghostStoryModel: Model<GhostStory>,
        private repository: GhostStoriesRepository
    ) {}

    async createGhostStory(createGhostStoryDTO: CreateGhostStoryDTO) {
        return this.repository.createGhostStory(createGhostStoryDTO);;
    }
}

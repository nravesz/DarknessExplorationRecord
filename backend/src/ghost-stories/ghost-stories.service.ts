import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { GhostStory } from "./ghost-stories.schema";
import { Model } from "mongoose";
import { CreateGhostStoryDTO } from "./dto/create-ghost-story.dto";

@Injectable()
export class GhostStoriesService {
    constructor(
        @InjectModel(GhostStory.name)
        private ghostStoryModel: Model<GhostStory>
    ) {}

    createGhostStory(createGhostStoryDTO: CreateGhostStoryDTO) {
        const newGhostStory = new this.ghostStoryModel(createGhostStoryDTO);
        return newGhostStory.save();
    }
}

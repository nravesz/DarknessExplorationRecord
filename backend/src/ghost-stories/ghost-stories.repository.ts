import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GhostStory } from './ghost-stories.schema';
import { Model } from 'mongoose';
import { CreateGhostStoryDTO } from './dto/create-ghost-story.dto';

@Injectable()
export class GhostStoriesRepository {
  constructor(
    @InjectModel(GhostStory.name)
    private ghostStoryModel: Model<GhostStory>,
  ) {}

  async createGhostStory(dto: CreateGhostStoryDTO) {
    const doc = new this.ghostStoryModel(dto);
    const save = await doc.save();
    return save;
  }
}
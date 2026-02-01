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
        const session = await this.ghostStoryModel.db.startSession();
        session.startTransaction();

        try {
            const doc = new this.ghostStoryModel(dto);
            const saved = await doc.save({ session });

            await session.commitTransaction();
            session.endSession();
            return saved;
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
  }
}
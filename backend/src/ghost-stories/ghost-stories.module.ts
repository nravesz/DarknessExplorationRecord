import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GhostStory, GhostStorySchema } from './ghost-stories.schema';
import { GhostStoriesService } from './ghost-stories.service';
import { GhostStoriesController } from './ghost-stories.controller';
import { GhostStoriesRepository } from './ghost-stories.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: GhostStory.name,
				schema: GhostStorySchema,
			},
		]),
	],
	controllers: [GhostStoriesController],
	providers: [GhostStoriesService, GhostStoriesRepository],
})
export class GhostStoryModule {}

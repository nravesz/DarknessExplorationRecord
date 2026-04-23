import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GhostStory, GhostStorySchema } from './ghost-stories.schema';
import { GhostStoriesService } from './ghost-stories.service';
import { GhostStoriesController } from './ghost-stories.controller';
import { GhostStoriesRepository } from './ghost-stories.repository';
import { AuthModule } from '../auth/auth.module';
import { Record, RecordSchema } from '../records/records.schema';

@Module({
	imports: [
		AuthModule,
		MongooseModule.forFeature([
			{ name: GhostStory.name, schema: GhostStorySchema },
			{ name: Record.name, schema: RecordSchema },
		]),
	],
	controllers: [GhostStoriesController],
	providers: [GhostStoriesService, GhostStoriesRepository],
})
export class GhostStoryModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { GhostStory, GhostStorySchema } from '../ghost-stories/ghost-stories.schema';
import { Record, RecordSchema } from '../records/records.schema';
import { CleanupService } from './cleanup.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: GhostStory.name, schema: GhostStorySchema },
			{ name: Record.name, schema: RecordSchema },
		]),
	],
	providers: [CleanupService],
})
export class CleanupModule {}

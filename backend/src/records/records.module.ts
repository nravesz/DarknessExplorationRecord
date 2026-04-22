import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { GhostStory, GhostStorySchema } from '../ghost-stories/ghost-stories.schema';
import { RecordsController } from './records.controller';
import { RecordsRepository } from './records.repository';
import { RecordsService } from './records.service';
import { Record, RecordSchema } from './records.schema';

@Module({
	imports: [
		AuthModule,
		MongooseModule.forFeature([
			{ name: Record.name, schema: RecordSchema },
			{ name: GhostStory.name, schema: GhostStorySchema },
		]),
	],
	controllers: [RecordsController],
	providers: [RecordsService, RecordsRepository],
})
export class RecordsModule {}

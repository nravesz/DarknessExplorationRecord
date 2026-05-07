import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../user/user.schema';
import { UserRole } from '../user/enums/user-role.enum';
import { GhostStory } from '../ghost-stories/ghost-stories.schema';
import { Record } from '../records/records.schema';

@Injectable()
export class CleanupService {
	private readonly logger = new Logger(CleanupService.name);

	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		@InjectModel(GhostStory.name) private ghostStoryModel: Model<GhostStory>,
		@InjectModel(Record.name) private recordModel: Model<Record>
	) {}

	@Cron('*/5 * * * *')
	async cleanupExpiredDemoUsers() {
		this.logger.log('Running demo user cleanup...');
		try {
			const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
			const cutoffId = Types.ObjectId.createFromTime(Math.floor(fiveMinutesAgo.getTime() / 1000));

			const expiredUsers = await this.userModel.find({
				role: UserRole.DEMO_USER,
				_id: { $lt: cutoffId },
			});

			if (expiredUsers.length === 0) {
				this.logger.log('No expired demo users found.');
				return;
			}

			const userIds = expiredUsers.map((u) => u._id);

			const expiredStories = await this.ghostStoryModel.find({ author: { $in: userIds } });
			const storyIds = expiredStories.map((s) => s._id);

			await this.recordModel.deleteMany({ ghostStory: { $in: storyIds } });
			await this.recordModel.deleteMany({ user: { $in: userIds } });
			await this.ghostStoryModel.deleteMany({ _id: { $in: storyIds } });
			await this.userModel.deleteMany({ _id: { $in: userIds } });

			this.logger.log(`Cleaned up ${expiredUsers.length} expired demo user(s)`);
		} catch (err) {
			this.logger.error('Cleanup failed', err);
		}
	}

	@Cron('*/5 * * * *')
	async cleanupOrphanedStories() {
		try {
			const allUserIds = await this.userModel.distinct('_id');
			const orphaned = await this.ghostStoryModel.find({ author: { $nin: allUserIds } });

			if (orphaned.length === 0) return;

			const orphanedIds = orphaned.map((s) => s._id);
			await this.recordModel.deleteMany({ ghostStory: { $in: orphanedIds } });
			await this.ghostStoryModel.deleteMany({ _id: { $in: orphanedIds } });

			this.logger.log(`Cleaned up ${orphaned.length} orphaned story(s)`);
		} catch (err) {
			this.logger.error('Orphan cleanup failed', err);
		}
	}
}

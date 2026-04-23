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

	@Cron(CronExpression.EVERY_HOUR)
	async cleanupExpiredDemoUsers() {
		const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
		// ObjectId encodes creation time — users created before oneHourAgo have a smaller ObjectId
		const cutoffId = Types.ObjectId.createFromTime(Math.floor(oneHourAgo.getTime() / 1000));

		const expiredUsers = await this.userModel.find({
			role: UserRole.DEMO_USER,
			_id: { $lt: cutoffId },
		});

		if (expiredUsers.length === 0) return;

		const userIds = expiredUsers.map((u) => u._id);

		// Find GS created by expired users
		const expiredStories = await this.ghostStoryModel.find({ author: { $in: userIds } });
		const storyIds = expiredStories.map((s) => s._id);

		// Delete all records on those GS (from any user)
		await this.recordModel.deleteMany({ ghostStory: { $in: storyIds } });

		// Delete any remaining records created by the expired users (on other people's GS)
		await this.recordModel.deleteMany({ user: { $in: userIds } });

		// Delete the GS
		await this.ghostStoryModel.deleteMany({ _id: { $in: storyIds } });

		// Delete the users
		await this.userModel.deleteMany({ _id: { $in: userIds } });

		this.logger.log(`Cleaned up ${expiredUsers.length} expired demo user(s)`);
	}
}

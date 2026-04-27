import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { GhostStoryModule } from './ghost-stories/ghost-stories.module';
import { UserModule } from './user/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RecordsModule } from './records/records.module';
import { CleanupModule } from './cleanup/cleanup.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				uri: config.get<string>('MONGODB_URI'),
			}),
		}),
		ScheduleModule.forRoot(),
		UserModule,
		GhostStoryModule,
		AuthModule,
		RecordsModule,
		CleanupModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

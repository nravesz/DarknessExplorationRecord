import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GhostStoryModule } from './ghost-stories/ghost-stories.module';
import { UserModule } from './user/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

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
		UserModule,
		GhostStoryModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

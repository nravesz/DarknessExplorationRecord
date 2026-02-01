import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GhostStoryModule } from './ghost-stories/ghost-stories.module';
import { GhostStoriesController } from './ghost-stories/ghost-stories.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nraveszani_db_user:98uTvtGTO3AOK9H7@cluster0.roqnvma.mongodb.net/?appName=Cluster0'),
    GhostStoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

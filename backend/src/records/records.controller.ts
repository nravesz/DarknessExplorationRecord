import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRecordDTO } from './dto/create-record.dto';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
	constructor(private recordsService: RecordsService) {}

	@Get()
	async getAll() {
		return this.recordsService.getAll();
	}

	@Get('my')
	@UseGuards(JwtAuthGuard)
	async getMyRecords(@Request() req: any) {
		return this.recordsService.getMyRecords(req.user.sub);
	}

	@Get(':class/:storyId')
	async getByGhostStory(
		@Param('class') ghostClass: string,
		@Param('storyId', ParseIntPipe) storyId: number
	) {
		return this.recordsService.getByGhostStory(ghostClass, storyId);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(@Body() dto: CreateRecordDTO, @Request() req: any) {
		return this.recordsService.create(dto, req.user.sub);
	}
}

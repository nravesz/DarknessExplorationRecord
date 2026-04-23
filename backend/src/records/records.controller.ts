import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRecordDTO } from './dto/create-record.dto';
import { UpdateRecordDTO } from './dto/update-record.dto';
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

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	@HttpCode(204)
	async delete(@Param('id') id: string, @Request() req: any) {
		await this.recordsService.delete(id, req.user.sub);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	async update(
		@Param('id') id: string,
		@Body() dto: UpdateRecordDTO,
		@Request() req: any
	) {
		return this.recordsService.update(id, dto, req.user.sub);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(@Body() dto: CreateRecordDTO, @Request() req: any) {
		return this.recordsService.create(dto, req.user.sub);
	}
}

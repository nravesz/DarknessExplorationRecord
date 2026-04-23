import { IsOptional, IsString } from 'class-validator';

export class UpdateGhostStoryDTO {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	summary?: string;

	@IsOptional()
	@IsString()
	mediumToEnter?: string;

	@IsOptional()
	@IsString()
	description?: string;
}

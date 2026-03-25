import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GhostClass } from '../enums/ghost-stories.enum';

export class CreateGhostStoryDTO {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsEnum(GhostClass)
	class: GhostClass;

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

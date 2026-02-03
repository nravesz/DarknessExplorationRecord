import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GhostClass } from '../enums/ghost-stories.enum';

export class CreateGhostStoryDTO {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsEnum(GhostClass)
	class: GhostClass;
}

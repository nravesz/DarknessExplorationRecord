import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { GhostClass } from 'src/ghost-stories/enums/ghost-stories.enum';

export class CreateRecordDTO {
	@IsNotEmpty()
	@IsEnum(GhostClass)
	class: GhostClass;

	@IsNotEmpty()
	@IsNumber()
	storyId: number;

	@IsOptional()
	@IsString()
	notes?: string;
}

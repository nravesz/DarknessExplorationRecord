import { IsOptional, IsString } from 'class-validator';

export class UpdateRecordDTO {
	@IsOptional()
	@IsString()
	notes?: string;
}

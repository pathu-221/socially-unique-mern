import { Type } from "class-transformer";
import { IsBoolean, IsObject, IsString, ValidateNested } from "class-validator";

export class UpdatePostsDto {
	@IsString()
	content: string;

	@IsString()
	published: string
}

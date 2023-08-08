import { Type } from "class-transformer";
import { IsBoolean, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class UpdatePostsDto {
	@IsString()
	content: string;

	@IsString()
	published: string

	@IsString()
	picture: string
}

export class CommentDto {
	@IsString()
	text: string 

	@IsOptional()
	parentComment: string
	
}

export class UpdateCommentDto {
	@IsString()
	text: string
}

import { Type } from "class-transformer";
import {
	IsArray,
	IsBoolean,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator";

export class UpdatePostsDto {
	@IsString()
	content: string;

	@IsString()
	published: string;

	@IsString()
	@IsArray()
	@IsOptional()
	picture?: string[];
}

export class CommentDto {
	@IsString()
	text: string;

	@IsOptional()
	parentComment: string;
}

export class UpdateCommentDto {
	@IsString()
	text: string;
}

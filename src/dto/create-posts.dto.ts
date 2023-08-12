import { IsBoolean, IsOptional, IsString } from "class-validator";
import exp from "constants";


export class CreatePostsDto {
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    content?: string

    @IsOptional()
    @IsString() 
    published?: string
    
}

import { IsOptional, IsString } from "class-validator";
import exp from "constants";


export class CreatePostsDto {
    @IsString()
    title: string
    
}
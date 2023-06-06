
import { IsBoolean, IsString } from "class-validator"


export class UpdatePostsDto {
    @IsString()
    content: string

    @IsBoolean()
    published: boolean
}
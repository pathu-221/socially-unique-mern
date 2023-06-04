import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    @IsOptional()
    photoUrl: string
}
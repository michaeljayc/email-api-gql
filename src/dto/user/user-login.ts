import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, Max, Min } from "class-validator";

@InputType()
export class UserLoginInput {

    @Field()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    password!: string;
}
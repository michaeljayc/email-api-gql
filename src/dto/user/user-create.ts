import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsHash, IsNotEmpty, IsString, Length } from "class-validator";
import { setDateTime } from "src/common/common.functions";
import { UserRoleCreateInput } from "./user-role-input";

@InputType()
export class CreateUser {

    @Field()
    @IsNotEmpty()
    @IsString()
    first_name!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    last_name!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    birthdate!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    gender!: string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email!: string;


    @Field()
    @IsNotEmpty()
    @IsString()
    @Length(8,15,{message:"Minimum length is 8. Max length is 15"})
    username!: string;

    @Field()
    @IsNotEmpty()
    @IsHash('aes-256-ctr')
    password!: string;

    @Field(type => UserRoleCreateInput, {nullable:true})
    role?: UserRoleCreateInput;

    @Field({defaultValue: setDateTime()})
    @IsNotEmpty()
    @IsString()
    created_date!: String;

    @Field({defaultValue: setDateTime()})
    @IsNotEmpty()
    @IsString()
    updated_date!: String;

}
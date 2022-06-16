import { Field, ObjectType, } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsEmail, IsDate, IsOptional, IsArray, ValidateNested, MaxLength, Length, IsUUID, MinLength, IsHash } from "class-validator";
import { setDateTime } from "src/common/common.functions";
import { Role } from "../role/role.dto";

@ObjectType()
export class User {

    @Field()
    @IsUUID()
    @IsNotEmpty()
    id!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(2,{message:"Minimum length is 2"})
    first_name!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(2,{message:"Minimum length is 2"})
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

    @Field({nullable: true})
    @IsNotEmpty()
    @IsHash('aes-256-ctr')
    password?: string;

    @Field(type => Role)
    role!: Role;

    @Field()
    @IsNotEmpty()
    @IsString()
    created_date!: String;

    @Field()
    @IsNotEmpty()
    @IsString()
    updated_date!: String;
}
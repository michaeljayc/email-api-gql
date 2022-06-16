import { Field, InputType, Int } from "@nestjs/graphql";
import { IsUUID, IsString, IsEmail, IsHash } from "class-validator";
import { UserRoleSearchInput } from "./user-role-input";

@InputType()
export class UserSearch {

    @Field({nullable: true})
    @IsUUID()
    id!: string;

    @Field({nullable: true})
    @IsString()
    first_name!: string;

    @Field({nullable: true})
    @IsString()
    last_name!: string;

    @Field({nullable: true})
    @IsString()
    birthdate!: string;

    @Field({nullable: true})
    @IsString()
    gender!: string;

    @Field({nullable: true})
    @IsEmail()
    email!: string;

    @Field({nullable: true})
    @IsString()
    username!: string;

    @Field({nullable: true})
    @IsHash('aes-256-ctr')
    password!: string;

    @Field(type => UserRoleSearchInput, {nullable:true})
    role!: UserRoleSearchInput;

    @Field({nullable: true})
    @IsString()
    created_date!: String;

    @Field({nullable: true})
    @IsString()
    updated_date!: String;
}
import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsEmail, IsHash, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { setDateTime } from "src/common/common.functions";
import { UserRoleCreateInput } from "./user-role-input";

@InputType()
export class UpdateUser {

    constructor() {
        this.first_name;
        this.last_name;
        this.email;
        this.updated_date = setDateTime();
    }

    @Field({nullable:true})
    @IsOptional()
    @IsString()
    first_name?: string;

    @Field({nullable:true})
    @IsString()
    last_name?: string;

    @Field({nullable:true})
    @IsString()
    birthdate?: string;

    @Field({nullable:true})
    @IsString()
    gender?: string;

    @Field({nullable:true})
    @IsString()
    @Length(8,15,{message:"Minimum length is 8. Max length is 15"})
    username?: string;

    @Field({nullable:true})
    @IsHash('aes-256-ctr')
    password?: string;

    @Field(type => UserRoleCreateInput, {nullable:true})
    role?: UserRoleCreateInput;


    @Field({nullable:true})
    @IsEmail()
    email?: string;

    @Field({nullable:true})
    @IsString()
    updated_date!: string;

}

export default UpdateUser
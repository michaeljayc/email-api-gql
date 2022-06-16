import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class UserRoleCreateInput {

    @Field()
    @IsUUID()
    id!: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    role_name!: string;

    @Field(() => Int)
    @IsNotEmpty()
    @IsInt()
    role_type!: number;

}

@InputType()
export class UserRoleSearchInput {
    @Field({nullable:true})
    @IsUUID()
    id!: string;

    @Field({nullable:true})
    @IsNotEmpty()
    @IsString()
    role_name!: string;

    @Field(() => Int,{nullable:true})
    @IsNotEmpty()
    @IsInt()
    role_type!: number;
}


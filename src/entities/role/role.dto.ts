import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsUUID, IsNotEmpty, IsString, IsInt } from "class-validator";

@ObjectType()
export class Role {

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
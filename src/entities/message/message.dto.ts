import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { MessageReference } from "./message-reference.dto";

@ObjectType()
export class Message {

    @Field()
    @IsUUID()
    @IsNotEmpty()
    id!: string;

    @Field({nullable:true})
    @IsUUID()
    message_origin_id?: string;

    @Field({nullable:true})
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message:"Subject is too short." })
    @MaxLength(50, { message: "Subject is too long." })
    subject?: string;

    @Field({nullable:true})
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message:"Subject is too short." })
    message?: string;

    @Field(type => MessageReference, {nullable: true})
    sender?: MessageReference

    @Field(type => MessageReference, {nullable: true})
    recipient?: MessageReference

    @Field()
    @IsString()
    @IsNotEmpty()
    status!: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    created_date!: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    updated_date!: string;
}
import { Field, InputType } from "@nestjs/graphql";
import { IsUUID, IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";
import { MessageRecipientInput, MessageReference, MessageSenderInput } from "src/entities/message/message-reference.dto";

@InputType()
export class MessageSearchInput {

    @Field({nullable:true})
    @IsUUID()
    id?: string;

    @Field({nullable:true})
    @IsUUID()
    message_origin_id?: string;

    @Field({nullable:true})
    @IsString()
    subject?: string;

    @Field({nullable:true})
    @IsString()
    message?: string;

    @Field(type => MessageSenderInput, {nullable:true})
    sender?: MessageReference

    @Field(type => MessageRecipientInput, {nullable:true})
    recipient?: MessageReference

    @Field({nullable:true})
    @IsString()
    status?: string;

    @Field({nullable:true})
    @IsString()
    created_date?: string;

    @Field({nullable:true})
    @IsString()
    updated_date?: string;
}
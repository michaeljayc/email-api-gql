import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { isNullableType } from "graphql";
import { setDateTime } from "src/common/common.functions";
import { MessageRecipientInput, MessageSenderInput } from "src/entities/message/message-reference.dto";

@InputType()
export class MessageInput {

    @Field({nullable:true, defaultValue: ""})
    @IsUUID()
    message_origin_id?: string;

    @Field({nullable: true})
    @IsString()
    @MinLength(3, { message:"Subject is too short." })
    @MaxLength(50, { message: "Subject is too long." })
    subject?: string;

    @Field({nullable: true})
    @IsString()
    @MinLength(3, { message:"Subject is too short." })
    message?: string;

    @Field(type => MessageSenderInput, {nullable:true})
    sender?: MessageSenderInput

    @Field(type => MessageRecipientInput, {nullable: true})
    recipient?: MessageRecipientInput

    @Field({nullable: true, defaultValue: ""})
    @IsString()
    status?: string;

    @Field({nullable:true, defaultValue: setDateTime()})
    @IsString()
    created_date?: string;

    @Field({nullable:true, defaultValue: setDateTime()})
    @IsString()
    updated_date?: string;
}
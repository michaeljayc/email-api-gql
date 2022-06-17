import { Field, InputType, Int } from "@nestjs/graphql";
import { IsUUID, IsNotEmpty, IsString, IsInt, IsOptional, IsIn } from "class-validator";
import { MessageRecipientInput, MessageSenderInput } from "src/entities/message/message-reference.dto";
import { MESSAGE_MENUS } from "src/entities/message/message.common";

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
    sender?: MessageSenderInput

    @Field(type => MessageRecipientInput, {nullable:true})
    recipient?: MessageRecipientInput

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

@InputType()
export class MessagesFilters {
    
    @Field(type => Int, {nullable:true, defaultValue: 1})
    page?: number;

    @Field(type => MessageSearchInput, {nullable:true,defaultValue: ""})
    filter?: MessageSearchInput;
}


@InputType()
export class MenuFilteredMessages {

    @Field(type => Int, {nullable:true, defaultValue: 1})
    @IsInt({message: "page must be a whole number."})
    page?: number;

    @Field({defaultValue: "inbox", nullable:true})
    @IsIn(MESSAGE_MENUS.map( value => {
        return value
    }))
    @IsString({message: ""})
    menu?: string;
}

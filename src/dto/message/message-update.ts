import { Field, InputType } from "@nestjs/graphql";
import { IsUUID, IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { setDateTime } from "src/common/common.functions";
import { MessageRecipientInput } from "src/entities/message/message-reference.dto";

@InputType()
export class UpdateMessageInput {

    @Field({defaultValue: "", nullable:true})
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

    @Field(type => MessageRecipientInput, {nullable: true})
    recipient?: MessageRecipientInput

    @Field({defaultValue: "draft", nullable: true})
    @IsString()
    status?: string;

    @Field({defaultValue: setDateTime(), nullable:true})
    @IsString()
    updated_date!: string;
}
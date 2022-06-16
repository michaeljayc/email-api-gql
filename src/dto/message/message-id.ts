import { Args, ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsUUID } from "class-validator";

@InputType()
export class MessageId {

    @Field({nullable: true})
    @IsUUID()
    id?: string;
}
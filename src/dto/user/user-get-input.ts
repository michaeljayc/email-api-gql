import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsString, IsUUID } from "class-validator";

@ArgsType()
export class GetUserId {

    @Field()
    @IsString()
    id!: string;
}

@InputType()
export class UserIdInput {

    @Field()
    @IsUUID()
    id!: string;
}


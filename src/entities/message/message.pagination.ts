import { ObjectType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsBoolean, IsString } from "class-validator";
import { IPaginationResponse } from "src/interfaces/pagination";
import { User } from "../user/user.dto";
import { Message } from "./message.dto";

@ObjectType()
export class MessagePaginationResponse implements IPaginationResponse {
    @Field(type => Int)
    @IsNotEmpty()
    total_pages!: number;
    
    @Field(type => Int)
    @IsNotEmpty()
    current_page!: number;
    
    @Field(type => Int)
    @IsNotEmpty()
    previous_page!: number;
    
    @Field(type => Int)
    @IsNotEmpty()
    next_page!: number;
    
    @Field(type => Int)
    @IsNotEmpty()
    per_page!: number;
    
    @Field(type => [Message], {nullable:true})
    page_lists!: Message[]
    
    @Field(type => Int)
    @IsNotEmpty()
    total_results!: number;
}

@ObjectType()
export class MessageResponseFormat {

    @Field(type => MessagePaginationResponse, {nullable:true})
    datas?: MessagePaginationResponse;

    @Field()
    @IsBoolean()
    success!: boolean;

    @Field()
    @IsString()
    message!: string;
}
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsBoolean, IsString, IsObject } from "class-validator";
import { truncate } from "fs";
import { IPaginationResponse } from "src/interfaces/pagination";
import { User } from "./user.dto";

@ObjectType()
export class UserPaginationResponse implements IPaginationResponse {
    @Field(type => Int)
    @IsNotEmpty()
    total_pages!: number;
    
    @Field(type => Int, {nullable:true})
    current_page?: number;
    
    @Field(type => Int)
    @IsNotEmpty()
    previous_page!: number;
    
    @Field(type => Int)
    @IsNotEmpty()
    next_page!: number;
    
    @Field(type => Int)
    @IsNotEmpty()
    per_page!: number;
    
    @Field(type => [User],{nullable: true})
    page_lists?: User[];
    
    @Field(type => Int)
    @IsNotEmpty()
    total_results!: number;
}

@ObjectType()
export class UserResponseFormat {
    @Field(type => UserPaginationResponse, {nullable: true})
    datas?: any;

    @Field()
    @IsBoolean()
    success!: boolean;

    @Field()
    @IsString()
    message!: string;
}

export const formatUserResponse = async (message?: string, data?: any, success?: boolean) 
    : Promise<UserResponseFormat | any> => {

        let datas = data ?? [];

        return {
            datas,
            success: success ?? false,
            message: message ?? "Failed"
        }
        
}

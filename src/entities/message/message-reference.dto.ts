import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@ObjectType()
export class MessageReference {

    @Field({nullable:true})
    @IsEmail()
    @IsNotEmpty()
    email?: string;  

    @Field({nullable:true})
    @IsString()
    @IsNotEmpty()
    menu?: string;
}

@InputType()
export class MessageSenderInput {
    
    @Field({nullable:true})
    @IsEmail()
    @IsNotEmpty()
    email?: string;  

    @Field({defaultValue: "", nullable:true})
    @IsString()
    @IsNotEmpty()
    menu?: string;
}

@InputType()
export class MessageRecipientInput {
    
    @Field({ nullable:true})
    @IsEmail()
    @IsNotEmpty()
    email?: string;  

    @Field({defaultValue: "", nullable:true})
    @IsString()
    @IsNotEmpty()
    menu?: string;
}
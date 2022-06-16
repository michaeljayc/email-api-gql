import { Resolver, Query, Args, Mutation, Context } from "@nestjs/graphql";
import { MessageResponseFormat } from "./message.pagination";
import { formatMessageResponse, RECIPIENT_MENU } from "./message.common";
import { MessageInput } from "src/dto/message/message-input";
import { MessageId } from "src/dto/message/message-id";
import { Message } from "./message.dto";
import { MessageService } from "./message.service";
import { PaginationService } from "src/common/pagination/pagination.service";
import { UpdateMessageInput } from "src/dto/message/message-update";
import Ctx from "src/interfaces/context.interface";
import { BadRequestException, Logger, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "src/guards/auth.guard.ts/auth-guard.guard";
import { setDateTime } from "src/common/common.functions";

@Resolver(of => Message)
export class MessageResolver {

    constructor(private messageService: MessageService,
        private paginationService: PaginationService,
        private jwtService: JwtService){}

    @UseGuards(AuthGuard)
    @Query(() => MessageResponseFormat, {name: "Message"})
    async getMessage(@Context() ctx: Ctx,
        @Args('messageId') messageId: MessageId)
        : Promise<MessageResponseFormat | any> {

            try {
                // get logged_in user data
                const current_user = await this
                .jwtService
                .verifyAsync(ctx.req.cookies["jwt"])


                let data = await this.messageService.getMessage(messageId)
                
                // check if message exists
                if (!data) 
                    throw new BadRequestException("ID does not exist.");

                // if ID exists and menu is in RECIPIENT_MENU or status is not read
                // mark as read
                const updated_data = data;
                const recipient_menu = updated_data.recipient?.menu ?? "";
                const message_status = updated_data.status;
                if (RECIPIENT_MENU.includes(recipient_menu) && message_status === "") {
                    const updated_data = ({
                        ...data,
                        status: "read",
                        updated_date: setDateTime()
                    });
                    data = await this
                        .messageService
                        .updateDraftMessage(messageId, updated_data)
                }

                return formatMessageResponse("Success",
                    await this.paginationService.pagination([data]),
                    true
                );
            } catch (error) {
                Logger.error(error)
            }
    }

    @UseGuards(AuthGuard)
    @Query(() => MessageResponseFormat, {name: "Messages"})
        async getAllMessages(@Context() ctx: Ctx,
        @Args('page') page: number)
        : Promise<MessageResponseFormat | any> {

            try {
                // get logged_in user data
                const current_user = await this
                    .jwtService
                    .verifyAsync(ctx.req.cookies["jwt"])

                // set page number
                const page_number = page === 0 || !page ? 1 : page;
                
                const query = ({
                    recipient: {
                        email: current_user.email,
                        menu: "inbox"
                    }
                });   

                const data = await this
                    .messageService
                    .getAllMessages(query);
                
                return await formatMessageResponse(`${data.length} record/s found`,
                    await this.paginationService.pagination(data,page_number),
                    true
                );
            } catch (error) {
                Logger.error(error)
            }
    }

    @UseGuards(AuthGuard)
    @Mutation(() => MessageResponseFormat, {name: "SendMessage"})
    async sendMessage(@Context() ctx: Ctx, 
        @Args('messageInput') messageInput: MessageInput,
        @Args("messageId") messageId: MessageId)
        : Promise<MessageResponseFormat | any> {

            try {
                let response: any;
                let query: MessageInput;
                let existing_message: Message;
                // get logged_in user data
                const current_user = await this
                    .jwtService
                    .verifyAsync(ctx.req.cookies["jwt"])

                // check if message is new or existing
                if (Object.keys(messageId).length) {
                    existing_message = await this
                        .messageService
                        .getMessage(messageId);

                    if (!existing_message)
                        throw new BadRequestException("Message does not exist.")

                    // query for existing message
                    query = ({
                        ...existing_message,
                        subject: messageInput.subject ||
                                    existing_message.subject, 
                        message: messageInput.message ||
                                    existing_message.message, 
                        sender: {
                            ...existing_message.sender,
                            menu: "sent"
                        },
                        recipient : {
                            email: messageInput.recipient?.email ||
                                    existing_message.recipient?.email,
                            menu: "inbox"
                        },
                        status: "",
                        updated_date: setDateTime()
                    }) 
                } 

                // query for new message
                query = ({
                    ...messageInput,
                    recipient : {
                        ...messageInput.recipient,
                        menu: "inbox"
                    },
                    sender: {
                        email: current_user.email,
                        menu: "sent"
                    }
                })

                response = await this.messageService.sendMessage(query,messageId);
                return formatMessageResponse("Message sent successfully.",
                    await this.paginationService.pagination([response]),
                    true
                )
            } catch (error) {
                Logger.error(error)
            }
    }

    @UseGuards(AuthGuard)
    @Mutation(() => MessageResponseFormat, {name: "ReplyMessage"})
    async replyMessage(@Context() ctx: Ctx,
        @Args('messageId') messageId: MessageId,
        @Args('messageInput') messageInput: MessageInput)
        : Promise<MessageResponseFormat | any> {

            try {   
                // get logged_in user data
                const current_user = await this
                    .jwtService
                    .verifyAsync(ctx.req.cookies["jwt"])
                
                // check if message exists
                const data = await this.messageService.getMessage(messageId);
                if (!data)
                    throw new BadRequestException("Message does not exist.")
                
                // update message data
                const query = ({
                    ...messageInput,
                    subject: data.message_origin_id ? 
                        data.subject : 
                        `RE: ${data.subject}`,
                    message_origin_id: data.message_origin_id ?? data.id,
                    sender: {
                        email: current_user.email,
                        menu: "sent"
                    },
                    recipient: {
                        email: data.sender?.email,
                        menu: "inbox"
                    }
                })
                
                const response = await this
                    .messageService
                    .sendMessage(query, messageId);
                return formatMessageResponse("Reply sent.",
                    await this.paginationService.pagination([response]),
                    true
                )
            } catch (error) {
                Logger.error(error)
            }

    }

    @UseGuards(AuthGuard)
    @Mutation(() => MessageResponseFormat, {name: "SaveAsDraft"})
    async saveAsDraft(@Context() ctx: Ctx,
        @Args('messageInput') messageInput: MessageInput)
        : Promise<MessageResponseFormat | any> {

            try {
                // get logged_in user data
                const current_user = await this
                    .jwtService
                    .verifyAsync(ctx.req.cookies["jwt"])

                // edit message details
                const query = ({
                    ...messageInput,
                    sender: {
                        email: current_user.email,
                        menu: "draft"
                    },
                    recipient: {
                    ...(messageInput.recipient ? messageInput.recipient :{
                        email: "",
                        menu: ""
                    })
                    },
                    status: "draft"
                })
    
                const data = await this.messageService.sendMessage(query);

                return formatMessageResponse("Message saved as draft",
                    await this.paginationService.pagination([data]),
                    true
                )
            } catch (error) {
                Logger.error(error);
            }
    }

    @UseGuards(AuthGuard)
    @Mutation(() => MessageResponseFormat, {name: "UpdateDraftMessage"})
    async updateDraftMessage(@Context() ctx: Ctx,
        @Args('messageId') messageId: MessageId,
        @Args('updateMessageInput') updateMessageInput: UpdateMessageInput)
            : Promise<MessageResponseFormat | any> {

                try {
                    // get logged_in user data
                    const current_user = await this
                        .jwtService
                        .verifyAsync(ctx.req.cookies["jwt"])
                    
                    // check if ID exists
                    const existing_message = await this
                        .messageService
                        .getMessage(messageId)
                    
                    if (!existing_message)
                        throw new BadRequestException("Message does not exist.");

                    // update message details
                    const query = ({
                        ...existing_message,
                        subject: existing_message.subject ??
                                 updateMessageInput.subject,
                        message: existing_message.message ??
                                 updateMessageInput.message,
                        recipient: {
                            ...existing_message.recipient,
                            email: existing_message.recipient?.email ||
                                   updateMessageInput.recipient?.email
                        },
                        updated_date: setDateTime()
                    })

                    const data = await this
                        .messageService
                        .updateDraftMessage(messageId, query);
                    return await formatMessageResponse("Message successfully updated.",
                        await this.paginationService.pagination([data]),
                        true
                    );
                    
                } catch (error) {
                    Logger.error(error)
                }
    }

    @UseGuards(AuthGuard)
    @Mutation(() => MessageResponseFormat, {name:"DeleteMessage"})
    async deleteMessage(@Args("messageId") messageId: MessageId)
        : Promise<MessageResponseFormat | any> {

            try {
                // check if ID exists
                const isExists = await this.messageService.getMessage(messageId);

                if (!isExists)
                    throw new BadRequestException("Message does not exist.");

                const data = await this.messageService.deleteMessage(messageId);
                
                return formatMessageResponse("Message successfully deleted.",
                    await this.paginationService.pagination([data]),
                    true
                );
            } catch (error) {
                Logger.error(error)
            }
    }

}
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { MessageId } from "src/dto/message/message-id";
import { MessageSearchInput } from "src/dto/message/message-search";
import { MessageInput } from "src/dto/message/message-input";
import { UpdateMessageInput } from "src/dto/message/message-update";
import { Message } from "./message.dto";

const {DB="", TABLE="messages"} = process.env;

@Injectable()
export class MessageService {

    constructor(private databaseService: DatabaseService){}

    async getMessage(messageId: MessageId): Promise<Message> {
        return this.databaseService.getById(DB, TABLE, messageId.id ?? "");
    }

    async getAllMessages(messageSearchInput: MessageSearchInput): Promise<Message[]> {
        const data = await this
            .databaseService
            .getByFilter(DB, TABLE, messageSearchInput)
        return data;
    }

    async sendMessage(messageInput?: MessageInput, messageId?: MessageId): Promise<Message> {
        let data: any;

        if (messageId)
            data = await this
                .databaseService
                .updateRecord(DB, TABLE, messageId.id ?? "", messageInput)
        else       
            data = await this
                .databaseService
                .insertRecord(DB, TABLE, messageInput)

        return data.changes[0].new_val;
    }

    async updateDraftMessage(messageId: MessageId, 
        updateMessageInput: UpdateMessageInput)
            : Promise<Message> {
                
                let data = await this
                    .databaseService
                    .updateRecord(DB, TABLE, messageId.id ?? "", updateMessageInput); 

                return data.changes[0].new_val;
    }

    async deleteMessage(messageId: MessageId): Promise<Message> {
        let data = await this
            .databaseService
            .deleteRecord(DB, TABLE, messageId.id ?? "")
        
        return data.changes[0].old_val;
    }

    async getByFilter(query: any): Promise<Message> {
        return await this.databaseService.getByFilter(DB, TABLE, query);
    }
}
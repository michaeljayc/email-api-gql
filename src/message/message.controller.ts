import { Controller, Get } from '@nestjs/common';
import { MessageDTO } from './message.dto';
import MessageService from './message.service';

@Controller()
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  async getAllMessages(): Promise<MessageDTO | any> {
    return;
  }
}

export default MessageController;

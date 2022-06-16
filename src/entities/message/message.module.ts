import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PaginationModule } from "src/common/pagination/pagination.module";
import { PaginationService } from "src/common/pagination/pagination.service";
import { DatabaseModule } from "src/database/database.module";
import { AuthGuardModule } from "src/guards/auth.guard.ts/auth-guard.module";
import { AuthGuardService } from "src/guards/auth.guard.ts/auth-guard.service";
import { MessageResolver } from "./message.resolver";
import { MessageService } from "./message.service";

const {SECRET_KEY} = process.env;

@Module({
    imports: [DatabaseModule, 
        PaginationModule,
        JwtModule.register({
            secret: SECRET_KEY,
            signOptions: {expiresIn: '1d'}
        }),
        AuthGuardModule],
    providers: [MessageService, 
        MessageResolver, 
        PaginationService,
        AuthGuardService],
    exports: []
})

export class MessageModule {}
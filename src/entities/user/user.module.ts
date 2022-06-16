import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { PaginationService } from "src/common/pagination/pagination.service";
import { DatabaseModule } from "src/database/database.module";
import { AuthGuardModule } from "src/guards/auth.guard.ts/auth-guard.module";
import { AuthGuardService } from "src/guards/auth.guard.ts/auth-guard.service";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

const {SECRET_KEY} = process.env;

@Module({
    imports: [DatabaseModule,
        AuthModule,
        JwtModule.register({
            secret: SECRET_KEY,
            signOptions: {expiresIn: '1d'}
        }),
        AuthGuardModule],
    controllers: [],
    providers: [UserResolver, 
        UserService, 
        PaginationService, 
        AuthService,
        AuthGuardService],
    exports: [UserService]
})

export class UserModule{}
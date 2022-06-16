import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { PaginationModule } from "src/common/pagination/pagination.module";
import { PaginationService } from "src/common/pagination/pagination.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuardService } from "src/guards/auth.guard.ts/auth-guard.service";
import { UserModule } from "src/entities/user/user.module";

const {SECRET_KEY} = process.env;

@Module({
    imports: [DatabaseModule,
        JwtModule.register({
        secret: SECRET_KEY,
        signOptions: {expiresIn: '1d'}
    }),
    PaginationModule,
    forwardRef( () => UserModule)],
    providers: [AuthService, 
        AuthResolver, 
        PaginationService, 
        AuthGuardService,],
    exports: [AuthGuardService]
})

export class AuthModule {}
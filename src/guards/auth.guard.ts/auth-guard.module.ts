import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth-guard.guard";
import { AuthGuardService } from "./auth-guard.service";

const {SECRET_KEY} =  process.env;

Module({
    imports: [ JwtModule.register({
        secret: SECRET_KEY,
        signOptions: {expiresIn: '1d'}
    }),],
    providers: [AuthGuard, AuthGuardService],
    exports: [AuthGuardService]
})

export class AuthGuardModule {}
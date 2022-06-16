import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuardService } from "./auth-guard.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authGuardService: AuthGuardService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {
            //Get cookie
            const cookie = GqlExecutionContext.create(context).getContext().req.cookies["jwt"];
            
            if (!cookie) 
                throw new UnauthorizedException("You need to login.");

            return await this.authGuardService.getContextData(cookie);
        } catch (error) {
            throw new UnauthorizedException("You need to login.");
        }
    }

}
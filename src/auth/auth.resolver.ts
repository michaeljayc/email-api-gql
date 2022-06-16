import { Args, Resolver, Query, Context } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UserLoginInput } from "src/dto/user/user-login";
import { formatUserResponse, UserResponseFormat } from "src/entities/user/user.pagination";
import Ctx  from "src/interfaces/context.interface";
import { Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PaginationService } from "src/common/pagination/pagination.service";

@Resolver()
export class AuthResolver {

    constructor(private authService: AuthService,
        private jwtService: JwtService,
        private paginationService: PaginationService){}

    @Query(() => UserResponseFormat, {name: "Login"})
    async login(@Args('userLoginInput') userLoginInput: UserLoginInput,
        @Context() ctx: Ctx)
        : Promise<UserResponseFormat | any> {
                
            const {email, password} = userLoginInput;

            try {
                 // check if already logged in
                if (ctx.req.cookies["jwt"])
                    return formatUserResponse("You are currently logged in.")

                // validate and retrieve user data
                const user = await this.authService.validate(email, password);
                
                if (!user) 
                    return formatUserResponse("Incorrect username or password")

                // create a JWT
                const jwt = await this.jwtService.signAsync({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                });
                
                // Set JWT in a cookie
                ctx.res.cookie("jwt", jwt);
            
                return formatUserResponse("Login successful.", await this
                    .paginationService
                    .pagination([user]), true); 
        } catch (error) {
            Logger.error(error)
        }
    }

    @Query(() => UserResponseFormat, {name: "Logout"})
    async logout(@Context() ctx: Ctx): Promise<UserResponseFormat | any> {

        try {
            // check if logged out
            if (!ctx.req.cookies["jwt"])
                return formatUserResponse("You are currently logged out.",null)

            // clear cookie
            ctx.res.clearCookie("jwt")

            return formatUserResponse("Logout successuful",null,true)
        } catch (error) {
            Logger.error(error)   
        }
    }
}
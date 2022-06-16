import { Args, Resolver, Query, Mutation, Context } from "@nestjs/graphql";
import { UserIdInput } from "../../dto/user/user-get-input";
import { User } from "./user.dto";
import { UserService } from "./user.service";
import { UpdateUser } from "../../dto/user/user-update";
import { UserSearch } from "src/dto/user/user-search";
import { CreateUser } from "src/dto/user/user-create";
import { UserRoleCreateInput } from "src/dto/user/user-role-input";
import { UserResponseFormat, formatUserResponse  } from "./user.pagination"
import { PaginationService } from "src/common/pagination/pagination.service";
import { BadRequestException, Body, Logger, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthGuard } from "src/guards/auth.guard.ts/auth-guard.guard";
import Ctx from "src/interfaces/context.interface";
import { JwtService } from "@nestjs/jwt";

@Resolver(of => User)
export class UserResolver {

    constructor(private authService: AuthService,
        private userService: UserService,
        private paginationService: PaginationService,
        private jwtService: JwtService){}

    @UseGuards(AuthGuard)
    @Query(() => UserResponseFormat, {name: "User"})
    async getUser(@Context() ctx: Ctx,
        @Args('userIdInput') userIdInput: UserIdInput)
        : Promise<UserResponseFormat | any> {
        
            try {
                // get logged_in user data
                const current_user = await this
                    .jwtService
                    .verifyAsync(ctx.req.cookies["jwt"])

                // retrieve data
                const data = await this.userService.getUser(userIdInput.id);

                if (!data)
                    throw new BadRequestException("ID does not exist");

                //paginate data
                const paginated_data = await this
                    .paginationService
                    .pagination([data])
                
                return formatUserResponse( "Success", 
                    paginated_data,
                    true
                )
            } catch (error) {
                Logger.error(error);
            }
    }

    @UseGuards(AuthGuard)
    @Query(() => UserResponseFormat, {name: "Users"})
    async getAllUsers(@Context() ctx: Ctx, 
        @Args('param') param: UserSearch,
        @Args('page') page?: number): Promise<UserResponseFormat | any> {

            try {
                // get logged_in user data
                const current_user = await this
                    .jwtService
                    .verifyAsync(ctx.req.cookies["jwt"])

                // set page number
                const page_number = page === 0 || !page ? 1 : page;

                // retrieve data
                let data = await this.userService.getAllUsers(param);

                if (!data)
                    throw new BadRequestException()
               
                // paginate data and format response
                const response: UserResponseFormat = await this
                    .paginationService
                    .pagination(data, page_number)
                    .then( result => {
                        return formatUserResponse("Success", 
                        result,
                        true)
                    })

                return response;
            } catch (error)  {
                Logger.error(error)
            }
    }

    @UseGuards(AuthGuard)
    @Mutation(() => UserResponseFormat)
    async createUser(@Context() ctx: Ctx, 
        @Args('newUser') newUser: CreateUser,
        @Args('newUserRole') newUserRole: UserRoleCreateInput)
        : Promise<UserResponseFormat | any> {

            try {
                // encrypt password
                const hashed_password = await this
                    .authService
                    .encryptPassword(newUser.password);

                // replace password with encrypted password
                const updated_user = ({
                    ...newUser,
                    password: hashed_password
                })

                // create new user
                const data = await this
                    .userService
                    .createUser(updated_user, newUserRole);
            
                return formatUserResponse("User successfully created.",
                    await this.paginationService.pagination([data]),
                    true
                );
            } catch (error) {
                Logger.warn(error)
            }
    }

    @UseGuards(AuthGuard)
    @Mutation(() => UserResponseFormat)
    async updateUser(@Context() ctx: Ctx,
        @Args('userIdInput') userIdInput: UserIdInput,
        @Args('updateUser') updateUser: UpdateUser)
        : Promise<UserResponseFormat | any> {

            try {
                const data =  await this
                    .userService
                    .updateUser(userIdInput, updateUser);
                return formatUserResponse("User updated successfully.", 
                    await this.paginationService.pagination([data]), 
                    true
                )
            } catch (error) {
                Logger.error(error)
            }
    } 

    @UseGuards(AuthGuard)
    @Mutation(() => UserResponseFormat)
    async deleteUser(@Context() ctx: Ctx, 
        @Args('userIdInput') userIdInput: UserIdInput)
        : Promise<UserResponseFormat | any> {

            try {
                let data = await this.userService.deleteUser(userIdInput);
                if (!data)
                    throw new BadRequestException("ID does not exist.");
                    
                return formatUserResponse("User deleted successfully.", 
                    await this.paginationService.pagination([data]),
                    true
                )
            } catch (error) {
                Logger.error(error)
            }
    }
}
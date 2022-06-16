import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Context, GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user/user.dto";

const {SECRET_KEY=""} = process.env;

// export const CurrentUser =  createParamDecorator(
//     async (data, context: ExecutionContext): Promise<User | any> => {
//         const jwtService = new JwtService();
//         console.log(jwtServi)
//         const cookie = context.getArgByIndex(2).req.cookies["jwt"];
//         return await jwtService.verifyAsync(cookie);
//     }
// )


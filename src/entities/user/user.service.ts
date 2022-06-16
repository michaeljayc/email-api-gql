import { Injectable, Logger, Param } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { UserRoleCreateInput, UserRoleSearchInput } from "src/dto/user/user-role-input";
import { UserSearch } from "src/dto/user/user-search";
import { CreateUser } from "../../dto/user/user-create";
import { UserIdInput } from "../../dto/user/user-get-input";
import { UpdateUser } from "../../dto/user/user-update";
import { User } from "./user.dto";

const {DB="",TABLE="users"} = process.env;

@Injectable()
export class UserService {

    constructor(private databaseService: DatabaseService){}

    async getUser(id: string): Promise<User> {
        return this.databaseService.getById(DB, TABLE, id);
    }

    async getAllUsers(param: UserSearch): Promise<[User]> {
        return await this.databaseService.getByFilter(DB, TABLE, param)

    }

    async createUser(newUser: CreateUser, newUserRole: UserRoleCreateInput)
        : Promise<User> {
            newUser.role = newUserRole;
            let response =  await this
                .databaseService
                .insertRecord(DB, TABLE, newUser);
                
            return response.changes[0].new_val;
    }

    async updateUser(userIdInput: UserIdInput, updateUser: UpdateUser): Promise<any> {
       let updated = await this
            .databaseService
            .updateRecord(DB, TABLE, userIdInput.id, updateUser)
        
        return updated.changes[0].new_val;
    }

    async deleteUser(userIdInput: UserIdInput): Promise<User> {
        let deleted = await this
            .databaseService
            .deleteRecord(DB, TABLE, userIdInput.id);

        return deleted.changes[0].old_val
    }
}
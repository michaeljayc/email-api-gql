import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Role } from "./role.dto";

const {DB="", TABLE='roles'} = process.env; 

@Injectable()
export class RoleService {

    constructor(private databaseService: DatabaseService){}

    async getRole(id: string): Promise<Role> {
        return this.databaseService.getById(DB, TABLE, id);
    }

    async getAllRoles(): Promise<Role[]> {
        return this.databaseService.list(DB, TABLE);
    }
    
}
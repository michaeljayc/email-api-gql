import { Controller, Logger } from "@nestjs/common";
import { DatabaseService } from "./database/database.service";
import { initial_values } from "./initializer";

const {DB, TABLE} = process.env;
@Controller()
export class AppController {

    constructor(private databaseService: DatabaseService){}

    async onModuleInit() {
        Logger.log("Initializing...")
        const databases = await this.databaseService.listDatabase();
        if (!databases.includes(initial_values.db)) {
            try {
                await this.databaseService
                    .createDatabase(initial_values.db);
                Logger.log(`${initial_values.db} database created...`)
                await this.databaseService
                    .createTable(initial_values.db,initial_values.tables);
                Logger.log(`${initial_values.tables} tables created...`)
                await this.databaseService
                    .insertRecord(initial_values.db, 
                        initial_values.tables[(initial_values.tables.indexOf('roles'))], 
                        initial_values.roles);
                Logger.log(`Roles created...`)
                await this.databaseService
                    .insertRecord(initial_values.db, 
                        initial_values.tables[(initial_values.tables.indexOf('users'))], 
                        initial_values.users.super_admin);
                Logger.log(`Super Admin created...`)
            } catch (error) {
                Logger.log(error)
            }
        }
        Logger.log("Ready...");
    }
    
}
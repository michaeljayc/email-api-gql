import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { User } from "src/entities/user/user.dto";
const bcrypt = require('bcrypt');

const {DB="",TABLE="users", SECRET_KEY} = process.env;

@Injectable()
export class AuthService {

    constructor(private databaseService: DatabaseService){}

    async validate(email: string, password: string): Promise<User | null> {
        const data = await this.databaseService.getByFilter(DB, TABLE, {email});
        const user = data[0];

        if (!user || !(await this.comparePassword(password, user.password)))
            return null;

        return user;
    }

    async comparePassword(loginPassword: string, encrypytedPassword: string): Promise<boolean> {
        return await bcrypt.compare(loginPassword,encrypytedPassword);
    }

    async encryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(password, salt);
        return hashed_password;
    }
}


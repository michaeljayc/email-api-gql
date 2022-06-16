import { Request, Response } from "express"
import { Role } from "src/entities/role/role.dto";
import { User } from "src/entities/user/user.dto";

type Ctx = {
    req: Request & { user?: Pick<User,'id' | 'email' | 'username' | 'role'> };
    res: Response
}

export default Ctx;
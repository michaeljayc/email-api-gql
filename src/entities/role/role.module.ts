import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { RoleResolver } from "./role.resolver";
import { RoleService } from "./role.service";

@Module({
    imports: [DatabaseModule],
    providers: [RoleService, RoleResolver],
    exports: [RoleService]
})

export class RoleModule{}
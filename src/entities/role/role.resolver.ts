import { Resolver, Query, Args } from "@nestjs/graphql";
import { Role } from "./role.dto";
import { RoleService } from "./role.service";

@Resolver()
export class RoleResolver {

    constructor(private roleService: RoleService){}

    @Query(() => Role)
    async getRole(@Args('id') id: string): Promise<Role> {
        return await this.roleService.getRole(id);
    }

    @Query(() => [Role])
    async getAllRoles(): Promise<Role[]> {
        return await this.roleService.getAllRoles();
    }

    
}
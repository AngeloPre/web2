import { HttpResponse } from "@angular/common/http";
import { AccessToken } from "./access-token.model";
import { Client } from "./client.model";
import { Employee } from "./employee.model";
import { Role } from "@/app/core/store/user-role/user-role.store";

export class UserAuth {
    constructor(
        public accessToken: AccessToken,
        public userRole: Role,
        public client?: Client,
        public employee?: Employee
    ) { }
}

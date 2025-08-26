import { HttpResponse } from "@angular/common/http";
import { Address } from "./address.model";
import { Role } from "@/app/core/store/user-role/user-role.store";

export class Employee {
    constructor(
        public id: string,
        public cpf: string,
        public name: string,
        public email: string,
        public role: Role,
        public address: Address,
        public birthday: Date
    ) { }
}

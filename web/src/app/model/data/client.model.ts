import { Role } from "@/app/core/store/user-role/user-role.store";
import { Address } from "./address.model";

export class Client {
  constructor(
    public id: string,
    public cpf: string,
    public name: string,
    public email: string,
    public phone: string,
    public role: Role,
    public address: Address,
  ) { }
}
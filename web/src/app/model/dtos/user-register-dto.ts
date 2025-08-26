import { AddressDto } from "./address-dto";

export class UserRegisterDto {
    constructor(
        public cpf: string,
        public name: string,
        public email: string,
        public phone: string,
        public addressDto: AddressDto,
    ) { }
} 
export class AddressDto {
    constructor(
        public zipCode: string,
        public state: string,
        public city: string,
        public neighborhood: string,
        public street: string,
        public number: string,
        public complement?: string
    ) { }
}
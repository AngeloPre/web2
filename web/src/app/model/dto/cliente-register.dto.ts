export interface ClienteRegisterDTO {
    nome: string;
    cpf: string; 
    email: string;
    telefone: string;
    cep: string; 
    logradouro: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    numero: string;
}
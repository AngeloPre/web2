## JSON para testar POSTS:

POST /auth/register -> inserir cliente

{
  "nome": "Beiraldo da Silva Romuldo",
  "cpf": "33344455566",
  "email": "inseriremail@parareceberasenha.com",
  "telefone": "21966554433",
  "endereco": {
    "cep": "81520-260",
    "logradouro": " R. Dr. Alcides Vieira Arcoverde",
    "numero": "1225",
    "complemento": "SEPT",
    "bairro": "Jardim das Américas",
    "cidade": "Curitiba",
    "uf": "PR"
  }
}

POST /funcionario -> inserir funcionario
{
  "nome": "Funcionario Silva",
  "email": "funcionario.teste@empresa.com",
  "senha": "umaSenhaQualquer123",
  "dataNascimento": "1995-10-20"
}


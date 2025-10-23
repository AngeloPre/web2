## JSON para testar POST (autocadastro) do CLIENTE:

POST /auth/register -> inserir cliente

{
  "nome": "Beiraldo da Silva Romuldo",
  "cpf": "33344455566",
  "email": "emailparaweb2@gmail.com",
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




## JSON para testar login funcionario

Esse é o funcionario criado pelo seed service

POST /auth/login -> realizar login

{
    "email": "admino@admin.com",
    "senha": "1234"
}

Depois de fazer o login, basta copiar o token do response body e inserir no começo da pagina do swagger na box **Authorize**.
Isso te dará acesso para testar os endpoints que estão restritos para a role FUNCIONARIO.
O mesmo processo é feito para o cliente.

package br.ufpr.api.model.responses;

import br.ufpr.api.model.enums.TipoBaseResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor //resposta sem dados e sem erro
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseResponse {
    String mensagemErro;
    Object dados;
    TipoBaseResponse tipo;

    //resposta de erro
    public BaseResponse(String errorMessage) {
        this.setMensagemErro(errorMessage);
        tipo = TipoBaseResponse.ERRO;
    }
    //resposta de dados
    public BaseResponse(Object data) {
        this.setDados(data);
        tipo = TipoBaseResponse.DADOS;
    }
}

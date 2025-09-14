package br.ufpr.api.model.response;

import br.ufpr.api.model.enums.BaseResponseType;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor //resposta sem dados e sem erro
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BaseResponse {
    String errorMessage;
    Object data;
    BaseResponseType type;

    //para inicializar como dados, passe como parâmetro qualquer variável que não seja String
    public BaseResponse(Object data) {
        this.setData(data);
        type = BaseResponseType.DATA;
    }

    //para inicializar como erro, passe como parâmetro a mensagem de erro
    public BaseResponse(String errorMessage) {
        this.setErrorMessage(errorMessage);
        type = BaseResponseType.ERROR;
    }

}

//classe wrappper para respostas de requisições
export enum BaseResponseType {
    EMPTY = "EMPTY",
    ERROR = "ERROR",
    DATA = "DATA"
}

//resposta vazia, para quando apenas a mensagem de status importa
export class EmptyResponse {
    constructor(
        public type: BaseResponseType = BaseResponseType.EMPTY,
    ) { }
}

//resposta contendo dados
export class DataResponse<T> {
    constructor(
        public type: BaseResponseType = BaseResponseType.DATA,
        public data: T
    ) { }
}

//resposta contendo mensagem de erro
export class ErrorResponse {
    constructor(
        public type: BaseResponseType = BaseResponseType.ERROR,
        public errorMessage: string
    ) { }
}

export type BaseResponse<T> = EmptyResponse | DataResponse<T> | ErrorResponse;
class ServerError<T> extends Error {
    type: T;
    
    constructor(type: T) {
        super();
        this.type = type;
        this.message = typeof type === "string" ? type : "UNKNOWN_ERROR";
    }
}

export enum InternalErrorType {
    INVALID_WIFI_RESPONSE = "INVALID_WIFI_RESPONSE",
    WIFI_REQUEST_FAILED = "WIFI_REQUEST_FAILED",
    IP_PARSER_ERROR = "IP_PARSER_ERROR",
}

export class InternalError extends ServerError<InternalErrorType> {}


export enum FlowErrorType {
    DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND",
}

export class FlowError extends ServerError<FlowErrorType> {}

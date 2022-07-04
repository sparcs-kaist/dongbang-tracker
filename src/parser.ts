import ip6addr from "ip6addr";
import {InternalError, InternalErrorType} from "./error";

export const parseIpAddress = (ip: string): string => {
    try {
        return ip6addr.parse(ip).toString({format: "v4"});
    } catch {
        throw new InternalError(InternalErrorType.IP_PARSER_ERROR);
    }
}

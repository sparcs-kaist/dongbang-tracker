import ip6addr from "ip6addr";
import { GlobalError } from "../error";

export const parseIpAddress = (ip: string): string => {
    try {
        return ip6addr.parse(ip).toString({ format: "v4" });
    } catch {
        throw new GlobalError("Invalid IP address");
    }
};

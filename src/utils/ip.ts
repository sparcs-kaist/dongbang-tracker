import ip6addr from "ip6addr";
import { fetchLanInfo } from "../wifi/api";
import { Device } from "../schema";

const format = (ip: string): string => {
    try {
        return ip6addr.parse(ip).toString({ format: "v4" });
    } catch {
        return "";
    }
};

export const filterByIp = (ip: string) =>
    (devices: Device[]) => devices.filter(
        device => device.ipaddr === format(ip),
    );
    


import axios, {AxiosResponse} from "axios";
import {FlowError, FlowErrorType, InternalError, InternalErrorType} from "./error";

export enum ConnectType {
    WIRE = "S_WIRE",
    WIRELESS = "S_WIRELESS",
    WIRE_UNKNOWN = "S_WIRE_UNKNOWN",
}

export interface ConnectedDevice {
    connect_type: ConnectType,
    dynamic: "0" | "1",
    hostname: string,
    ipaddr: string,
    hwaddr: string,
}

const isValidConnectedDevice = (device: any): device is ConnectedDevice => {
    if (
        Object.values(ConnectType).includes(device?.connect_type)
        && ["0", "1"].includes(device?.dynamic)
        && typeof device?.hostname === "string"
        && typeof device?.ipaddr === "string"
        && typeof device?.hwaddr === "string"
    ) return true;
    
    
    if (JSON.stringify(device) === "{\"\":\"\"}") return false;
    
    throw new InternalError(InternalErrorType.INVALID_WIFI_RESPONSE);
}


const fetchWiFiAPI = async (): Promise<AxiosResponse> => {
    try {
        return await axios.get(
            "http://192.168.0.1/cgi/iux_get.cgi?tmenu=netinfo&smenu=laninfo&act=status",
            {
                auth: {
                    username: process.env.ADMIN_USERNAME || "admin",
                    password: process.env.ADMIN_PASSWORD || "password",
                },
                headers: {
                    Referer: "http://192.168.0.1/netinfo/laninfo/iux.cgi"
                },
                timeout: 5000,
            }
        );
    } catch (e) {
        console.error(e)
        throw new InternalError(InternalErrorType.WIFI_REQUEST_FAILED);
    }
}

export const getConnectedDevices = async (): Promise<ConnectedDevice[]> => {
    const res = await fetchWiFiAPI();
    if (!Array.isArray(res.data?.addlist)) throw new Error("Invalid response");
    
    return res.data.addlist.filter(isValidConnectedDevice);
}

export const getMacAddress = async (ip: string): Promise<string> => {
    const addlist = await getConnectedDevices();
    const device = addlist.filter(({ipaddr}) => ipaddr === ip)?.[0];
    
    if (!device) throw new FlowError(FlowErrorType.DEVICE_NOT_FOUND);
    
    return device.hwaddr;
}


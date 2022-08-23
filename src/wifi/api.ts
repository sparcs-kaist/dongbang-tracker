import axios from "axios";
import { Device } from "../schema";
import { parse } from "./parser";
import { config } from "../core/config";

export const fetchLanInfo = (): Promise<Device[]> => {
    return axios.get(
        "http://192.168.0.1/cgi/iux_get.cgi?tmenu=netinfo&smenu=laninfo&act=status",
        {
            auth: {
                username: config.username,
                password: config.password,
            },
            headers: {
                Referer: "http://192.168.0.1/netinfo/laninfo/iux.cgi",
            },
            timeout: config.interval,
        },
    )
        .then(res => Promise.resolve(parse(res.data)))
        .catch(() => Promise.reject(new Error("WiFi request failed")));
};


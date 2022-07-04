import axios from "axios";

interface ChangeStatusQuery {
    entered: string[];
    exited: string[];
}

const instance = axios.create({
    baseURL: process.env.API_ENDPOINT || "https://dongbang.sparcs.org/api/",
    timeout: 5000,
    // headers: {"X-API-Key": process.env.API_KEY || "dongbang"},
});

export const changeStatus = async (query: ChangeStatusQuery) => {
    await instance.post("status", query);
}

export const checkRegistered = async (macAddress: string): Promise<boolean> => {
    const res = await instance.get(`device/${macAddress}`);
    return (typeof res.data?.registered === "boolean") ? res.data.registered : true;
}

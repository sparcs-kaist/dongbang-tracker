import "reflect-metadata";

import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import { GlobalError } from "../error";
import { Device } from "../schema";


export const parse = async (data: any): Promise<Device[]> => {
    if (!("addlist" in data) || !Array.isArray(data.addlist)) {
        throw new GlobalError("Invalid response from WiFi API");
    }
    
    const devices = data.addlist
        .slice(0, -1)
        .map(device => plainToInstance(Device, device));
    
    const validationResults = await Promise.all(
        devices.map(device => validate(device)),
    );
    
    if (validationResults.some(result => result.length > 0)) {
        throw new GlobalError("Invalid response from WiFi API");
    }
    
    return devices;
};


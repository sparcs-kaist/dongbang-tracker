import { createHash } from "crypto";

import { ConnectType, Device, DynamicType } from "../schema";

export const filterDevices = (devices: Device[]): Device[] =>
    devices.filter(device =>
        device.connect_type === ConnectType.WIRELESS
        && device.dynamic === DynamicType.DYNAMIC,
    );

export const hashDevices = (devices: Device[]): string[] =>
    devices.map(device => createHash("md5")
        .update(device.ipaddr)
        .digest("hex")
    );

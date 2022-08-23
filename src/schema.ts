import { IsEnum, IsString } from "class-validator";

export enum ConnectType {
    WIRE = "S_WIRE",
    WIRELESS = "S_WIRELESS",
    WIRE_UNKNOWN = "S_WIRE_UNKNOWN",
}

export enum DynamicType {
    STATIC = "0",
    DYNAMIC = "1",
}

export class Device {
    @IsEnum(ConnectType)
    connect_type: ConnectType;
    
    @IsEnum(DynamicType)
    dynamic: DynamicType;
    
    @IsString()
    hostname: string;
    
    @IsString()
    ipaddr: string;
    
    @IsString()
    hwaddr: string;
}

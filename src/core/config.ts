import { Key, loadSync } from "typenv";

class Config {
    @Key("ADMIN_USERNAME")
    public username: string;
    
    @Key("ADMIN_PASSWORD")
    public password: string;
    
    @Key("CONNECTION_ENDPOINT")
    public endpoint: string;
    
    @Key("CONNECTION_TOKEN")
    public token: string;
    
    @Key("TRACKER_INTERVAL")
    public interval: number;
    
    @Key("TRACKER_PORT")
    public port: number;
}

export const config = loadSync(Config);

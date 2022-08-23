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
}

export const config = loadSync(Config);

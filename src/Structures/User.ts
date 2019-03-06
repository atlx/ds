import {Snowflake} from "./Message";
import {Hash} from "./Guild";
import Client from "../Client";

export enum UserFlag {
    None = 0,
    HypeSquadEvents = 1 << 2,
    HouseBravery = 1 << 6,
    HouseBrilliance = 1 << 7,
    HouseBalance = 1 << 8
}

export enum PremiumType {
    /**
     * Includes app perks like animated emojis and avatars, but not games
     */
    NitroClassic = 1,

    /**
     * Includes app perks as well as the games subscription service
     */
    Nitro = 2
}

export interface IUser {
    readonly id: Snowflake;
    readonly username: string;
    readonly discriminator: string;
    readonly avatar?: Hash;
    readonly bot?: boolean;
    readonly mfa_enabled?: boolean;
    readonly locale?: string;
    readonly verified?: boolean;
    readonly email?: string;
    readonly flags: number;
    readonly premium_type?: PremiumType;
}

export default class User {
    readonly id: Snowflake;
    readonly username: string;
    readonly discriminator: string;
    readonly avatar?: Hash;
    readonly bot?: boolean;
    readonly mfaEnabled?: boolean;
    readonly locale?: string;
    readonly verified?: boolean;
    readonly email?: string;
    readonly flags: number;
    readonly premiumType?: PremiumType;

    protected client: Client;

    public constructor(client: Client, struct: IUser) {
        this.client = client;
        this.id = struct.id;
        this.username = struct.username;
        this.discriminator = struct.discriminator;
        this.avatar = struct.avatar;
        this.bot = struct.bot;
        this.mfaEnabled = struct.mfa_enabled;
        this.locale = struct.locale;
        this.verified = struct.verified;
        this.email = struct.email;
        this.flags = struct.flags;
        this.premiumType = struct.premium_type;
    }

    public get tag(): string {
        return `${this.username}#${this.discriminator}`;
    }
}

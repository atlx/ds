import {Snowflake, IUser} from "./message";

export enum ChannelType {
    Text,
    DM,
    Voice,
    Group,
    Category
}

export type IGenericChannel = {
    readonly id: Snowflake;
    readonly type: ChannelType;
}

export interface IGuildChannel extends IGenericChannel {
    readonly guild_id: Snowflake;
    readonly position: number;
    readonly permission_overwrites: IPermissionOverwrite[];
    readonly name: string;
    readonly parent_id?: Snowflake;
}

export type IPermissionOverwrite = {
    readonly id: Snowflake;
    readonly type: "role" | "member";
    readonly allow: number;
    readonly deny: number;
}

export interface ITextChannel extends IGuildChannel {
    readonly topic?: string;
    readonly nsfw: boolean;
    readonly last_message_id?: Snowflake;
    readonly last_pin_timestamp: number;
    readonly rate_limit_per_user?: number;
}

export interface IVoiceChannel extends IGuildChannel {
    readonly bitrate: number;
    readonly user_limit?: number;
}

export interface IGroupDMChannel extends IGenericChannel {
    readonly recipients?: IUser[];
    readonly icon?: string;
    readonly owner_id: Snowflake;
    readonly application_id?: Snowflake;
}

export type IDMChannel = {
    readonly recipients: IUser[]
}

export interface ICategoryChannel extends IGuildChannel {
}

export class TextChannel {
    readonly guildId: Snowflake;
    readonly position: number;
    readonly permissionOverwrites: IPermissionOverwrite[];
    readonly name: string;
    readonly parentId?: Snowflake;
    readonly topic?: string;
    readonly nsfw: boolean;
    readonly lastMessageId?: Snowflake;
    readonly lastPinTimestamp: number;
    readonly rateLimitPerUser?: number;

    public constructor(raw: ITextChannel) {
        this.guildId = raw.guild_id;
        this.position = raw.position;
        this.permissionOverwrites = raw.permission_overwrites;
        this.name = raw.name;
        this.parentId = raw.parent_id;
        this.topic = raw.topic;
        this.nsfw = raw.nsfw;
        this.lastMessageId = raw.last_message_id;
        this.lastPinTimestamp = raw.last_pin_timestamp;
        this.rateLimitPerUser = raw.rate_limit_per_user;
    }
}
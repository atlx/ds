import {Snowflake, IUser, Message} from "./message";
import Client from "../client";

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

export interface IPermissionOverwrite {
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

export interface IGroupDmChannel extends IGenericChannel {
    readonly recipients?: IUser[];
    readonly icon?: string;
    readonly owner_id: Snowflake;
    readonly application_id?: Snowflake;
}

export interface IDmChannel {
    readonly recipients: IUser[]
}

export interface ICategoryChannel extends IGuildChannel {
    //
}

export class TextChannel {
    public readonly id: Snowflake;
    public readonly guildId: Snowflake;
    public readonly position: number;
    public readonly permissionOverwrites: IPermissionOverwrite[];
    public readonly name: string;
    public readonly parentId?: Snowflake;
    public readonly topic?: string;
    public readonly nsfw: boolean;
    public readonly lastMessageId?: Snowflake;
    public readonly lastPinTimestamp: number;
    public readonly rateLimitPerUser?: number;

    protected readonly client: Client;

    public constructor(client: Client, struct: ITextChannel) {
        this.client = client;
        this.id = struct.id;
        this.guildId = struct.guild_id;
        this.position = struct.position;
        this.permissionOverwrites = struct.permission_overwrites;
        this.name = struct.name;
        this.parentId = struct.parent_id;
        this.topic = struct.topic;
        this.nsfw = struct.nsfw;
        this.lastMessageId = struct.last_message_id;
        this.lastPinTimestamp = struct.last_pin_timestamp;
        this.rateLimitPerUser = struct.rate_limit_per_user;
    }

    public send(content: string): Promise<Message | null> {
        return this.client.manager.actions.createMessage(content, this.id);
    }
}
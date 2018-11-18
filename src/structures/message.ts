import Client from "../client";
import {IGuildChannel, TextChannel} from "./channel";

// TODO: type, mentions, mention_roles, etc. enum/types
export type IMsg = {
    readonly id: Snowflake;
    readonly type: number;
    readonly timestamp: string;
    readonly pinned: boolean;
    readonly nonce: string;
    readonly mentions: any[];
    readonly mention_roles: any[];
    readonly member: IMember;
    readonly embeds: any[];
    readonly edited_timestamp: null;
    readonly content: string;
    readonly channel_id: Snowflake;
    readonly author: IUser;
    readonly attachments: any[];
    readonly guild_id?: Snowflake;
}

export class Msg {
    public readonly id: Snowflake;
    public readonly type: number;
    public readonly timestamp: string;
    public readonly pinned: boolean;
    public readonly nonce: string;
    public readonly mentions: any[];
    public readonly mentionedRoles: any[];
    public readonly member?: IMember;
    public readonly embeds: any[];
    public readonly editedTimestamp: null;
    public readonly content: string;
    public readonly channelId: Snowflake;
    public readonly author: IUser;
    public readonly attachments: any[];
    public readonly guildId?: Snowflake;

    private readonly client: Client;

    public constructor(client: Client, raw: IMsg) {
        this.client = client;
        this.id = raw.id;
        this.type = raw.type;
        this.timestamp = raw.timestamp;
        this.pinned = raw.pinned;
        this.nonce = raw.nonce;
        this.mentions = raw.mentions;
        this.mentionedRoles = raw.mention_roles;
        this.member = raw.member;
        this.embeds = raw.embeds;
        this.content = raw.content;
        this.channelId = raw.channel_id;
        this.author = raw.author;
        this.attachments = raw.attachments;
        this.guildId = raw.guild_id;
    }

    public get channel(): TextChannel {
        return this.client.channels.get(this.channelId) as any;
    }

    public reply(message: string): Promise<Msg | null> {
        return this.channel.send(message.toString());
    }
}

export type IUser = {
    readonly username: string;
    readonly discriminator: string;
    readonly id: Snowflake;
    readonly avatar: string;
}

export type IMember = {
    readonly roles: Snowflake[];
    readonly nick: string | null;
    readonly mute: boolean;
    readonly joined_at: string;
    readonly deaf: boolean;
}

export type Snowflake = string;
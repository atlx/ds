import Client from "../client";
import {TextChannel} from "./channel";
import {IUser} from "./user";

export type Snowflake = string;

export enum MessageType {
    Default,
    RecipientAdd,
    RecipientRemove,
    Call,
    ChannelNameChange,
    ChannelIconChange,
    ChannelPinnedMessage,
    GuildMemberJoin
}

// TODO: type, mentions, mention_roles, etc. enum/types
export interface IMessage {
    /**
     * Unique id of the message
     */
    readonly id: Snowflake;

    /**
     * The type of message
     */
    readonly type: MessageType;

    /**
     * When this message was sent
     */
    readonly timestamp: string;

    /**
     * Whether this message is pinned
     */
    readonly pinned: boolean;

    /**
     * Used for validating a message was sent
     */
    readonly nonce: string;

    /**
     * Users specifically mentioned in the message
     */
    readonly mentions: any[];

    /**
     * Roles specifically mentioned in this message
     */
    readonly mention_roles: any[];

    /**
     * Any embedded content
     */
    readonly embeds: any[];

    /**
     * When this message was edited (or null if never)
     */
    readonly edited_timestamp: string | null;
    
    /**
     * Contents of the message
     */
    readonly content: string;

    /**
     * Id of the channel the message was sent in
     */
    readonly channel_id: Snowflake;

    /**
     * The author of this message (not guaranteed to be a valid user)
     */
    readonly author: IUser;

    /**
     * Any attached files
     */
    readonly attachments: any[];

    /**
     * Id of the guild the message was sent in
     */
    readonly guild_id?: Snowflake;
}

export class Message {
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

    public constructor(client: Client, raw: IMessage) {
        this.client = client;
        this.id = raw.id;
        this.type = raw.type;
        this.timestamp = raw.timestamp;
        this.pinned = raw.pinned;
        this.nonce = raw.nonce;
        this.mentions = raw.mentions;
        this.mentionedRoles = raw.mention_roles;

        // TODO
        //this.member = raw.member;
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

    public reply(message: string): Promise<Message | null> {
        return this.channel.send(message.toString());
    }
}

export interface IMember {
    readonly roles: Snowflake[];
    readonly nick: string | null;
    readonly mute: boolean;
    readonly joined_at: string;
    readonly deaf: boolean;
}
// TODO: type, mentions, mention_roles, etc. enum/types
export type Message = {
    readonly id: Snowflake;
    readonly type: number;
    readonly timestamp: string;
    readonly pinned: boolean;
    readonly nonce: string;
    readonly mentions: any[];
    readonly mention_roles: any[];
    readonly member: Member;
    readonly embeds: any[];
    readonly edited_timestamp: null;
    readonly content: string;
    readonly channel_id: Snowflake;
    readonly author: User;
    readonly attachments: any[];
    readonly guild_id: Snowflake;
}

export type User = {
    readonly username: string;
    readonly discriminator: string;
    readonly id: Snowflake;
    readonly avatar: string;
}

export type Member = {
    readonly roles: Snowflake[];
    readonly nick: string | null;
    readonly mute: boolean;
    readonly joined_at: string;
    readonly deaf: boolean;
}

export type Snowflake = string;
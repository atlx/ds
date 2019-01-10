import User from "./user";
import {Snowflake} from "./message";
import Client from "../client";

export interface IInviteMetadata {
    readonly inviter: User;
    readonly uses: number;
    readonly max_uses: number;
    readonly max_age: number;
    readonly temporary: boolean;
    readonly created_at: string;
    readonly revoked: boolean;
}

export default class InviteMetadata {
    public readonly inviterId: Snowflake;
    public readonly uses: number;
    public readonly maxUses: number;
    public readonly maxAge: number;
    public readonly temporary: boolean;
    public readonly createdAt: string;
    public readonly revoked: boolean;

    protected client: Client;

    public constructor(client: Client, struct: IInviteMetadata) {
        this.client = client;
        this.inviterId = struct.inviter.id;
        this.uses = struct.uses;
        this.maxUses = struct.max_uses;
        this.maxAge = struct.max_age;
        this.temporary = struct.temporary;
        this.createdAt = struct.created_at;
        this.revoked = struct.revoked;
    }

    public get inviter(): User | null {
        return this.client.users.get(this.inviterId) || null;
    }
}
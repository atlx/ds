import Client from "../Client";
import axios, {AxiosResponse} from "axios";
import HttpClient, {Gateway, ApiEndpoints} from "../Http/Http";
import {Snowflake, Message, IMessage} from "../Structures/Message";
import {IGenericChannel, TextChannel} from "../Structures/Channel";
import User, {IUser} from "../Structures/User";

export interface IClientActions {
    createMessage(content: string, channel: Snowflake): Promise<Message | null>;
    fetchChannel<T extends IGenericChannel | TextChannel>(channelId: Snowflake): Promise<T | null>;
}

export default class ClientActions implements IClientActions {
    protected readonly client: Client;

    public constructor(client: Client) {
        this.client = client;
    }

    public async createMessage(content: string, channel: Snowflake): Promise<Message | null> {
        const response: AxiosResponse = await axios(`${Gateway.api}/channels/${channel}/messages`, {
            method: "POST",

            headers: {
                authorization: `Bot ${this.client.token}`
            },

            data: {
                content
            }
        });

        if (response.data) {
            const raw: IMessage = response.data;

            if (!this.client.channels.has(raw.channel_id)) {
                // TODO: Not nescerarliy text-channel.
                const channel: TextChannel | null = await this.fetchChannel<TextChannel>(raw.channel_id);

                if (channel !== null) {
                    this.client.channels.set(raw.channel_id, channel as any);
                }
                else {
                    throw new Error("[ClientActions.createMessage] Expecting channel to exist");
                }
            }
        }

        return response.data ? new Message(this.client, response.data) : null;
    }

    public async fetchChannel<T extends IGenericChannel | TextChannel = IGenericChannel>(channelId: Snowflake): Promise<T | null> {
        const response: T | null = await HttpClient.fetch(ApiEndpoints.channel(channelId), this.client.token);

        // TODO: Use GenericChannel class instead? (might remove properties).
        return (response !== null ? new TextChannel(this.client, response as any) : null) as T | null;
    }

    public async fetchUser(userId: Snowflake): Promise<User | null> {
        const response: IUser | null = await HttpClient.fetch(ApiEndpoints.user(userId));

        return response !== null ? new User(this.client, response) : null;
    }
}

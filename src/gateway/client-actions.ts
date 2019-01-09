import Client from "../client";
import axios, {AxiosResponse} from "axios";
import {Gateway, ApiEndpoints} from "../http/http";
import {Snowflake, Message, IMessage} from "../structures/message";
import {IGenericChannel, TextChannel} from "../structures/channel";

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
                // TODO: Not nescerarliy text-channel
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
        const response: AxiosResponse = await axios(ApiEndpoints.getChannel(channelId), {
            method: "GET",

            headers: {
                authorization: `Bot ${this.client.token}`
            },
        });
        
        // TODO: Use GenericChannel class instead? (might remove properties)
        return (response.data ? new TextChannel(this.client, response.data) : null) as T | null;
    }
}
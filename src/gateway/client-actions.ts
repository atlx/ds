import Client from "../client";
import axios, {AxiosResponse} from "axios";
import {Gateway, ApiEndpoints, CdnEndpoints} from "../http/http";
import {Snowflake, Msg, IMsg} from "../structures/message";
import {IGenericChannel, TextChannel} from "../structures/channel";

export default class ClientActions {
    private readonly client: Client;

    public constructor(client: Client) {
        this.client = client;
    }

    public async createMessage(content: string, channel: Snowflake): Promise<Msg | null> {
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
            const raw: IMsg = response.data;

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
        
        return response.data ? new Msg(this.client, response.data) : null;
    }

    public async fetchChannel<ResponseType = IGenericChannel>(channelId: Snowflake): Promise<ResponseType | null> {
        const response: AxiosResponse = await axios(ApiEndpoints.getChannel(channelId), {
            method: "GET",

            headers: {
                authorization: `Bot ${this.client.token}`
            },
        });
        
        // TODO: Use GenericChannel class instead? (might remove properties)
        return (response.data ? new TextChannel(this.client, response.data) : null) as ResponseType | null;
    }
}
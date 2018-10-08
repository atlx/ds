import ClientManager from "../client-manager";
import Client from "../client";
import axios, {AxiosResponse} from "axios";
import {Gateway} from "../http/http";
import {Snowflake} from "../core/message";

export default class ClientActions {
    private readonly client: Client;

    public constructor(client: Client) {
        this.client = client;
    }

    public async createMessage(content: string, channel: Snowflake): Promise<void> {
        const response: AxiosResponse = await axios(`${Gateway.api}/channels/${channel}/messages`, {
            method: "POST",
            headers: {
                authorization: `Bot ${this.client.token}`
            },

            data: {
                content
            }
        });
    }
}
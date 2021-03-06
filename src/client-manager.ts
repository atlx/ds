import Client from "./client";
import WebSocket from "ws";
import {EventEmitter} from "events";
import GatewayHandler from "./gateway/gateway-handler";
import {GatewayMessage, generateMessage} from "./gateway/gateway-messages";
import OpCode from "./gateway/op-code";
import axios, {AxiosResponse} from "axios";
import {ApiEndpoints} from "./http/http";
import ClientActions, {IClientActions} from "./gateway/client-actions";

export type GatewayBotInformationSessionStartLimit = {
    readonly total: number;
    readonly remaining: number;
    readonly reset_after: number;
}

export type GatewayBotInformation = {
    readonly url: string;
    readonly shards: number;
    readonly session_start_limit: GatewayBotInformationSessionStartLimit;
}

export interface IClientManager extends EventEmitter {
    fetchGatewayBot(): Promise<this>;
    connectToWebSocket(): Promise<this>;
    getGatewayBotInfo(): GatewayBotInformation | null;
    send(opCode: OpCode, data: any): Promise<this>;

    readonly actions: IClientActions;
}

export default class ClientManager extends EventEmitter {
    protected readonly client: Client;

    protected socket: WebSocket | null;
    protected gatewayHandler: GatewayHandler;
    protected gatewayBotInfo: GatewayBotInformation | null;
    
    public readonly actions: ClientActions;

    public constructor(client: Client) {
        super();

        this.gatewayBotInfo = null;
        this.client = client;
        this.socket = null;
        this.gatewayHandler = new GatewayHandler(this.client, this);
        this.actions = new ClientActions(this.client);
    }

    public async fetchGatewayBot(): Promise<this> {
        const response: AxiosResponse = await axios.get(ApiEndpoints.botGateway(), {
            headers: {
                authorization: `Bot ${this.client.token}`
            }
        });

        if (response.status !== 200) {
            throw new Error(`[ClientManager.fetchGatewayBot] Unable to fetch gateway bot information (${response.status})`);
        }

        this.gatewayBotInfo = response.data;

        return this;
    }

    public async connectToWebSocket(): Promise<this> {
        if (this.gatewayBotInfo === null) {
            throw new Error("[ClientManager.connectToWebSocket] Connection URL has not been initialized");
        }

        this.socket = new WebSocket(`${this.gatewayBotInfo.url}/?v=6&encoding=json`);

        this.socket.onmessage = (e) => {
            if (!e.data.toString().trim().startsWith("{")) {
                console.log(`WS Received Raw Data (${e.data.toString().length})`);

                return;
            }

            const payload: GatewayMessage = JSON.parse(e.data.toString());

            // console.log(`WS Received (${payload.op})`, e.data.toString());

            let event: string = payload.op.toString();


            if (payload.op === 0) {
                event = payload.t as string;
            }

            this.emit(event, payload.d);
        };

        this.socket.onclose = (e) => {
            console.log(`WS Connection closed (${e.code})`);
        };

        return this;
    }

    public getGatewayBotInfo(): GatewayBotInformation | null {
        return Object.assign({}, this.gatewayBotInfo);
    }

    public async send(opCode: OpCode, data: any): Promise<this> {
        if (this.socket === null) {
            throw new Error("[ClientManager.send] Socket has not been initialized");
        }

        console.log(`WS Sending (${opCode}) `, data);

        this.socket.send(JSON.stringify(generateMessage(opCode, data)));

        return this;
    }
}
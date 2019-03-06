import {G_Hello} from "./GatewayMessages";
import {C_Identify} from "./ClientMessages";
import OpCode from "./OpCode";
import ClientManager, {GatewayBotInformation} from "../ClientManager";
import Client, {PresenceStatus} from "../Client";
import {ClientEvent} from "./ClientEvents";
import {IMessage} from "../Structures/Message";
import Report from "../Utils/Report";

export interface IGatewayHandler {
    on(opCode: number | string, handler: any): this;
    hello(data: G_Hello): this;
    message(message: IMessage): this;
}

export default class GatewayHandler implements IGatewayHandler {
    protected readonly client: Client;
    protected readonly manager: ClientManager;
    
    // TODO
    protected lastHeartbeat: number | null = null;

    public constructor(client: Client, manager: ClientManager) {
        this.client = client;
        this.manager = manager;

        // OpCode handlers
        this.on(OpCode.Hello, this.hello);

        // Client events handlers
        this.on(ClientEvent.MessageCreate, this.message);
    }

    public on(opCode: number | string, handler: any): this {
        this.manager.on(opCode.toString(), handler.bind(this));

        return this;
    }

    public hello(data: G_Hello): this {
        const gatewayBotInfo: GatewayBotInformation | null = this.manager.getGatewayBotInfo();

        // TODO: Organize/optimize.
        if (gatewayBotInfo === null) {
            throw new Error("Gateway bot information is null");
        }

        // TODO: Debugging.
        Report.verbose(`WS Handling hello message with data`, data);

        const message: G_Hello = data;

        // TODO: Use client setInterval() instead
        setInterval(() => {
            this.manager.send(OpCode.Heartbeat, {});
        }, message.heartbeat_interval);

        // Identify
        this.manager.send(OpCode.Identify, {
            token: this.client.token,
            compress: true,
            large_threshold: 250,
            shard: [0, gatewayBotInfo.shards],

            properties: {
                $os: "linux",
                $browser: "disco",
                $device: "disco"
            },

            presence: {
                game: {
                    name: "Testing bot",
                    type: 0
                },

                // Initially online
                status: PresenceStatus.Online,

                // TODO
                since: 91879201,

                afk: false
            }
        } as C_Identify);

        return this;
    }

    public message(message: IMessage): this {
        this.client.emit(ClientEvent.MessageCreate, message);

        return this;
    }
}

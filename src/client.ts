import ClientManager from "./client-manager";
import {EventEmitter} from "events";
import {Collection} from "./utils/collection";
import {Snowflake, IMsg} from "./structures/message";
import {IGenericChannel} from "./structures/channel";

export default class Client extends EventEmitter {
    public readonly manager: ClientManager;
    public readonly token: string;
    public readonly channels: Collection<Snowflake, IGenericChannel>;
    public readonly messages: Collection<Snowflake, IMsg>;

    public constructor(token: string) {
        super();
        
        this.token = token;
        this.channels = new Collection();
        this.messages = new Collection();
        this.manager = new ClientManager(this);
    }

    public async connect(): Promise<void> {
        await this.manager.fetchGatewayBot();
        await this.manager.connectToWebSocket();
    }
}

export type IClientPresenceGame = {
    readonly name: string;
    readonly type: number;
}

export enum ClientPresenceStatus {
    DoNotDisturb = "dnd"
}

export type IClientPresence = {
    readonly game: IClientPresenceGame;
    readonly status: ClientPresenceStatus;
    readonly since: number;
    readonly afk: boolean;
}
import ClientManager from "./client-manager";
import {EventEmitter} from "events";
import {Collection} from "./utils/collection";
import {Snowflake, IMessage} from "./structures/message";
import {IGenericChannel} from "./structures/channel";

/**
 * @extends EventEmitter
 */
export default class Client extends EventEmitter {
    public readonly manager: ClientManager;
    public readonly token: string;
    public readonly channels: Collection<Snowflake, IGenericChannel>;
    public readonly messages: Collection<Snowflake, IMessage>;

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

export interface IPresenceGame {
    readonly name: string;
    readonly type: number;
}

export enum PresenceStatus {
    DoNotDisturb = "dnd",
    Online = "online",
    Idle = "idle",
    Invisible = "invisible",
    Offline = "offline"
}

export interface IPresence {
    readonly game: IPresenceGame;
    readonly status: PresenceStatus;
    readonly since: number;
    readonly afk: boolean;
}
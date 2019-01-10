import ClientManager, {IClientManager} from "./client-manager";
import {EventEmitter} from "events";
import {Collection} from "./utils/collection";
import {Snowflake, IMessage} from "./structures/message";
import {IGenericChannel} from "./structures/channel";
import User from "./structures/user";

export interface IClient extends EventEmitter {
    connect(): Promise<this>;

    readonly manager: IClientManager;
    readonly token: string;
    readonly channels: Collection<Snowflake, IGenericChannel>;
    readonly messages: Collection<Snowflake, IMessage>;
}

/**
 * @extends EventEmitter
 */
export default class Client extends EventEmitter implements IClient {
    public readonly manager: ClientManager;
    public readonly token: string;
    public readonly channels: Collection<Snowflake, IGenericChannel>;
    public readonly messages: Collection<Snowflake, IMessage>;
    public readonly users: Collection<Snowflake, User>;

    public constructor(token: string) {
        super();
        
        this.token = token;
        this.users = new Collection();
        this.channels = new Collection();
        this.messages = new Collection();
        this.manager = new ClientManager(this);
    }

    public async connect(): Promise<this> {
        await this.manager.fetchGatewayBot();
        await this.manager.connectToWebSocket();

        return this;
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
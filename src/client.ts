import ClientManager from "./client-manager";
import {EventEmitter} from "events";

export default class Client extends EventEmitter {
    public readonly manager: ClientManager;
    public readonly token: string;

    public constructor(token: string) {
        super();
        
        this.token = token;
        this.manager = new ClientManager(this);
    }

    public async connect(): Promise<void> {
        await this.manager.fetchGatewayBot();
        await this.manager.connectToWebSocket();
    }
}

export type ClientPresenceGame = {
    readonly name: string;
    readonly type: number;
}

export enum ClientPresenceStatus {
    DoNotDisturb = "dnd"
}

export type ClientPresence = {
    readonly game: ClientPresenceGame;
    readonly status: ClientPresenceStatus;
    readonly since: number;
    readonly afk: boolean;
}
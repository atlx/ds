import {IPresence} from "../client";

export type ClientHeartbeatMessage = {
    //
}

export type ClientIdentifyMessageProperties = {
    readonly $os: string;
    readonly $browser: string;
    readonly $device: string;
}

export type ClientIdentifyMessage = {
    readonly token: string;
    readonly properties: ClientIdentifyMessageProperties;
    readonly compress: boolean;
    readonly large_threshold: number;
    readonly shard: number[];
    readonly presence: IPresence;
}
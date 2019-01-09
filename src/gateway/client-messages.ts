import {IPresence} from "../client";

export type CHeartbeatMessage = {
    //
}

export type CIdentifyMessageProps = {
    readonly $os: string;
    readonly $browser: string;
    readonly $device: string;
}

export type CIdentifyMessage = {
    readonly token: string;
    readonly properties: CIdentifyMessageProps;
    readonly compress: boolean;
    readonly large_threshold: number;
    readonly shard: number[];
    readonly presence: IPresence;
}
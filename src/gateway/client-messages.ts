import {IPresence} from "../client";

export type C_Heartbeat = {
    //
}

export type C_IdentifyProps = {
    readonly $os: string;
    readonly $browser: string;
    readonly $device: string;
}

export type C_Identify = {
    readonly token: string;
    readonly properties: C_IdentifyProps;
    readonly compress: boolean;
    readonly large_threshold: number;
    readonly shard: number[];
    readonly presence: IPresence;
}
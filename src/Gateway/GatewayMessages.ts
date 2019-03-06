import OpCode from "./OpCode";

export type G_Hello = {
    readonly heartbeat_interval: number;
}

export type GatewayMessage = {
    readonly op: OpCode;
    readonly d: any;
    readonly s?: number;
    readonly t?: string;
}

export function generateMessage(opCode: OpCode, data: any): GatewayMessage {
    return {
        op: opCode,
        d: data,

        // TODO: s, t
    };
}

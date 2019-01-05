import {Snowflake} from "./message";

export type Hash = string;

export interface IVoiceRegion {
    /**
     * Unique ID for the region
     */
    readonly id: string;

    /**
     * Name of the region
     */
    readonly name: string;

    /**
     * True if this is a vip-only server
     */
    readonly vip: boolean;

    /**
     * True for a single server that is closest to the current user's client
     */
    readonly optimal: boolean;

    /**
     * Whether this is a deprecated voice region (avoid switching to these)
     */
    readonly deprecated: boolean;

    /**
     * Whether this is a custom voice region (used for events/etc)
     */
    readonly custom: boolean;
}

export interface IGuild {
    /**
     * Guild id
     */
    readonly id: Snowflake;

    /**
     * Guild name (2-100 characters)
     */
    readonly name: string;

    /**
     * The guild's icon hash
     */
    readonly icon?: Hash;

    readonly splash?: Hash;

    /**
     * Whether or not the user is the owner of the guild
     */
    readonly owner?: boolean;

    /**
     * Id of the guild's owner
     */
    readonly owner_id?: Snowflake;

    /**
     * Total permissions for the user in the guild (does not include channel overrides)
     */
    readonly permissions?: number;

    /**
     * Voice region id for the guild
     */
    readonly region: string;
}
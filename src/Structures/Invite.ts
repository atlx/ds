import PartialGuild, {IPartialGuild} from "./PartialGuild";
import Client from "../Client";

export interface IInvite {
    readonly code: string;
    readonly guild?: IPartialGuild;
    
    // TODO: Partial channel (see https://discordapp.com/developers/docs/resources/invite).
    readonly channel: any;

    readonly approximate_presence_count?: number;
    readonly approximate_member_count?: number;
}

export default class Invite {
    public readonly code: string;
    public readonly guild: PartialGuild;

    // TODO
    public readonly channel: any;

    public readonly approximatePresenceCount?: number;
    public readonly approximateMemberCount?: number;

    protected client: Client;

    public constructor(client: Client, struct: IInvite) {
        this.client = client;
        this.code = struct.code;

        // TODO: IPartialGuild != PartialGuild.
        this.guild = struct.guild as any;

        this.channel = struct.channel;
        this.approximatePresenceCount = struct.approximate_presence_count;
        this.approximateMemberCount = struct.approximate_member_count;
    }
}

import {Snowflake} from "../Structures/Message";

export default abstract class DiscordSpecial {
    public static userMention(id: Snowflake): string {
        return `<@${id}>`;
    }
}

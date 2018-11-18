import {Snowflake} from "../structures/message";

export default abstract class DiscordSpecial {
    public static userMention(id: Snowflake): string {
        return `<@${id}>`;
    }
}
import Client from "./client";
import {ClientEvent} from "./gateway/client-events";
import {IMsg, Msg} from "./structures/message";

// TODO: This is just for testing; not an actual bot
if (!process.env.TOKEN) {
    throw new Error("Token is not set");
}

const client: Client = new Client(process.env.TOKEN);

client.on(ClientEvent.MessageCreate, async (message: IMsg) => {
    if (message.content === "!ping") {
        const msg: Msg | null = await client.manager.actions.createMessage("Pong!", message.channel_id);

        if (msg) {
            console.log("channel id", msg.channel);
        }
    }
});

client.connect();
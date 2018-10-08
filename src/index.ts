import Client from "./client";
import {ClientEvent} from "./gateway/client-events";
import {Message} from "./core/message";

if (!process.env.token) {
    throw new Error("Token is not set");
}

const client: Client = new Client(process.env.token);

client.on(ClientEvent.MessageCreate, async (message: Message) => {
    if (message.content === "!ping") {
        await client.manager.actions.createMessage("Pong!", message.channel_id);
    }
});

client.connect();
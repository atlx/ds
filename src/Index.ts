import Client from "./Client";
import {ClientEvent} from "./Gateway/ClientEvents";
import {IMessage, Message} from "./Structures/Message";

// TODO: This is just for testing; not an actual bot.
if (!process.env.TOKEN) {
    throw new Error("Token is not set");
}

const client: Client = new Client(process.env.TOKEN);

client.on(ClientEvent.MessageCreate, async (message: IMessage) => {
    if (message.content === "!ping") {
        const msg: Message | null = await client.manager.actions.createMessage("Pong!", message.channel_id);

        if (msg) {
            msg.channel.send(`I just said: ${msg.content}`);
        }
    }
});

client.connect();

import dotenv from "dotenv";
dotenv.config(); // load discord token from .env

import Discord from "discord.js";
import { log } from "./utils/log";
import { handleMessageCreated } from "./events/message";
import { connectDB } from "$db/init";
import { handleMemberAdd } from "$events/memberAdd";
import "$commands/index"
import { handleInteractionCreate } from "$events/interactionCreate";

const client = new Discord.Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "DirectMessages",
        "MessageContent"
    ],
});


client.once("ready", async () => {
    log(`🤖 Bot ${client.user?.tag} successfully started 🚀`);
});

client.on("interactionCreate", handleInteractionCreate);
client.on("messageCreate", handleMessageCreated);
client.on("guildMemberAdd", handleMemberAdd);

connectDB().then(() => {
    client.login(process.env.BOT_TOKEN);
});

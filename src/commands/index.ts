import path from "node:path";
import fs from "node:fs";
import { Client, Guild, REST, Routes } from "discord.js";
import assert from "assert";
import { log } from "$utils/log";
import { CommandModule } from "$types/Command";

export const commands = new Map<string, CommandModule>();


export async function loadFunctions(guild: Guild) {
    const commandFiles = fs.readdirSync(__dirname).filter(file => file.match(/^[\w\-_]+(?<!index).ts$/i));

    const {
        APP_ID,
        GUILD_ID,
        BOT_TOKEN
    } = process.env;

    assert(APP_ID && GUILD_ID && BOT_TOKEN, "Missing config entries")

    const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

    log("Refreshing commands");

    for (const file of commandFiles) {
        const filePath = path.join(__dirname, file);
        const command = require(filePath).default as CommandModule;


        if (command && 'data' in command && 'execute' in command) {
            log("\t", command.data.name, "✅")
            commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }

    const data = await rest.put(
        Routes.applicationGuildCommands(APP_ID, GUILD_ID),
        { body: [...commands.values()].map(c => c.data) },
    ) as [];

    for (const command of commands.values()) {
        if (command.perms) {
            await guild.commands.permissions.set({
                command: command.data.name,
                permissions: command.perms,
                token: BOT_TOKEN
            })
        }
    }


    log(data.length, "commands sent");
}
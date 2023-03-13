import { commands } from "$commands";
import { log } from "$utils/log";
import { CacheType, Interaction } from "discord.js";
import assert from "assert";

export async function handleInteractionCreate(interaction: Interaction<CacheType>) {
    if (interaction.isChatInputCommand()) {
        const command = commands.get(interaction.commandName)
        assert(command, `No command found for ${interaction.commandName}`)

        await command.execute(interaction);
        log(`Command ${command.data.name} executed`)
    }
}
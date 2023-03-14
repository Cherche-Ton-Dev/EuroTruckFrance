import { commands } from "$commands";
import { log } from "$utils/log";
import { CacheType, GuildMember, Interaction } from "discord.js";
import assert from "assert";
import { createTicket } from "$utils/ticket";

export async function handleInteractionCreate(interaction: Interaction<CacheType>): Promise<void> {
    if (!(interaction.member instanceof GuildMember)) return;

    if (interaction.isChatInputCommand()) {
        const command = commands.get(interaction.commandName)
        assert(command, `No command found for ${interaction.commandName}`)

        await command.execute(interaction);
        log(`Command ${command.data.name} executed`)
    } else if (interaction.isStringSelectMenu()) {
        if (interaction.customId == "ticket-select") {
            if (interaction.values.length == 0) {
                interaction.reply({
                    content: "Merci de réessayer.",
                    ephemeral: true
                })
                return;
            }
            interaction.deferReply({ ephemeral: true });
            const channel = await createTicket(interaction.member, interaction.values[0]);
            interaction.editReply({
                content: `Ton ticket a été crée. ${channel}`,
            })
        }
    }
}
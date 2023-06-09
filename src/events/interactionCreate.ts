import { commands } from "$commands";
import { discordLog, log } from "$utils/log";
import { ButtonStyle, CacheType, Colors, ComponentType, GuildMember, Interaction, TextChannel } from "discord.js";
import assert from "assert";
import { createTicket } from "$utils/ticket";
import { botConfig } from "$config";

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
    } else if (interaction.isButton()) {
        const mem = await interaction.member.fetch();
        if (mem.roles.cache.has(botConfig.modRole) || mem.roles.cache.has(botConfig.helperRole)) {
            if (interaction.customId == "truck-validate-ticket-close") {
                await interaction.channel?.delete();
                await discordLog(interaction.member, {
                    title: "Ticket fermé",
                    description: `${interaction.user} à fermé un ticket`,
                    author: {
                        name: interaction.user.tag,
                        icon_url: interaction.user.displayAvatarURL()
                    },
                    timestamp: new Date().toISOString(),
                    color: Colors.Red
                });
            }
        }


        if (interaction.customId == "truck-accept-rules") {
            await interaction.member.roles.add(botConfig.memberRole);
            await interaction.reply({
                content: "Tu as désormais accès au reste du serveur.",
                ephemeral: true
            })
        }
    }
}
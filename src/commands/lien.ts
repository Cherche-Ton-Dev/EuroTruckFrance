import { botConfig } from "$config";
import { CommandModule } from "$types/Command";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ButtonStyle, Colors, ComponentType, GuildMember, PermissionFlagsBits, TextChannel } from "discord.js";
export default {
    data: {
        name: "liens",
        description: "Affiche les différents liens.",
    },


    execute: async (inter) => {
        inter.reply({
            content: `
        Créateur du bot: https://discord.gg/pd7CQ6FmzK
        `
        })
    }
} as CommandModule;
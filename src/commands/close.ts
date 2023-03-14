import { botConfig } from "$config";
import { CommandModule } from "$types/Command";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ComponentType, GuildMember, PermissionFlagsBits, TextChannel } from "discord.js";
export default {
    data: {
        name: "close",
        description: "Ferme un ticket",
        default_member_permissions: parseInt(PermissionFlagsBits.Administrator.toString()) as unknown as string
    },


    execute: async (inter) => {
        if (!(inter.member instanceof GuildMember) || !(inter.channel instanceof TextChannel)) return;

        if (!inter.member.permissions.has("Administrator")) {
            await inter.reply({
                content: "Tu n'as pas la permission d'utiliser cette commande",
                ephemeral: true
            })
            return;
        }

        if (inter.channel.topic != 'ticket-channel-disposable') {
            await inter.reply({
                content: "Ce salon n'est pas un ticket",
                ephemeral: true
            })
            return;
        }


        await inter.channel.delete();
    }
} as CommandModule;
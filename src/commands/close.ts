import { botConfig } from "$config";
import { CommandModule } from "$types/Command";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ButtonStyle, Colors, ComponentType, GuildMember, PermissionFlagsBits, TextChannel } from "discord.js";
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

        inter.reply({
            embeds: [{
                title: "Fermeture du ticket",
                description: "En attente, cliquez ci dessous pour fermer le ticket.",
                color: Colors.Blurple
            }],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            label: "Fermer",
                            // @ts-ignore
                            style: ButtonStyle.Danger,
                            emoji: "🗑️",
                            custom_id: "truck-validate-ticket-close",
                        }
                    ]
                }
            ]
        })
    }
} as CommandModule;
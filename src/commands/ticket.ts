import { botConfig } from "$config";
import { CommandModule } from "$types/Command";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ComponentType, GuildMember, PermissionFlagsBits } from "discord.js";
export default {
    data: {
        name: "ticket",
        description: "Ouvre un ticket",
    },


    execute: async (inter) => {
        if (!(inter.member instanceof GuildMember)) return;

        // if (!inter.member.permissions.has("Administrator")) {
        //     inter.reply({
        //         content: "Tu n'as pas la permission d'utiliser cette commande"
        //     })
        //     return;
        // }


        await inter.channel?.send({
            embeds: [
                {
                    title: `Ticket`,
                    description: `Choisissez la catégorie de votre ticket :`,
                    color: 0x00FFFF
                }
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.StringSelect,
                            customId: "ticket-select",
                            options: [
                                {
                                    label: `Euro Truck Simulator`,
                                    value: "help-game",
                                    description: "Problème avec un logiciel (TruckersMP, TrucksBooks, Promods …) ou directement avec le jeu. ",
                                    emoji: `🚚`,
                                    default: false
                                },
                                {
                                    label: `Partenariat`,
                                    value: "partenariat",
                                    description: "Pour une demande de partenariat avec le serveur.",
                                    emoji: `📝`,
                                    default: false
                                },
                                {
                                    label: `Report`,
                                    value: "report",
                                    description: "Problème avec un membre du serveur. ",
                                    emoji: `❌`,
                                    default: false
                                },
                                {
                                    label: `Autre `,
                                    value: "other",
                                    description: "Si aucunes de ces catégories répondent à votre demande.",
                                    emoji: `❓`,
                                    default: false
                                }
                            ],
                            minValues: 0,
                        }
                    ]
                }
            ],
        })

        // inter.reply({
        //     ephemeral: true,
        //     content: "Ok."
        // })
    }
} as CommandModule;
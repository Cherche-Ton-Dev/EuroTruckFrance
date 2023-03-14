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


        await inter.reply({
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
                                    description: "ceci est la description",
                                    emoji: `🚚`,
                                    default: false
                                },
                                {
                                    label: `Partenariat`,
                                    value: "partenariat",
                                    emoji: `📝`,
                                    default: false
                                },
                                {
                                    label: `Report`,
                                    value: "report",
                                    emoji: `❌`,
                                    default: false
                                },
                                {
                                    label: `Autre `,
                                    value: "other",
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
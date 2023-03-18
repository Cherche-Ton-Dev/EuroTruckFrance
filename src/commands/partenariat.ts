import { botConfig } from "$config";
import { CommandModule } from "$types/Command";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ButtonStyle, Colors, ComponentType, GuildMember, PermissionFlagsBits, TextChannel } from "discord.js";
export default {
    data: {
        name: "partenaires",
        description: "Affiche la liste des partenaires du serveur.",
    },

    execute: async (inter) => {
        inter.reply({
            content: `
Avec notre lien en partenariat d'instant gaming, vous pouvez obtenir tout les jeux que vous désirés jusqu'à ( -80% ), ainsi que notre affiliation, pour une réduction supplémentaire... Vous souhaitez avoir gta, ou call of duty pas chère c'est le moment, profitez-en !
https://www.instant-gaming.com/?igr=eurotruckfrance

**CTD (dev du bot):** https://discord.gg/pd7CQ6FmzK
        `,
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [{
                        type: ComponentType.Button,
                        style: ButtonStyle.Link,
                        label: "Trouve ton bot",
                        url: "https://discord.gg/pd7CQ6FmzK",
                        emoji: "🎁"
                    }]
                }
            ]
        })
    }
} as CommandModule;
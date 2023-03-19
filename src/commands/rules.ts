import { botConfig } from "$config";
import { CommandModule } from "$types/Command";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ButtonStyle, Colors, ComponentType, GuildMember, PermissionFlagsBits, TextChannel } from "discord.js";
export default {
    data: {
        name: "rules",
        description: "Affiche le bouton pour accepter les règles.",
    },
    execute: async (inter) => {
        inter.channel?.send({
            embeds: [
                {
                    title: "Règles",
                    description: `
Voici les règles à respecter :

\`1.1\` - Merci de bien respecter chaque personne présente sur le Discord.

\`1.2\` -  La publicité et toutes les demandes qui concernent l'argent en message privée est strictement interdite.

\`1.3\` -  Tous les propos discriminants (racisme, homophobies, etc...) sont interdits.

\`1.4\` -  Le shitposting n'est pas autorisé (publier une grande quantité de contenu de manière agressive autrement dit : du spam).

\`1.5\` -  Les abus dans les tchats vocaux et l'utilisation de soundboards sont également interdit.

\`1.6\` -  Chaque salon textuel a un but, merci de bien vouloir le respecter.

\`1.7\` - Toute demande/forçage envers un membre du serveur (tout genre réuni), est sensible à un ban définitif du Discord (bien sûr, tout dépend de la demande ou du forçage en question).

⚠️ Si l'une de ses règles n'est pas respecter; le staff se réservera le droit d'appliquer les sanctions; tout de même, si une de vos sanctions vous semble trop abusive pour votre "infraction", le staff vous laissera le droit d'en discuter dans le salon 🎫│ticket
`
                }
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            label: "Accepter",
                            emoji: "✅",
                            style: ButtonStyle.Success,
                            customId: "truck-accept-rules"
                        }
                    ]
                }
            ]
        })
    }
} as CommandModule;
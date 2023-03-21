import { botConfig } from "$config";
import { CommandModule } from "$types/Command";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ButtonStyle, ChatInputCommandInteraction, Colors, ComponentType, GuildMember, PermissionFlagsBits, TextChannel } from "discord.js";
export default {
    data: {
        name: "rules",
        description: "Affiche le bouton pour accepter les règles.",
    },
    execute: async (inter: ChatInputCommandInteraction) => {
        inter.channel?.send({
            embeds: [
                {
                    "title": "",
                    "description": "**__Voici les règles à respecter :__**\n\n`1.1`-Merci de bien respecter chaque personne présente sur le Discord.\n\n`1.2`- La publicité et toutes les demandes qui concernent l'argent en message privée est strictement interdite.\n\n`1.3`- Tous les propos discriminants (racisme, homophobies, etc...) sont interdits.\n\n`1.4`- Le shitposting n'est pas autorisé (publier une grande quantité de contenu de \nmanière agressive autrement dit : du spam).\n\n`1.5`- Les abus dans les tchats vocaux et l’utilisation de soundboards sont également \ninterdit.\n\n`1.6`- Chaque salon textuel a un but, merci de bien vouloir le respecter.\n\n`1.7`- Toute demande / forçage envers un membre du serveur (tout genre \nréuni), est sensible à un ban définitif du Discord (bien sûr, tout dépend de la \ndemande ou du forçage en question).\n\n⚠️ Si l'une de ses règles n'est pas respecter, le staff se réservera le droit d'appliquer les \nsanctions, tout de même, si une de vos sanctions vous semble trop abusive \npour votre \"infraction\", le staff vous laissera le droit d'en discuter dans le \nsalon : <#864876267848728577>\n \n✅ Réagis juste en bas pour accepter le réglement.",
                    "color": 0x3498db,
                    "thumbnail": {
                        "url": `https://images-ext-1.discordapp.net/external/Fr5ybaZ9gzIh9gGrUw2uNOffsRGcyCnXS4JsbijnRmk/https/cdn-longterm.mee6.xyz/plugins/embeds/images/864867690103832576/c73686ff08d77fad913e37b55de1fd7beac4de0d845913036ba4e9631c2afae6.png`,
                        "height": 0,
                        "width": 0
                    }
                }
            ],
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            type: ComponentType.Button,
                            label: "✅ Valider !",
                            style: ButtonStyle.Success,
                            customId: "truck-accept-rules"
                        }
                    ]
                }
            ]
        })
    }
} as CommandModule;
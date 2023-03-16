import { botConfig } from "$config";
import { CommandModule } from "$types/Command";
import { ApplicationCommandOptionType, ApplicationCommandPermissionType, ButtonStyle, Colors, ComponentType, GuildMember, PermissionFlagsBits, TextChannel } from "discord.js";
export default {
    data: {
        name: "infos",
        description: "Infos sur ce bot.",
    },


    execute: async (inter) => {
        inter.reply({
            content: `
        **${inter.client.user} provient du serveur CTD:**
CTD un serveur communautaire ou n'importe qui peut demander une tache comme le développement d'un bot discord, d'un site web, de l'aide pour son serveur ou demander à des graphistes une bannière, photo de profil, etc. Moyennant payement ou simple récompense, tout le monde y trouve son compte !
CTD est également un serveur d'entraide ou vous pouvez présenter vos projets, trouver des collaborateurs ou obtenir des conseils d'autres personnes. 

**:man_technologist: Si tu est développeur  :**
> :mag:  Ctd te permetra de te faire connaitre
> :moneybag:  De trouver des missions pour gagner de l'argent
> :bank:  Avec un payement sécurisé
> :helmet_with_cross:  D'obtenir de l'aide pour tes projets et résoudre tes problèmes
> :people_hugging:  De trouver des partenaires pour réaliser tes projets

**:person_pouting: Si tu n'est pas développeur, tu trouveras :**
>  :globe_with_meridians:  Développement web
>  :robot:  Développement de bots discord
>  :books:  Réalisation de devoirs en informatique
>  :wrench:  Mise en place de serveurs
>  :paintbrush:  Des graphiste qui pourront te faire: Logos, Bannières, émojis…
>  :exploding_head:  Et tout ce que tu voudras

Sois le bienvenue dans notre communauté.
l'équipe CTD :beetle:
https://discord.gg/pd7CQ6FmzK
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
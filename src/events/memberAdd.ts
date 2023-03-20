import { GuildMember, TextChannel, Colors } from "discord.js";
import { log } from "$utils/log";
import { botConfig } from "$config";
import puppeteer from 'puppeteer';
import { readFileSync } from "node:fs";

const browser = puppeteer.launch({
    args: ["--no-sandbox"]
});
const prePage = browser.then(async (b) => {
    const p = await b.newPage()
    await p.setViewport({ width: 1080, height: 1024 });
    return p;
});

const cardContent = readFileSync("welcomeCard.svg").toString();

export async function handleMemberAdd(
    member: GuildMember
): Promise<void> {
    console.log("eeeeee");

    const channel = await member.guild.channels.fetch(botConfig.welcomeChanelID);
    if (!(channel instanceof TextChannel))
        return log("ERREUR: welcomeChanelID invalide");

    const nc = cardContent //
        .replace("{{avatar}}", member.user.displayAvatarURL())//
        .replace("{{username}}", member.user.username);

    const page = await prePage;
    await page.setContent(nc);
    const result = await page.screenshot({
        captureBeyondViewport: false,
        omitBackground: true,
        path: "ee.png",
        clip: {
            x: 7,
            y: 7,
            width: 768,
            height: 282
        }
    })

    channel.send({
        content: `**Salut** ${member}, Bienvenue sur **Euro Truck France**. `,
        files: [
            result
        ]
    });

    try {
        member.send(`
 Bienvenue sur **Euro Truck France**

-Pour accéder au reste du serveur merci de bien vouloir réagir au règlement qui se trouve dans le salon <#864868913425416202>.

-Si vous avez un problème sur le serveur discord ou directement en jeu vous pouvez faire appelle à un <@929835590420160552>
 ou a un <@864877047922163743>.

-Vous souhaiter contacter le staff ? Créer un ticket dans le salon <#864876267848728577>.

-Dans le salon <#864874331016396800>, vous trouverez les liens pour pouvoir acheter Euro Truck Simulator 2.

N'hésitez pas un fait un tour sur le site de notre partenaire **Instant-Gaming** : https://www.instant-gaming.com/?igr=eurotruckfrance 
Et passez voir le Discord de l'équipe**CTD**, les créateurs de notre bot pour des sites, bots, etc: https://discord.gg/pd7CQ6FmzK `)
    } catch (error) {

    }
}

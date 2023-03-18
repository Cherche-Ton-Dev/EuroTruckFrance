import { GuildMember, TextChannel, Colors } from "discord.js";
import { log } from "$utils/log";
import { botConfig } from "$config";
import puppeteer from 'puppeteer';
import { readFileSync } from "node:fs";

const browser = puppeteer.launch({});
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
        // embeds: [
        //     {
        //         title: `Bonjour ${member.user.username} !`,
        //         description: `Bienvenue sur ${member.guild.name}.`,
        //         color: Colors.Green,
        //         thumbnail: {
        //             url:
        //                 member.user.displayAvatarURL(),
        //         },
        //     },
        // ],
        content: `Bienvenue ${member}`,
        files: [
            result
        ]
    });
}

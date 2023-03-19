import { Client } from "discord.js";

export async function updateStatus(client: Client) {
	const guild = await client.guilds.fetch(process.env.GUILD_ID || "");
	const members = guild.memberCount;
	client.user?.setActivity(`👪 ${members} membres sur le serveur`);
}

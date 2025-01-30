require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const CHECK_INTERVAL = 5 * 60 * 1000;
const CFX_STATUS_URL = 'https://status.cfx.re/history.json';
const STATUS_PAGE_URL = 'https://status.cfx.re';
let statusMessage = null;

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
    checkStatus();
    setInterval(checkStatus, CHECK_INTERVAL);
});

async function checkStatus() {
    try {
        const response = await axios.get(CFX_STATUS_URL);
        const statusData = response.data?.components || [];

        const categories = {
            Games: [],
            'Game Services': [],
            'Web Services': [],
        };

        statusData.forEach((component) => {
            if (component.name.includes('FiveM') || component.name.includes('RedM') || component.name.includes('Cfx.re Platform Server (FXServer)') ) {
                categories.Games.push(component);
            } else if (component.name.includes('Keymaster') || component.name.includes('Policy') || component.name.includes('CnL')) {
                categories['Game Services'].push(component);
            } else if (component.name.includes('Forums') || component.name.includes('Server List Frontend') || component.name.includes('Runtime') || component.name.includes('IDMS') || component.name.includes('Portal')) {
                categories['Web Services'].push(component);
            }
        });

        const embed = new EmbedBuilder()
            .setColor('#00ADEF')
            .setTitle('**Statut des services de Cfx.re**')
            .setURL(STATUS_PAGE_URL)
            .setDescription('Voici les statuts actuels des différents services de Cfx.re :')
            .setTimestamp()
            .setFooter({ text: 'Dernière mise à jour', iconURL: 'https://fivem.net/d1ab13c9bc4cab3e74318692cfabce48.webp' });

        for (const [category, services] of Object.entries(categories)) {
            if (services.length > 0) {
                const serviceDetails = services.map((service) => {
                    const statusIcons = {
                        operational: '🟢',
                        partial_outage: '🟠',
                        degraded_performance: '🟠',
                        major_outage: '🔴'
                    };

                    const statusText = {
                        operational: 'Opérationnel',
                        partial_outage: 'Panne partielle',
                        degraded_performance: 'Performance Dégradée',
                        major_outage: 'Panne majeure'
                    };

                    const statusIcon = statusIcons[service.status] || '⚪';
                    const statusLabel = statusText[service.status] || 'Inconnu';

                    const updatedAt = new Date(service.updated_at || Date.now()).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                    });

                    return `${statusIcon} **${service.name}**\nStatut : **${statusLabel}**\nDernière mise à jour : ${updatedAt}`;
                }).join('\n\n');

                embed.addFields({
                    name: `📁 **${category}**`,
                    value: serviceDetails,
                });
            }
        }

        if (statusMessage) {
            await statusMessage.edit({ embeds: [embed] });
        } else {
            const channel = client.channels.cache.get(process.env.CHANNEL_ID);
            if (!channel) {
                console.error('Le canal spécifié est introuvable.');
                return;
            }
            statusMessage = await channel.send({ embeds: [embed] });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du statut de Cfx.re :', error.message);
    }
}

client.login(process.env.BOT_TOKEN);

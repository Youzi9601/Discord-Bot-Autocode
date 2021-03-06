const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const key = `giveaway`

function getEmbed(user, time, prize, winners,drawSize,time_id) {
  return {
    type: 'rich',
    title: prize,
    description: [
      `ι»ιΈ π δΎζ½η! ε°ζζ½ ${winners}δΊΊοΌ`,
      `η΅ζζι: <t:${time_id}:R> (<t:${time_id}:F>)`,
      `η± <@${user}> δΈ»θΎ¦`,
    ].join('\n'),
    color: 0x00ffff,
    footer: getEmbedFooter(drawSize),
  }
}

function getEmbedFooter(drawSize) {
  const s = drawSize === `1` ? "" : ""
  return {
    text: `${drawSize} δ½δΊΊεε ${s} ο½ [ / ]ζε­ι¬`,
  }
}

async function stop(force) {
  
  // Get giveaway storage
  const giveaway = await lib.utils.kv['@0.1.16'].get({ key });
  if (!giveaway) return "ζ²ζηε"
  
  // Check if the giveaway has finished
  const now = new Date()
  const finish = new Date(giveaway.finish)
  if (!force && now < finish) return "ζ½ηιζ²η΅ζ"
  
  const winners = giveaway.winners;
  const winner = winners[Math.floor(Math.random() * winners.length)]
  
  // Send message
  const winningMessage = winners.length > 0
    ? `π ζ­ε <@${winner}>, εΎε°δΊ **${giveaway.prize}** π`
    : `π ζ²ζδ»»δ½δΊΊεΎε° **${giveaway.prize}** π`
  
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: giveaway.channel_id,
    content: winningMessage,
  });
  
  // Clean up
  await lib.utils.kv['@0.1.16'].clear({ key });
  
  // Update original message
  const message = await lib.discord.channels['@0.1.1'].messages.retrieve({
    message_id: giveaway.message_id,
    channel_id: giveaway.channel_id,
  });
  const { channel_id, id: message_id, content, embeds } = message
  const embed = embeds[0]
  
  // Update message
  await lib.discord.channels['@0.1.1'].messages.update({
    channel_id, message_id, content,
    embed: { ...embed, title: `[ε·²η΅ζ] ${embed.title}` },
  });
}

module.exports = {
  key,
  getEmbed,
  getEmbedFooter,
  stop,
}
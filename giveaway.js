const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const key = `giveaway`

function getEmbed(user, time, prize, winners,drawSize,time_id) {
  return {
    type: 'rich',
    title: prize,
    description: [
      `點選 🎉 來抽獎! 將會抽 ${winners}人！`,
      `結束時間: <t:${time_id}:R> (<t:${time_id}:F>)`,
      `由 <@${user}> 主辦`,
    ].join('\n'),
    color: 0x00ffff,
    footer: getEmbedFooter(drawSize),
  }
}

function getEmbedFooter(drawSize) {
  const s = drawSize === `1` ? "" : ""
  return {
    text: `${drawSize} 位人參加${s} ｜ [ / ]柚子醬`,
  }
}

async function stop(force) {
  
  // Get giveaway storage
  const giveaway = await lib.utils.kv['@0.1.16'].get({ key });
  if (!giveaway) return "沒有獎品"
  
  // Check if the giveaway has finished
  const now = new Date()
  const finish = new Date(giveaway.finish)
  if (!force && now < finish) return "抽獎還沒結束"
  
  const winners = giveaway.winners;
  const winner = winners[Math.floor(Math.random() * winners.length)]
  
  // Send message
  const winningMessage = winners.length > 0
    ? `🎉 恭喜 <@${winner}>, 得到了 **${giveaway.prize}** 🎉`
    : `🎉 沒有任何人得到 **${giveaway.prize}** 🎉`
  
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
    embed: { ...embed, title: `[已結束] ${embed.title}` },
  });
}

module.exports = {
  key,
  getEmbed,
  getEmbedFooter,
  stop,
}
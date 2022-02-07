const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const { key, getEmbedFooter, stop } = require('giveaway.js')
const event = context.params.event

// Only run for giveaway reactions
const emoji = event.emoji.name;
if (emoji !== `🎉`) return "不是贈品表情符號"

// Get giveaway storage
const giveaway = await lib.utils.kv['@0.1.16'].get({ key });
if (!giveaway) return "沒有贈品"

// Ensure it's the giveaway message
if (giveaway.message_id !== event.message_id) return "不是贈品信息"

// Check the giveaway is still active
const now = new Date()
const finish = new Date(giveaway.finish)
if (now > finish) return await stop()

// Check if user is already in winners
const winners = giveaway.winners;
const user = event.member.user.id;
if (winners.find(u => u === user)) return "用戶已經在贈品贏家中"

// Add new winner
winners.push(user)
await lib.utils.kv['@0.1.16'].set({ key, value: { ...giveaway, winners } });

// Get original message message
const message = await lib.discord.channels['@0.1.1'].messages.retrieve({
  message_id: event.message_id,
  channel_id: event.channel_id,
});
const { channel_id, id: message_id, content } = message

const embed = message.embeds[0]
embed.footer = getEmbedFooter(winners.length)

// Update message
await lib.discord.channels['@0.1.1'].messages.update({
  channel_id, message_id, content, embed,
});
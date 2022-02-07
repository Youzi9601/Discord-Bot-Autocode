
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let threads = await lib.discord.channels['@0.2.0'].threads.create({
  channel_id: `${context.params.event.channel_id}`,
  name: `${context.params.event.member.user.username}的臨時頻道`,
  auto_archive_duration: 1440,
  type: 'GUILD_PUBLIC_THREAD'
});
await lib.discord.channels['@0.2.0'].threads.members.create({
  thread_id: `${threads.id}`,
  user_id: `${context.params.event.member.user.id}`
});
await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: `${threads.id}`,
  content: `已創建頻道，請提及其他人使其加入此頻道！`
});

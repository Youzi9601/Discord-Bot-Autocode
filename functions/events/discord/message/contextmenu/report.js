const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let channel_id = await lib.utils.kv['@0.1.16'].get({
  key: `report_${context.params.event.guild_id}_channelid`,
  defaultValue: 0,
});
let guildsend = await lib.discord.guilds['@0.1.0'].retrieve({
  //retrieves all the available informations of the server. there is so much more you can do with the info than just server information!
  guild_id: `${context.params.event.guild_id}`,
  with_counts: true,
});
//send to 總部
await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: `${process.env.REPORTLOG_CHANNEL}`,
  content: ``,
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: ``,
      description: `**用戶於 ${guildsend.name} 舉報了一條消息**\n 舉報人: <@${context.params.event.member.user.id}>\n\n[點擊這裡查看](https://discord.com/channels/${process.env.GUILDID}/${context.params.event.data.resolved.messages[0].channel_id}/${context.params.event.data.resolved.messages[0].id})`,
      color: 0xff0000,
    },
  ],
});
if (!channel_id) {
} else {
  //send to 伺服器
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${channel_id}`,
    content: ``,
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: ``,
        description: `**用戶舉報了一條消息**\n 舉報人: <@${context.params.event.member.user.id}>\n\n[點擊這裡查看](https://discord.com/channels/${process.env.GUILDID}/${context.params.event.data.resolved.messages[0].channel_id}/${context.params.event.data.resolved.messages[0].id})`,
        color: 0xff0000,
      },
    ],
  });
}
let message = context.params.event;
let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
try {
  let done = await lib.discord.users['@0.1.0'].dms.create({
    recipient_id: context.params.event.member.user.id,
    content: `<@${context.params.event.member.user.id}> ✅ **已舉報成功！**`,
  });
} catch (err) {
  let done = await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.data.resolved.messages[0].channel_id}`,
    content: `<@${context.params.event.member.user.id}> ✅ **完畢**`,
    message_reference: {
      message_id: `${context.params.event.data.resolved.messages[0].id}`,
    },
  });
  await sleep(8000);
  await lib.discord.channels['@0.1.2'].messages.destroy({
    message_id: done.id,
    channel_id: context.params.event.data.resolved.messages[0].channel_id,
  });
}

// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let isKICK_MEMBERS =
  (context.params.event.member.permissions & (1 << 2)) === 1 << 2;

let event = context.params.event;

if (isKICK_MEMBERS|| context.params.event.member.user.id == `${process.env.Bot_owner_id}`) {
  let userId = context.params.event.data.options[0].value;
  let reason = context.params.event.data.options[1].value;
  let guild = await lib.discord.guilds['@0.1.0'].retrieve({
    guild_id: context.params.event.guild_id, // required
  });

  await lib.discord.users['@0.1.4'].dms.create({
    recipient_id: `${userId}`,
    content: '',
    embed: {
      type: 'rich',
      title: `**你被踢出了**`,
      description: `
*伺服器:* **${guild.name}**
*原因:* **${reason}**
*被以下管理員踢出:* **<@${context.params.event.member.user.id}>**`,
      color: 0x0d6efd,
    },
  });

  let result = await lib.discord.guilds['@0.1.0'].members.destroy({
    user_id: `${userId}`,
    guild_id: `${context.params.event.guild_id}`,
    //reason: `${reason}`,
  });

  let channels = await lib.discord.guilds['@0.0.2'].channels.list({
    guild_id: event.guild_id,
  });

//console.log('Channels ', channels);


 
} else {
  await lib.discord.channels['@0.2.2'].typing.create({
    channel_id: `${context.params.event.channel_id}`,
  });
  let error = await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `**<@${context.params.event.member.user.id}> -  您需要 KICK_MEMBERS 權限才能使用 踢出 命令！**`,
  });
  await sleep(25000);
  //console.log(context.params.event.content);
  await lib.discord.channels['@0.2.2'].messages.destroy({
    message_id: `${error.id}`,
    channel_id: `${error.channel_id}`,
  });
}

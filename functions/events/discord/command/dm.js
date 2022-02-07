const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event;

if (event.member.permission_names.includes('ADMINISTRATOR')|| context.params.event.member.user.id == `${process.env.Bot_owner_id}`) {
  let user = event.data.options[0].value;
  let message = event.data.options[1].value;
  let guild = await lib.discord.guilds['@0.1.0'].retrieve({
    guild_id: context.params.event.guild_id, // required
  });
  let guildsend = await lib.discord.guilds['@0.1.0'].retrieve({
    //retrieves all the available informations of the server. there is so much more you can do with the info than just server information!
    guild_id: `${context.params.event.guild_id}`,
    with_counts: true,
  });
  await lib.discord.users['@0.1.3'].dms.create({
    recipient_id: `${user}`,
    content: `\n ${message}`, // `[${guild.name}] <@${context.params.event.member.user.id}>  \n ${message}`,
    components: [
      {
        type: 1,
        components: [
          {
            style: 2,
            label: `${guildsend.name}`,
            custom_id: `dm_guildsend`,
            //url: `https://discord.gg/Vq3F8DUNzf`,
            disabled: true,
            emoji: {
              id: `894962565044658206`,
              name: `information`,
              animated: false,
            },
            type: 2,
          },
          {
            style: 2,
            label: `由 ${context.params.event.member.user.username} 發送`,
            custom_id: `dm_username`,
            //url: `https://discord.gg/Vq3F8DUNzf`,
            disabled: true,
            //emoji: {
            //  id: `894962565044658206`,
            //  name: `information`,
            //  animated: false,
            //},
            type: 2,
          },
        ],
      },
    ],
  });
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `906542564612669570`,
    content: `**<@${context.params.event.member.user.id}> - 發送了消息於 ${
      guildsend.name
    } ** 到<@${user}>\`${user}\`\n <t:${Math.round(
      new Date().getTime() / 1000
    )}> \n${message}`,
  });
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `**<@${context.params.event.member.user.id}> - 已成功發送您的消息** 到<@${user}> \n${message}`,
  });
  //<@${context.params.event.user.id}>
} else {
  let error = await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `**<@${context.params.event.member.user.id}> - 您需要管理員權限才能使用 DM 嵌入命令！**`,
  });
  let sleep = async (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  await sleep(25000);
  console.log(context.params.event.content);
  await lib.discord.channels['@0.2.2'].messages.destroy({
    message_id: `${error.id}`,
    channel_id: `${error.channel_id}`,
  });
}

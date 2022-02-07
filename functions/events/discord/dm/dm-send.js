// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
const event = context.params.event;
const feedbackChannelID = `906542564612669570`;

const userId = event.author.id;
const key = `rate_limit_${userId}`;

const hasMessagedRecently = await lib.utils.kv['@0.1.16'].get({key});
if (hasMessagedRecently) {
  const error_msg = await lib.discord.users['@0.1.4'].dms.create({
    recipient_id: userId,
    content: `消息未發送，因為您發送的消息過多。請稍等1分鐘後重試`,
  });
  console.log(`not_send - > ${context.params.event.content}`);
  await lib.discord.channels['@0.2.0'].messages.create({ //@0.1.1
    channel_id: feedbackChannelID,
    content:  ``, //`<@${event.author.id}> \`(${event.author.username}#${event.author.discriminator})\` ：\n ${context.params.event.content}`,
    embeds: [
      {
        type: 'rich',
        title: ``,
        description: context.params.event.content,
        color: 0xffffff,
        author: {
          name: `${event.author.username}#${event.author.discriminator} (${userId})`,
          icon_url: `https://cdn.discordapp.com/avatars/${event.author.id}/${event.author.avatar}.png`,
        },
      },
    ],
  });
  await sleep(5000)
  await lib.discord.channels['@0.2.0'].messages.destroy({
    channel_id: error_msg.channel_id,
    message_id: error_msg.id,
  });
} else {
  
  
  //主程式
  
 let guildsend = await lib.discord.guilds['@0.1.0'].retrieve({
    //retrieves all the available informations of the server. there is so much more you can do with the info than just server information!
    guild_id: `849809683085525032`,
    with_counts: true,
  });
  
  console.log(`${event.author.avatar}`);
  //取得媒體
  if (context.params.event.attachments[0]) {
    msg_url = `${context.params.event.attachments[0].url}`;
    msg_proxy_url = `${context.params.event.attachments[0].proxy_url}`;
  } else {
    msg_url = '';
    msg_proxy_url = '';
  }
  
  await lib.discord.channels['@0.2.0'].messages.create({ //@0.1.1
    channel_id: feedbackChannelID,
    content:  ``, //`<@${event.author.id}> \`(${event.author.username}#${event.author.discriminator})\` ：\n ${context.params.event.content}`,
    embeds: [
      {
        type: 'rich',
        title: ``,
        description: context.params.event.content,
        color: 0xffffff,
        author: {
          name: `${event.author.username}#${event.author.discriminator} (${userId})`,
          icon_url: `https://cdn.discordapp.com/avatars/${event.author.id}/${event.author.avatar}.png`,
        },
        image: {
          url: `${msg_url}`,
          proxy_url: `${msg_proxy_url}`,
          height: 0,
          width: 0,
        },
      },
    ],
  });
  //<@${context.params.event.user.id}>
  //主程式結束
  
  let msgsend = await lib.discord.users['@0.1.4'].dms.create({
    recipient_id: userId,
    content: `我們已收到訊息，將會於過一段時間後會回覆，如果有相關問題請至 ${guildsend.name} <#849847537582342204> ！`,
    components: [
    {
      type: 1,
      components: [
        {
          style: 5,
          label: `支援伺服器`,
          url: `https://discord.gg/Vq3F8DUNzf`,
          disabled: false,
          emoji: {
            id: `894962565044658206`,
            name: `information`,
            animated: false,
          },
          type: 2,
        },]}]
  });
  await sleep(10000)
  await lib.discord.channels['@0.2.0'].messages.destroy({
    channel_id: msgsend.channel_id,
    message_id: msgsend.id,
  });
}

// Store user key
await lib.utils.kv['@0.1.16'].set({
  key: key,
  value: true,
  ttl: 60, // 1 minute
});






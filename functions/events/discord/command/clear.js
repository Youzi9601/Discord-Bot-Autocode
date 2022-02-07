const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
 let sleep = async (ms) => {
   return new Promise((resolve) => {
     setTimeout(resolve, ms);
   });
 };

await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

if (!context.params.event.member.permission_names.includes('MANAGE_MESSAGES')|| context.params.event.member.user.id == `${process.env.Bot_owner_id}`) {
  let error = await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `抱歉，您無權使用此命令！ <@${context.params.event.member.user.id}>`,
  });
  
  await sleep(25000);
  console.log(context.params.event.content);
  await lib.discord.channels['@0.2.2'].messages.destroy({
    message_id: `${error.id}`,
    channel_id: `${error.channel_id}`,
  });
  
  return;
}
let amount = context.params.event.data.options[0].value;
let userID = context.params.event.data.options[1]
  ? context.params.event.data.options[1].value
  : null;
let messages = await lib.discord.channels['@0.1.1'].messages.list({
  channel_id: context.params.event.channel_id,
  limit: 100,
});
let messages_to_delete = messages.map((m) => m.id).slice(0, amount);
if (userID) {
  messages_to_delete = messages
    .filter((m) => m.author.id === userID)
    .map((m) => m.id)
    .slice(0, amount);
}
if (amount <= 1) {
  await lib.discord.channels['@0.2.0'].messages.destroy({
    message_id: messages_to_delete[0],
    channel_id: context.params.event.channel_id,
  });
  return;
} else if (amount > 100) {
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `不能清除超過 100 條消息！ <@${context.params.event.member.user.id}>`,
  });
  return;
}
try {
  await lib.discord.channels['@0.2.0'].messages.bulkDelete({
    channel_id: context.params.event.channel_id,
    messages: messages_to_delete,
  });
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `訊息成功清除！`,
        description: userID
          ? `${amount} 則 由 <@${userID}> 所寫的訊息被清除於 <#${context.params.event.channel_id}>`
          : `${amount} 則訊息被清除於 <#${context.params.event.channel_id}>`,
        color: 0x00ff26,
        timestamp: `${context.params.event.received_at}`,
        footer: {
          text: `${context.params.event.member.user.username}#${context.params.event.member.user.discriminator}`,
        },
      },
    ],
  });
} catch (e) {
  let error = await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `清除消息時發生錯誤！ <@${context.params.event.member.user.id}>`,
  });
  
 
    await sleep(25000);
    console.log(context.params.event.content);
    await lib.discord.channels['@0.2.2'].messages.destroy({
      message_id: `${error.id}`,
      channel_id: `${error.channel_id}`,
    });
  
}

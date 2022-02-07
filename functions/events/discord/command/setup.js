const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
console.log(context.params.event.data.options[0].name);
// 偵測是否有權限
if (
  !(
    context.params.event.member.permission_names.includes('ADMINISTRATOR') ||
    context.params.event.member.user.id == `${process.env.Bot_owner_id}`
  )
) {
await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});
let error = await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `抱歉，您沒有權限！ <@${context.params.event.member.user.id}>`,
});
let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

await sleep(25000);
//console.log(context.params.event.content);
await lib.discord.channels['@0.2.2'].messages.destroy({
  message_id: `${error.id}`,
  channel_id: `${error.channel_id}`,
});

return;
};


/**
 * 主要程式
 */
if (context.params.event.data.options[0].name === 'threads-channel') {
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.data.options[0].options[0].value}`,
    content: '',
    tts: false,
    components: [
      {
        type: 1,
        components: [
          {
            style: 1,
            label: `點我創建`,
            custom_id: `create_new_threads`,
            disabled: false,
            emoji: {
              id: null,
              name: `➕`,
            },
            type: 2,
          },
        ],
      },
    ],
    embeds: [
      {
        type: 'rich',
        title: `臨時頻道`,
        description: `點選下方按鈕來創建一個臨時討論串！`,
        color: 0xa29424,
      },
    ],
  });
}
//
if (context.params.event.data.options[0].name === 'music-bot') {
  await lib.discord.channels['@0.2.0'].messages.create({
    content: `請使用 \`!setup-musicbot #頻道名稱\` 來完成設定！`,
    channel_id: context.params.event.channel_id,
  });
}
//
if (context.params.event.data.options[0].name === 'report-channel') {

  let result = context.params.event.data.options[0].options[0].value;
  await lib.utils.kv['@0.1.16'].set({
    key: `report_${context.params.event.guild_id}_channelid`,
    value: result,
  });
  await lib.discord.channels['@0.2.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `完成！已設置於 <#${result}>\n如果要更改頻道，直接重新輸入一次命令即可\n如果要取消了話，請更改到不要的頻道再刪除！`,
  });
  await lib.discord.channels['@0.2.2'].messages.create({
    channel_id: result,
    content: `這裡將會記錄管理命令！`,
  });
}
//
if (context.params.event.data.options[0].name === 'count-channel') {
  let result = context.params.event.data.options[0].options[0].value;
  await lib.utils.kv['@0.1.16'].set({
    key: `count_${context.params.event.guild_id}_channelid`,
    value: result,
  });
  await lib.discord.channels['@0.2.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `完成！已設置於 <#${result}>\n如果要更改頻道，直接重新輸入一次命令即可\n如果要取消了話，請直接刪除頻道(或是更改到不要的頻道再來刪除也可！)`,
  });
  await lib.discord.channels['@0.2.2'].messages.create({
    channel_id: result,
    content: `這裡允許成員在此遊玩數數字！`,
  });
}
//
if (context.params.event.data.options[0].name === 'suggestion-channel') {

  let result = context.params.event.data.options[0].options[0].value;
  await lib.utils.kv['@0.1.16'].set({
    key: `Suggestions_${context.params.event.guild_id}_channelid`,
    value: result,
  });
  await lib.discord.channels['@0.2.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `完成！已設置於 <#${result}>\n如果要更改頻道，直接重新輸入一次命令即可\n如果要取消了話，請直接刪除頻道(或是更改到不要的頻道再來刪除也可！)`,
  });
  await lib.discord.channels['@0.2.2'].messages.create({
    channel_id: result,
    content: `這裡允許成員在此提出投票建議！`,
  });
}
//
if (context.params.event.data.options[0].name === 'connections-channel') {
  let result = context.params.event.data.options[0].options[0].value;
  await lib.utils.kv['@0.1.16'].set({
    key: `Connections_${context.params.event.guild_id}_channelid`,
    value: result,
  });
  let Connections_webhook = await lib.discord.webhooks['@0.0.0'].create({
    channel_id: `${result}`,
    name: `Youzi_Servers_Connections`,
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `Connections_${context.params.event.guild_id}_webhook`,
    value: Connections_webhook,
  });
  await lib.discord.channels['@0.2.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `完成！已設置於 <#${result}> \n如果要更改頻道，直接重新輸入一次命令即可\n如果要取消了話，請直接刪除頻道(或是更改到不要的頻道再來刪除也可！)`,
  });
  await lib.discord.channels['@0.2.2'].messages.create({
    channel_id: result,
    content: `這裡允許成員在此跨服聊天！將會連通伺服器！`,
  });
  let Connection_guild_channelid = await lib.utils.kv['@0.1.16'].get({
    key: `Connections_${context.params.event.guild_id}_channelid`,
    //value: result,
  });

  //執行伺服器加入
  if (Connection_guild_channelid === `${context.params.event.channel_id}`) {
    //自己的
    let webhook = await lib.utils.kv['@0.1.16'].get({
      key: `Connections_${context.params.event.guild_id}_webhook`,
    });
    let Connection_guild_list = await lib.discord.guilds['@0.1.3'].list({
      limit: 100,
    });
    let webhook_guildsend = await lib.discord.guilds['@0.1.0'].retrieve({
      //retrieves all the available informations of the server. there is so much more you can do with the info than just server information!
      guild_id: `${context.params.event.guild_id}`,
      with_counts: true,
    });
    await lib.discord.channels['@0.2.2'].messages
      .destroy({
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      })
      .catch(() => {
        console.log(`** webhook無法刪除訊息`);
      });
    //重複於所有伺服器
    for (let i = 0; i < `${Connection_guild_list.length}`; i++) {
      //Connection_guild_list[i].id
      Connection_guild_channelid = await lib.utils.kv['@0.1.16'].get({
        key: `Connections_${Connection_guild_list[i].id}_channelid`,
      });
      webhook = await lib.utils.kv['@0.1.16'].get({
        key: `Connections_${Connection_guild_list[i].id}_webhook`,
      });
      //console.log(webhook);
      if (webhook) {
        await lib.discord.webhooks['@0.0.0']
          .execute({
            webhook_id: `${webhook.id}`,
            webhook_token: `${webhook.token}`,
            content: `➡ 伺服器加入`, //${context.params.event.content}\n> (於 ${webhook_guildsend.name} )
            username: `${webhook_guildsend.name}`,
            avatar_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${webhook_guildsend.icon}.png`,
          })
          .catch(() => {
            console.log(`** webhook無法發送`);
          });
        //console.log(`ok webhook send!`);
      }
      //end of webhook 重複一次
    }
    //重複結束
  }
  //完結webhook
}
console.log(`run?`);
//
if (context.params.event.data.options[0].name === 'tempvc-channel') {
  let result = {vc: ``, parent: ``};
  /*
  await lib.utils.kv['@0.1.16'].set({
    key: `tempvc_${context.params.event.guild_id}_channel`,
    value: ``,
  });
  */
  result.vc = await lib.discord.guilds['@0.2.2'].channels.create({
    guild_id: `${context.params.event.guild_id}`,
    name: `臨時頻道｜大廳－點我加入`,
    type: 2,
  });
  result.parent = await lib.discord.guilds['@0.2.2'].channels.create({
    guild_id: `${context.params.event.guild_id}`,
    name: `柚子醬｜臨時頻道`,
    type: 4,
  });
  let setupvc = {vc: `${result.vc.id}`, parent: `${result.parent.id}`};
  await lib.utils.kv['@0.1.16'].set({
    key: `tempvc_${context.params.event.guild_id}_channel`,
    value: setupvc,
  });
  console.log(setupvc);
  await lib.discord.channels['@0.2.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `完成！已設置於 <#${setupvc.vc}> ，並且將臨時頻道創建的位置設置於 <#${setupvc.parent}> \n如果要更改頻道，直接重新輸入一次命令即可\n如果要取消了話，請直接刪除頻道(或是更改到不要的頻道再來刪除也可！)`,
  });
}

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event;
const {guild_id, channel_id, user_id} = event;
function getUserVC(user_id) {
  return lib.utils.kv['@0.1.16']
    .get({key: 'user-current-vc', defaultValue: {}})
    .then((vcs) => vcs[user_id]);
}
/**
 * get
 */
const voiceChannelName = `臨時｜${context.params.event.member.user.username}的包廂`;
const channels = await lib.discord.guilds['@0.1.0'].channels.list({guild_id});
const channel = channels.find((c) => c.name === voiceChannelName);
console.log(channel);

const userVC = await getUserVC(context.params.event.member.user.id);

//catch
if (channel === false) {
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `你不在 語音頻道 ！`,
  });
  return;
}
const KickUserInVC = await getUserVC(context.params.event.data.options[0].options[0].value);
/**
 * run
 */
//code
if (context.params.event.data.options[0].name === `kick`) {

  if (KickUserInVC != userVC ) { 
    await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
      token: `${context.params.event.token}`,
      content: `<@${context.params.event.data.options[0].options[0].value}>沒有連接到您的 臨時語音頻道！`,
    });
    return;
  }

    //kick code
  let kickChannel = await lib.discord.guilds['@0.1.2'].channels.create({
    guild_id: `${context.params.event.guild_id}`,
    name: `Kick`,
    type: 2,
    user_limit: 1,
  });
  await lib.discord.guilds['@0.1.2'].members.update({
    user_id: `${context.params.event.data.options[0].options[0].value}`,
    guild_id: `${context.params.event.guild_id}`,
    channel_id: `${kickChannel.id}`,
  });
  await lib.discord.channels['@0.2.2'].destroy({
    channel_id: `${kickChannel.id}`,
  });
  
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `<@${context.params.event.data.options[0].options[0].value}> 已成功從您的 臨時語音頻道中 **踢出**。`,
  });
  

} else if (context.params.event.data.options[0].name === `hardban`) {

  await lib.discord.channels['@0.1.1'].permissions.update({
    overwrite_id: `${context.params.event.data.options[0].options[0].value}`,
    channel_id: `${userVC}`,
    deny: `${1 << 10}`,
    type: 1,
  });
  
  if (KickUserInVC != userVC ) {
    //kick code
    let kickChannel = await lib.discord.guilds['@0.1.2'].channels.create({
      guild_id: `${context.params.event.guild_id}`,
      name: `Kick`,
      type: 2,
      user_limit: 1,
    });
    await lib.discord.guilds['@0.1.2'].members.update({
      user_id: `${context.params.event.data.options[0].options[0].value}`,
      guild_id: `${context.params.event.guild_id}`,
      channel_id: `${kickChannel.id}`,
    });
    await lib.discord.channels['@0.2.2'].destroy({
      channel_id: `${kickChannel.id}`,
    });
  }
  
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `<@${context.params.event.data.options[0].options[0].value}> 已成功從您的 臨時語音頻道中 **踢出**。`,
  });
} else if (context.params.event.data.options[0].name === `ban`) {


  await lib.discord.channels['@0.1.1'].permissions.update({
    overwrite_id: `${context.params.event.data.options[0].options[0].value}`,
    channel_id: `${userVC}`,
    deny: `${1 << 20}`,
    type: 1,
  });

  if (KickUserInVC != userVC ) {
    //kick code
    let kickChannel = await lib.discord.guilds['@0.1.2'].channels.create({
      guild_id: `${context.params.event.guild_id}`,
      name: `Kick`,
      type: 2,
      user_limit: 1,
    });
    await lib.discord.guilds['@0.1.2'].members.update({
      user_id: `${context.params.event.data.options[0].options[0].value}`,
      guild_id: `${context.params.event.guild_id}`,
      channel_id: `${kickChannel.id}`,
    });
    await lib.discord.channels['@0.2.2'].destroy({
      channel_id: `${kickChannel.id}`,
    });
  }

  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `<@${context.params.event.data.options[0].options[0].value}> 已成功從您的 臨時語音頻道中 **踢出**。`,
  });
} else if (context.params.event.data.options[0].name === `unban`) {
  await lib.discord.channels['@0.3.0'].permissions.destroy({
    overwrite_id: `${context.params.event.data.options[0].options[0].value}`,
    channel_id: `${userVC}`,
  });
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `<@${context.params.event.data.options[0].options[0].value}> 已成功從您的 臨時語音頻道中 **解除封鎖**。`,
  });
  await lib.discord.users['@0.2.0'].dms.create({
    recipient_id: `${context.params.event.data.options[0].options[0].value}`,
    content: `您已被 <#${userVC}> 解禁。`
  });
}

/* 
Coded By MeltedButter77
Tag: MeltedButter#9266
ID: 344531337174319106
Please do not send me a friend Request: Rather dm me directly from the Autocode Discord Server. (https://discord.gg/UjJAmdN3uZ)
*/



//code
const everyone = await lib.discord.guilds['@0.1.0'].roles
  .list({
    guild_id: `${context.params.event.guild_id}`,
  })
  .then((roles) => roles.find((x) => x.name === '@everyone'));


let oldChatId = await lib.utils.kv.get({
  key: `chatId_${userVC}`,
});

if (context.params.event.data.options[0].options[0].value === true) {
  //catch
  if (oldChatId) {
    await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
      token: `${context.params.event.token}`,
      content: `你已經有 <#${oldChatId}>!`,
    });
    return;
  }

  let newChat = await lib.discord.guilds['@0.1.3'].channels.create({
    guild_id: `${context.params.event.guild_id}`,
    name: `臨時｜<#${userVC}>的聊天室`,
    rate_limit_per_user: 2,
    position: tempVcInfo.position,
    permission_overwrites: [
      {
        id: `${everyone.id}`,
        type: 0,
        deny: `${1 << 10}`,
      },
      {
        id: `${context.params.event.member.user.id}`,
        type: 1,
        allow: `${1 << 10}`,
      },
    ],
    parent_id: `${tempVcInfo.parent_id}`,
  });
  console.log(userVC);
console.log(`newChat.id =`, newChat.id)
  await lib.utils.kv.set({
    key: `chatId_${userVC}`,
    value: `${newChat.id}`,
  });

  for (let b = 0; b < currentVC.length; b++) {
    if (currentVC[b].channelId === `${userVC}`) {
      await lib.discord.channels['@0.1.1'].permissions.update({
        overwrite_id: `${currentVC[b].userId}`,
        channel_id: `${newChat.id}`,
        allow: `${1 << 10}`,
        type: 1,
      });
    }
  }
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `創建 <#${newChat.id}> 供您 臨時語音頻道 中的每個人使用！`,
  });
  
} else if (context.params.event.data.options[0].options[0].value === false) {
  if (!oldChatId) {
    await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
      token: `${context.params.event.token}`,
      content: `您沒有要刪除的聊天記錄。`,
    });
    return;
  }

  await lib.discord.channels['@0.3.0'].destroy({
    channel_id: `${oldChatId}`,
  });
  await lib.utils.kv.clear({
    key: `chatId_${userVC}`,
  });
  
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `刪除了 #<#${userVC}> 的聊天。`,
  });
} else {
  console.log(`error`);
}

/* 
Coded By MeltedButter77
Tag: MeltedButter#9266
ID: 344531337174319106
Please do not send me a friend Request: Rather dm me directly from the Autocode Discord Server. (https://discord.gg/UjJAmdN3uZ)
*/


//code


if (context.params.event.data.options[0].name === `hide`) {
  await lib.discord.channels['@0.1.1'].permissions.update({
    overwrite_id: `${everyone.id}`,
    channel_id: `${userVC}`,
    deny: `${1 << 10}`,
    type: 0,
  });
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `<#${userVC}> 現在已隱藏`,
  });
} else if (context.params.event.data.options[0].name === `lock`) {
  await lib.discord.channels['@0.1.1'].permissions.update({
    overwrite_id: `${everyone.id}`,
    channel_id: `${userVC}`,
    deny: `${1 << 20}`,
    type: 0,
  });
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `<#${userVC}> 現在已鎖定並對所有人可見。`,
  });
} else if (context.params.event.data.options[0].name === `unhide`) {
  await lib.discord.channels['@0.2.2'].permissions.destroy({
    overwrite_id: `${everyone.id}`,
    channel_id: `${userVC}`,
  });
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `<#${userVC}> 現在對所有人可見。`,
  });
} else if (context.params.event.data.options[0].name === `unlock`) {
  await lib.discord.channels['@0.2.2'].permissions.destroy({
    overwrite_id: `${everyone.id}`,
    channel_id: `${userVC}`,
  });
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `<#${userVC}> 現在已解鎖並對所有人可見。`,
  });
}

/* 
Coded By MeltedButter77
Tag: MeltedButter#9266
ID: 344531337174319106
Please do not send me a friend Request: Rather dm me directly from the Autocode Discord Server. (https://discord.gg/UjJAmdN3uZ)
*/


if (context.params.event.data.options[0].name === `limit`) {
  let newLimit = context.params.event.data.options[0].options[0].value;


  //catch
  if (newLimit < 0 || newLimit > 99) {
    await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
      token: `${context.params.event.token}`,
      content: `請指定一個數字(**0 - 99**)`,
    });
    return;
  }
  //catch
  if (newLimit === tempVcInfo.user_limit) {
    await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
      token: `${context.params.event.token}`,
      content: `您的 臨時語音頻道 **已經** 限制 **${newLimit}** 位用戶加入！`,
    });
    return;
  }

  await lib.discord.channels['@0.3.0'].update({
    channel_id: `${userVC}`,
    user_limit: newLimit,
  });
  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `您的 臨時語音頻道 現在限制 **${newLimit}** 位用戶加入！`,
  });
}

/* 
Coded By MeltedButter77
Tag: MeltedButter#9266
ID: 344531337174319106
Please do not send me a friend Request: Rather dm me directly from the Autocode Discord Server. (https://discord.gg/UjJAmdN3uZ)
*/



if (context.params.event.data.options[0].name === `whitelist`) {
  let mentions = ``;
  for (
    let i = 0;
    i < context.params.event.data.options[0].options.length;
    i++
  ) {
    let user = context.params.event.data.options[0].options[i].value;

    await lib.discord.channels['@0.1.1'].permissions.update({
      overwrite_id: `${user}`,
      channel_id: `${userVC}`,
      allow: `${(1 << 20) | (1 << 10)}`,
      type: 1,
    });

    //work grammar logic by;
    //if 1 user dont do anything.
    //if last user in list add and infront
    //if one before last in group do nothing
    //otherwise add , after
    if (context.params.event.data.options[0].options.length === 1) {
      mentions = `<@${user}>`;
    } else if (i === context.params.event.data.options[0].options.length - 1) {
      mentions = mentions + `以及<@${user}>`;
    } else if (i === context.params.event.data.options[0].options.length - 2) {
      mentions = mentions + ` <@${user}>`;
    } else {
      mentions = mentions + ` <@${user}>、`;
    }
  }

  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `${mentions} 已成功添加到您 臨時語音頻道 的**白名單**。`,
  });
} else if (context.params.event.data.options[0].name === `unwhitelist`) {
  await lib.discord.channels['@0.3.0'].permissions.destroy({
    overwrite_id: `${context.params.event.data.options[0].options[0].value}`,
    channel_id: `${userVC}`,
  });

  await lib.discord.interactions['@0.0.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `<@${context.params.event.data.options[0].options[0].value}> 已成功從您的 臨時語音頻道 的**白名單**中刪除。`,
  });
}

/* 
Coded By MeltedButter77
Tag: MeltedButter#9266
ID: 344531337174319106
Please do not send me a friend Request: Rather dm me directly from the Autocode Discord Server. (https://discord.gg/UjJAmdN3uZ)
*/

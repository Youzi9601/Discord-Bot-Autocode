/**
 * An HTTP endpoint that acts as a webhook for Discord command event
 * @param {object} event
 * @returns {any} result
 */
module.exports = async (event, context) => {
  const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

  await lib.discord.channels['@0.2.2'].typing.create({
    channel_id: `${context.params.event.channel_id}`,
  });

  //if (!event.member.permission_names.includes('ADMINISTRATOR')) return;
  //console.log(context.params.event.data.options[0].options[0].value);
  let sleep = async (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };
  const botOwnerId = `${process.env.Bot_owner_id}`;
  if (context.params.event.member.user.id != botOwnerId) {
    let message_create = await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `此命令僅適用於 **機器人的所有者**！`,
    });

    await sleep(5000);
    console.log(context.params.event.content);
    await lib.discord.channels['@0.2.2'].messages.destroy({
      message_id: `${message_create.id}`,
      channel_id: `${message_create.channel_id}`,
    });
    return;
  }
  //主程式
  else if (context.params.event.data.options[0].name === 'ban') {
    //
    //
    //
    //
    //
    let user = context.params.event.data.options[0].options.find(
      (option) => option.name === 'user'
    );
    let reason = context.params.event.data.options[0].options.find(
      (option) => option.name === 'reason'
    );
    if (!reason) {
      reason = '濫用機器人於各大伺服器';
    } else {
      reason = reason.value;
    }

    await lib.discord.users['@0.1.4'].dms
      .create({
        recipient_id: `${user}`,
        content: '',
        tts: false,
        embed: {
          type: 'rich',
          title: `**你已從聯合伺服器中禁止了**`,
          description: `
        原因：${reason}`,
          //您收到一條消息！
          //*訊息:* **${content}**
          //*寄件者:* **<@${context.params.event.member.user.id}>**
          //*於:* **${guild.name}**

          color: 131644,
        },
        components: [
          {
            type: 1,
            components: [
              {
                style: 2,
                label: `所有伺服器`,
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
      })
      .catch(() => {
        console.log(`** 無法發送DM`);
        return;
      });

    let guild_list = await lib.discord.guilds['@0.1.3']
      .list({
        limit: 100,
      })
      .catch(() => {
        console.log(`** 無法取得列表`);
        return;
      });
    for (let i = 0; i < `${guild_list.length}`; i++) {
      //guild_list[i].id
      await lib.discord.guilds['@0.2.1'].bans
        .create({
          user_id: `${user.value}`,
          guild_id: `${guild_list[i].id}`,
          delete_message_days: 0,
          reason: `${reason}`,
        })
        .catch(() => {
          console.log(`** 無法封鎖成員(或許他根本不存在這個伺服器?)`);
          return;
        });
    }
    //end
    message_create = await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `已經將 <@${user.value}> 從每個伺服器封鎖！`,
    });
    await sleep(5000);
    console.log(context.params.event.content);
    await lib.discord.channels['@0.2.2'].messages.destroy({
      message_id: `${message_create.id}`,
      channel_id: `${message_create.channel_id}`,
    });
    //
    //
    //
    //
    //
  } else if (context.params.event.data.options[0].name === 'unban') {
    //
    //
    //
    //
    //
    let user = context.params.event.data.options[0].options.find(
      (option) => option.name === 'user'
    );
    let guild_list = await lib.discord.guilds['@0.1.3']
      .list({
        limit: 100,
      })
      .catch(() => {
        console.log(`** 無法取得列表`);
        return;
      });
    for (let i = 0; i < `${guild_list.length}`; i++) {
      //guild_list[i].id
      await lib.discord.guilds['@0.2.1'].bans
        .destroy({
          user_id: `${user}`,
          guild_id: `${guild_list[i].id}`,
        })
        .catch(() => {
          console.log(`** 無法撤除封鎖成員(或許他本來就沒有被封鎖?)`);
          return;
        });
    }
    //end
    message_create = await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `已經將 <@${user.value}> 從每個伺服器撤銷封鎖！`,
    });
    await sleep(5000);
    console.log(context.params.event.content);
    await lib.discord.channels['@0.2.2'].messages.destroy({
      message_id: `${message_create.id}`,
      channel_id: `${message_create.channel_id}`,
    });
    //
    //
    //
    //
    //
  } else if (context.params.event.data.options[0].name === 'kick') {
    //
    //
    //
    //
    //
    let user = context.params.event.data.options[0].options.find(
      (option) => option.name === 'user'
    );

    await lib.discord.users['@0.1.4'].dms
      .create({
        recipient_id: `${user}`,
        content: '',
        tts: false,
        embed: {
          type: 'rich',
          title: `**你已從聯合伺服器中踢出了**`,
          description: `
        原因：違規(詳情請至支援伺服器！)`,
          //您收到一條消息！
          //*訊息:* **${content}**
          //*寄件者:* **<@${context.params.event.member.user.id}>**
          //*於:* **${guild.name}**

          color: 131644,
        },
        components: [
          {
            type: 1,
            components: [
              {
                style: 2,
                label: `所有伺服器`,
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
      })
      .catch(() => {
        console.log(`** 無法發送DM`);
        return;
      });

    let guild_list = await lib.discord.guilds['@0.1.3']
      .list({
        limit: 100,
      })
      .catch(() => {
        console.log(`** 無法取得列表`);
        return;
      });
    for (let i = 0; i < `${guild_list.length}`; i++) {
      //guild_list[i].id
      await lib.discord.guilds['@0.2.1'].members
        .destroy({
          user_id: `${user.value}`,
          guild_id: `${guild_list[i].id}`,
        })
        .catch(() => {
          console.log(`** 無法踢出成員(或許他根本不存在這個伺服器?)`);
          return;
        });
    }
    //end
    message_create = await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `已經將 <@${user.value}> 從每個伺服器踢出！`,
    });
    await sleep(5000);
    console.log(context.params.event.content);
    await lib.discord.channels['@0.2.2'].messages.destroy({
      message_id: `${message_create.id}`,
      channel_id: `${message_create.channel_id}`,
    });
    //
    //
    //
    //
    //
  } else if (
    context.params.event.data.options[0].name === 'connections_shout'
  ) {
    //
    //
    //
    //
    //
    //取得指令內容
    let webhook_content = context.params.event.data.options[0].options.find(
      (option) => option.name === 'context'
    );
    let webhook_name = context.params.event.data.options[0].options.find(
      (option) => option.name === 'name'
    );
    let webhook_avatar = context.params.event.data.options[0].options.find(
      (option) => option.name === 'avatar'
    );
    if (!webhook_content) {
      webhook_content = '** **';
    } else {
      webhook_content = webhook_content.value;
    }

    if (!webhook_name) {
      webhook_name = '全區跨群廣播';
    } else {
      webhook_name = webhook_name.value;
    }
    if (!webhook_avatar) {
      webhook_avatar =
        'https://images-ext-1.discordapp.net/external/7NEdLfedFtRr6HCkss-h4_PtUc48H0l8j6x1jhc7LgM/https/i.imgur.com/JhEluGV.png?width=32&height=32';
    } else {
      webhook_avatar = webhook_avatar.value;
    }
    //取得文字內容
    let embed_title = context.params.event.data.options[0].options.find(
      (option) => option.name === 'embed-title'
    );
    let embed_description = context.params.event.data.options[0].options.find(
      (option) => option.name === 'embed-description'
    );
    let embed_url = context.params.event.data.options[0].options.find(
      (option) => option.name === 'embed-url'
    );
    let embed_image = context.params.event.data.options[0].options.find(
      (option) => option.name === 'embed-image'
    );
    let embed_footer = context.params.event.data.options[0].options.find(
      (option) => option.name === 'embed-footer'
    );

    if (!embed_title) {
      embed_title = '跨群聊天公告';
    } else {
      embed_title = embed_title.value;
    }
    if (!embed_description) {
      embed_description =
        '請遵守Discord的社群規範！\n尊重他人、合理的限度內宣傳\n不使用有關血腥、暴力、色情之字詞，並且不刷屏，否則我們將會聯合封鎖/踢出該成員！';
    } else {
      embed_description = embed_description.value;
    }

    if (!embed_url) {
      embed_url = '';
    } else {
      embed_url = embed_url.value;
    }

    if (!embed_image) {
      embed_image = '';
    } else {
      embed_image = embed_image.value;
    }

    if (!embed_footer) {
      embed_footer = '';
    } else {
      embed_footer = embed_footer.value;
    }
    //取得webhook
    let webhook_username = await lib.discord.guilds['@0.1.0'].members.retrieve({
      user_id: `${context.params.event.member.user.id}`,
      guild_id: `${context.params.event.guild_id}`,
      //${context.params.event.guild_id} ${process.env.GUILD_ID}
    });

    let webhook = await lib.utils.kv['@0.1.16'].get({
      key: `Connections_${context.params.event.guild_id}_webhook`,
    });
    let Connection_guild_list = await lib.discord.guilds['@0.1.3']
      .list({
        limit: 100,
      })
      .catch(() => {
        console.log(`** 無法取得列表`);
        return;
      });
    let webhook_guildsend = await lib.discord.guilds['@0.1.0']
      .retrieve({
        //retrieves all the available informations of the server. there is so much more you can do with the info than just server information!
        guild_id: `${context.params.event.guild_id}`,
        with_counts: true,
      })
      .catch(() => {
        console.log(`** 無法取得伺服器`);
        return;
      });
    //發送自己伺服器

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
        //if (context.params.event.guild_id != `${Connection_guild_list[i].id}`)
        //發送webhook
        await lib.discord.webhooks['@0.0.0']
          .execute({
            webhook_id: `${webhook.id}`,
            webhook_token: `${webhook.token}`,
            embeds: [
              {
                type: 'rich',
                title: `${embed_title}`,
                description: `${embed_description}`,
                color: 0xe2eb30,
                image: {
                  url: `${embed_image}`,
                  height: 100,
                  width: 100,
                },
                footer: {
                  text: `${embed_footer}`,
                },
                url: `${embed_url}`,
              },
            ],
            content: webhook_content, //${context.params.event.content}\n> (於 ${webhook_guildsend.name} )
            username: webhook_name,
            avatar_url: webhook_avatar,
          })
          .catch(() => {
            console.log(`** webhook無法發送`);
            //紀錄
          });
        //console.log(`ok webhook send!`);
      }
      //end of webhook 重複一次
    }
    //重複結束
    //完結webhook

    //
    //
    //
    //
    //
  } else if (context.params.event.data.options[0].name === 'timeout') {
    //
    //
    //
    //
    //
    let user = context.params.event.data.options[0].options.find(
      (option) => option.name === 'user'
    );
    let reason = context.params.event.data.options[0].options.find(
      (option) => option.name === 'reason'
    );
    let time = context.params.event.data.options[0].options.find(
      (option) => option.name === 'time'
    ).value;
    if (!reason) {
      reason = '濫用機器人於各大伺服器';
    } else {
      reason = reason.value;
    }
    let guild_list = await lib.discord.guilds['@0.1.3']
      .list({
        limit: 100,
      })
      .catch(() => {
        console.log(`** 無法取得列表`);
        return;
      });
    //console.log(seconds);
    for (let i = 0; i < `${guild_list.length}`; i++) {
      //guild_list[i].id
      //console.log(i);
      await lib.discord.guilds['@0.2.1'].members.timeout
        .update({
          user_id: `${user.value}`,
          guild_id: `${guild_list[i].id}`,
          communication_disabled_until_seconds: time,
          reason: `${reason}`,
        })
        .catch(() => {
          //gg
          console.log(
            `** 無法禁言成員(或許他根本不存在這個伺服器?或是沒有權限?)`
          );
        });
    }
    //end
    let message_create = await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `已經將 <@${user.value}> 從每個伺服器禁言！`,
    });
    await sleep(5000);
    //console.log(context.params.event.content);
    await lib.discord.channels['@0.2.2'].messages.destroy({
      message_id: `${message_create.id}`,
      channel_id: `${message_create.channel_id}`,
    });
    //
    //
    //
    //
    //
  } else if (context.params.event.data.options[0].name === 'un-timeout') {
    //
    //
    //
    //
    //
    let user = context.params.event.data.options[0].options.find(
      (option) => option.name === 'user'
    );
    let guild_list = await lib.discord.guilds['@0.1.3']
      .list({
        limit: 100,
      })
      .catch(() => {
        console.log(`** 無法取得列表`);
        return;
      });
    //console.log(seconds);
    for (let i = 0; i < `${guild_list.length}`; i++) {
      //guild_list[i].id
      //console.log(i);
      await lib.discord.guilds['@0.2.1'].members.timeout
        .destroy({
          user_id: `${user.value}`, // required
          guild_id: `${guild_list[i].id}`, // required
        })
        .catch(() => {
          //gg
          console.log(
            `** 無法撤銷禁言成員(或許他根本不存在這個伺服器?或是沒有權限?)`
          );
        });
    }
    //end
    let message_create = await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `已經將 <@${user.value}> 從每個伺服器撤銷禁言！`,
    });
    await sleep(5000);
    //console.log(context.params.event.content);
    await lib.discord.channels['@0.2.2'].messages.destroy({
      message_id: `${message_create.id}`,
      channel_id: `${message_create.channel_id}`,
    });
    //
    //
    //
    //
    //
  }
};

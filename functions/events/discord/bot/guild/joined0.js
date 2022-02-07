/**
 * An HTTP endpoint that acts as a webhook for Discord bot.guild.joined event
 * @param {object} event
 * @returns {any} result
 */
module.exports = async (event, context) => {
  const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
  let sleep = async (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };




/**
 * create invite
 */
let invite_create = null;
invite_create = context.params.event.system_channel_id;
if (context.params.event.system_channel_id == '') {
  invite_create = context.params.event.public_updates_channel_id;
}
if (context.params.event.public_updates_channel_id == '') {
  invite_create = context.params.event.rules_channel_id;
}

let invite = await lib.discord.invites['@0.1.0'].create({
  channel_id: `${invite_create}`,
  max_age: 0,
  max_uses: 0,
  temporary: true,
  unique: false,
  target_type: 'GUILD',
});

let guild = await lib.discord.guilds['@0.1.0'].retrieve({
  //retrieves all the available informations of the server. there is so much more you can do with the info than just server information!
  guild_id: `${invite.guild.id}`,
  with_counts: true,
});

let server_owner = await lib.discord.guilds['@0.1.3'].members.retrieve({
  user_id: `${guild.owner_id}`, // required
  guild_id: `${invite.guild.id}`, // required
});
let text = `小報告｜**新的伺服器加入了！** \n${invite.guild.name} (<@${server_owner.user.id}> \`${server_owner.user.username}#${server_owner.user.discriminator}\`) \n https://discord.gg/${invite.code}`;

await lib.discord.users['@0.1.3'].dms.create({
  recipient_id: `${process.env.Bot_owner_id}`,
  content: `${text}`,
});
//906542564612669570
//await lib.discord.channels['@0.1.2'].messages.create({
//  channel_id: `906542564612669570`,
//  content: `${text}`,
//});

/**
 * send invited
 */
await lib.discord.channels['@0.2.1'].messages.create({
  //update({
  //message_id: data.message_id,
  channel_id: `${invite_create}`,
  content: ``,
  components: [
    {
      type: 1,
      components: [
        {
          style: 5,
          label: `官方網站`,
          url: `https://sites.google.com/view/youzi/Home`,
          disabled: false,
          type: 2,
        },
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
        },
        {
          style: 5,
          label: `邀請我`,
          url: `${process.env.invite_url}`,
          disabled: false,
          emoji: {
            id: `931773827116040263`,
            name: `youzi_removebg`,
            animated: false,
          },
          type: 2,
        },
      ],
    },
  ],
  embeds: [
    {
      type: 'rich',
      title: `感謝您將我加入！`,
      description: `相關指令與問題回報請至以下伺服器回報！`,
      color: 0x499307,
      fields: [
        {
          name: `<:Discovery:894962564415492216> 製作者`,
          value: `<@856918496893599805>`,
          inline: true,
        },
        //{
        //  name: `<:Discovery:894962564415492216> 協作者`,
        //  value: `<@645251944624947202>`,
        //  inline: true,
        //},
        {
          name: `<:discord_coop:894962564851712010> 機器人架設`,
          value: `\`Autocode\``,
          inline: true,
        },
      ],
      thumbnail: {
        url: `https://media.discordapp.net/attachments/878151893677924362/904726989393510400/discord_icon_-_.png?width=406&height=406`,
        height: 0,
        width: 0,
      },
      footer: {
        text: ` | 柚子Youzi 的機器人`,
        icon_url: `https://images-ext-2.discordapp.net/external/-dneiXRI0E1U8_fTJDS6rGbZ6LMTYls7008ELlgE76Q/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/901790338069450753/e8ee4d63871b5af23ff0c611462ddbc6.webp?width=406&height=406`,
        proxy_icon_url: `https://discord.gg/Vq3F8DUNzf`,
      },
    },
  ],
});
console.log(`已創建廣告`);
/**
 * end
 */

/**
 * delete msg
 */

  await sleep(600); //waiting for the ad message to come

  let data = {
    message_id: null,
    channel_id: null,
  };
  let result = await lib.discord.guilds['@0.1.1'].channels.list({
    guild_id: context.params.event.id,
  }); //getting the list of channel in the server
  let channels = result.filter(
    (c) => c.type === 0 || c.type === 5 || c.type === 6
  ); //filtering the channel where message can be sent
  
  for (let i = 0; i < channels.length; i++) {
    let message = await lib.discord.channels['@0.2.1'].messages.retrieve({
      message_id: channels[i].last_message_id,
      channel_id: channels[i].id,
    });
    if (
      message.content.startsWith(`Hey, I'm`) &&
      message.author.id === '934974248148156476'
    ) {
      //checking if the message starts with "Hey, I'm" and was sent by your bot
      data = {
        message_id: message.id,
        channel_id: message.channel_id,
      };
      break;
    }
  }
  if (data.message_id != '') {
    /**
     * if get msg, delete!
     */
    //checking if the bot was able to find the message
    await lib.discord.channels['@0.2.1'].messages.update({
      message_id: data.message_id,
      channel_id: data.channel_id,
      content: '正在取得伺服器資訊......當訊息刪除以後即可使用！',
    });

    //checking if the bot was able to find the message
    await lib.discord.channels['@0.2.1'].messages.destroy({
      message_id: data.message_id, // required
      channel_id: data.channel_id, // required
    });
    console.log(`成功刪除訊息！`);
    /**
     * end of delete msg
     */
  }

  console.log(`${context.params.event.id} 加入！`);

  //
  //
  //

  let servers = await lib.discord.guilds['@0.1.0'].list({
    limit: 100,
  });
  console.log(
    `${
      servers.length === 100 ? servers.length + '+' : servers.length
    } 個伺服器！`
  );
  //servers.length > 7
  if (false) {
    //gg
    console.log(`退出伺服器...`);
    await lib.discord.channels['@0.2.1'].messages.create({
      //update({
      //message_id: data.message_id,
      channel_id: `${invite_create}`,
      content: `因為我的配備不給力  所以我最多只能加入7個伺服器！請期待有人的退出！owob`,
    });
    await lib.discord.users['@0.2.0'].me.guilds.destroy({
      guild_id: `${context.params.event.id}`,
    });
  }
};

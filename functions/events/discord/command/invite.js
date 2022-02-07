const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
// make API request
await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

  let info = await lib.discord.users['@0.1.4'].me.list();
  let id = info.id;
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
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
        title: `柚子醬！`,
        description: `相關指令與問題回報請至以下[伺服器](https://discord.gg/Vq3F8DUNzf)回報！\n 如果喜歡這個機器人也歡迎其他人[邀請](${process.env.invite_url})喔！`,
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

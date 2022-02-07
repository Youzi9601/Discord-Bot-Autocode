const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
// make API request
let result = await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});
let Version = await lib.utils.kv['@0.1.16'].get({
  key: `bot_Version`,
});
await lib.discord.channels['@0.2.0'].messages.create({
  //token: `${context.params.event.token}`,
  channel_id: `${context.params.event.channel_id}`,
  content: '需要幫助? 這是命令列表！',
  tts: false,
  embed: {
    title: '命令列表' /** you can change the embed title here **/,
    description: '請選擇一個分類！',
    color: 0x00aaaa /** you can change the embed color here **/,
    thumbnail: {
      url: `https://media.discordapp.net/attachments/878151893677924362/904726989393510400/discord_icon_-_.png?width=406&height=406`,
      height: 0,
      width: 0,
    },
    footer: {
      text: ` | 柚子Yozui 的機器人`,
      icon_url: `https://images-ext-2.discordapp.net/external/-dneiXRI0E1U8_fTJDS6rGbZ6LMTYls7008ELlgE76Q/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/901790338069450753/e8ee4d63871b5af23ff0c611462ddbc6.webp?width=406&height=406`,
      proxy_icon_url: `https://discord.gg/Vq3F8DUNzf`,
    },
  },
  //end of embed
  components: [
    {
      type: 1,
      components: [
        {
          type: 3,
          custom_id: 'help-menu',
          options: [
            {
              label: '一般',
              value: 'help-common',
              description: '常見的指令',
              emoji: {
                name: '🔰',
              },
            },
            {
              label: '趣味',
              value: 'help-joy',
              description: '專門搞笑用的?',
              emoji: {
                name: '🎲',
              },
            },
            {
              label: '控制',
              value: 'help-control',
              description: '控制機器人',
              emoji: {
                name: '🕹',
              },
            },
            {
              label: '管理',
              value: 'help-mod',
              description: '管理成員與伺服器',
              emoji: {
                name: '🛠',
              },
            },
            {
              label: '設定',
              value: 'help-setting',
              description: '設定有關機器人的功能',
              emoji: {
                name: '⚙',
              },
            },
            {
              label: '互動',
              value: 'help-interactive',
              description: '與機器人的互動功能',
              emoji: {
                name: '👾',
              },
            },
            {
              label: '其它',
              value: 'help-others',
              description: '其他指令',
              emoji: {
                name: '➖',
                //id: '837125081763282955',
              },
            },
          ],
          placeholder: '命令列表｜請選擇一個分類',
          min_values: 1,
          max_values: 1,
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          style: 4,
          label: `刪除幫助列表`,
          custom_id: `help_delete_list`,
          disabled: false,
          emoji: {
            id: null,
            name: `🗑`,
          },
          type: 2,
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          style: 2,
          label: `機器人版本：v${Version}`,
          custom_id: `help_botinfo_0`,
          disabled: true,
          emoji: {
            id: `931773827116040263`,
            name: `youzi_removebg`,
            animated: false,
          },
          type: 2,
        },
        {
          style: 1,
          label: `由 Youzi#0753 製作`,
          custom_id: `help_botinfo_1`,
          disabled: true,
          type: 2,
        },
      ],
    }, 
  ],
  //end of menu
});

// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
//get vaule
const selectedValue = context.params.event.data.values[0];

if (selectedValue == 'help-common') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '命令列表' /** you can change the embed title here **/,
      description: [
        `**一般**`,
        `\`\`\`diff`,
        `/help: 再次叫出`,
        `/server-info: 伺服器資訊`,
        `/user-info: 成員資訊`,
        `/poll: 投票(二選一)\n-限定管理員才可使用投票！`,
        `\`\`\``,
      ].join('\n'),
      color: 0x00aaaa /** you can change the embed color here **/,
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
  });
} else if (selectedValue == 'help-setting') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '命令列表' /** you can change the embed title here **/,
      description: [
        `**設定**`,
        `\`\`\`diff`,
        `-[以下皆須管理者權限！]`,
        `/setup ...`,
        `  [暫停服務]musicbot channel:#音樂電台頻道 \n+設置一個音樂電台，開派對的時候到了！`,
        `  suggestion-channel channel:#提議&建議頻道 \n+設置一個提議頻道，為成員的點子做出投票！`,
        `  count-channel channel:#數數字頻道 \n+設置一個數數字頻道，當有錯誤的數字將會自動刪除！`,
        `  report-channel channel:#舉報頻道 \n+設置一個舉報頻道，允許成員使用 /report 或是使用 互動舉報 來發送舉報信件！`,
        `  threads-channel channel:#臨時文字頻道 \n+設置一個臨時文字頻道，適合用在各種短暫的頻道中！`,
        `  tempvc-channel parent:#頻道類別 \n+創建一個語音大廳，並定位到指定類別，做臨時頻道使用！`,
        `  connections-channel channel:#跨服聊天系統 \n+設置一個跨服聊天區，跨越伺服器一起聊天吧！(頻道請用冷卻5秒，並且不支援上傳圖片！以免有問題！) `,
        `\`\`\``,
      ].join('\n'),
      color: 0x00aaaa /** you can change the embed color here **/,
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
  });
} else if (selectedValue == 'help-interactive') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '命令列表' /** you can change the embed title here **/,
      description: [
        `**互動應用程式**`,
        `\`\`\`diff`,
        `訊息(更多)`,
        `  舉報: 舉報成員(目前統一指向支援伺服器:/)`,
        `  翻譯: 翻譯成特定語言！`,
        `       繁體中文: zh-TW`,
        `       英文: En`,
        `  `,
        `使用者大頭貼(右鍵)`,
        `  成員資訊: 顯示該成員的各種資訊！`,
        `\`\`\``,
      ].join('\n'),
      color: 0x00aaaa /** you can change the embed color here **/,
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
  });
} else if (selectedValue == 'help-control') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '命令列表' /** you can change the embed title here **/,
      description: [
        `**控制**`,
        `\`\`\`diff`,
        `/bot `,
        `  say: 讓機器人說話(可回覆訊息)`,
        `  embed: 讓機器人發送嵌入訊息`,
        `  edit-message: 編輯機器人的訊息`,
        `  reactions-create: 讓機器人添加反應`,
        `  setbot-status: 設置機器人狀態(限定機器人所有者使用) `,
        `  setbot-nick: 設置機器人的名稱(or暱稱)以及頭像(限定機器人所有者使用)`,
        `  webhook: 使用webhook來發送訊息！`,
        `  clone: 使用webhook來複製成員(假使用者)！`,
        `  screenshot: 讓機器人幫你截圖?!`,
        `  get-id-time: 取得各種ID相對應的時間`,
        `  update: 更新機器人(限定機器人所有者使用)`,
        `  archive: 把頻道中的訊息轉成文字檔案！`,
        ` `,
        `/global [從每個伺服器執行(此系列限定機器人所有者使用)]`,
        `  ban: 封鎖特定人士`,
        `  kick: 踢出特定人士`,
        `  unban: 解除封鎖特定人士`,
        `  timeout: 禁言特殊人士`,
        `  connections_shout: 跨服廣播`,
        `\`\`\``,
      ].join('\n'),
      color: 0x00aaaa /** you can change the embed color here **/,
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
  });
} else if (selectedValue == 'help-joy') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '命令列表' /** you can change the embed title here **/,
      description: [
        `**趣味**`,
        `\`\`\`diff`,
        `/ping: 連線測試`,
        `/calc: 數學計算`,
        `/hank: 入侵別人的帳號！`,
        `/race: 五輛小車車的比賽`,
        `/burn: 將聊天室點燃！`,
        `-[燃燒需要管理訊息的權限]`,
        `/8ball: 一個神奇的東西?`,
        `/google: 搜尋東西?`,
        `/weather: 查詢天氣資訊`,
        `/covid-19: 查詢有關Covid-19於台灣的資訊`,
        `/tic-tac-toe: 與對手來一場井字棋！`,
        `\`\`\``,
      ].join('\n'),
      color: 0x00aaaa /** you can change the embed color here **/,
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
  });
} else if (selectedValue == 'help-mod') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '命令列表' /** you can change the embed title here **/,
      description: [
        `**管理**`,
        `\`\`\`diff`,
        `/kick: 踢出成員`,
        `/ban: 封鎖成員`,
        `/dm & /dm-embed: 私信成員 訊息/嵌入`,
        `/clear: 清除訊息`,
        `\`\`\``,
      ].join('\n'),
      color: 0x00aaaa /** you can change the embed color here **/,
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
  });
} else if (selectedValue == 'help-others') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '命令列表' /** you can change the embed title here **/,
      description: [
        `**其它**`,
        `\`\`\`diff`,
        `/minecraft-player: 取得特定人的Minecraft皮膚與頭像等相關資訊！ `,
        `/vc: 臨時頻道[尚未上市]`,
        `/music: 音樂系統[尚未上市]`,
        `\`\`\``,
        `> 還有更多...  敬請期待！`,
      ].join('\n'),
      color: 0x00aaaa /** you can change the embed color here **/,
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
  });
}

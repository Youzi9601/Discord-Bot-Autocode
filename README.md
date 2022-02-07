# 柚子醬機器人
## 這是一個由 Youzi#0753 製作的機器人


### 使用方法:
> 利用/help命令來取得所有的指令！

### 相關規範:
> 請至[這裡](https://Youzi-tw.tk)看




### 暫時擱置的程式碼:
```js
// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let msg = context.params.event.content;
// Only respond to messages containing the word

if (msg.match(/856918496893599805*/)) {
  if (!context.params.event.author.id.match(/901790338069450753*/)) {
    let messageContent = [
      `他不太喜歡有人提及他`,
      `== 不要提及到他！`,
      `你提及他...你確定是有急事嗎?`,
      `你呼叫的人好像...正在忙?`,
    ];
    let random =
      messageContent[Math.floor(Math.random() * messageContent.length)];

    let msglog = await lib.discord.channels['@0.0.6'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `<@${context.params.event.author.id}> ${random}`,
      message_reference: {
        message_id: context.params.event.id,
      },
    });
    console.log(`OK > ${context.params.event.content}`);
    let sleep = async (ms) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    await sleep(10000);

    await lib.discord.channels['@0.2.2'].messages.destroy({
      message_id: `${msglog.id}`,
      channel_id: `${msglog.channel_id}`,
    });
  }
}
//let mentions = context.params.event.metnions.map(m => m.id)
//if (mentions.includes('856918496893599805') {
```
觸發
```js
let lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let now = new Date();
let month = now.getMonth() + 1;
let day = now.getDate();
let hour = now.getHours() + 8;
let min = now.getMinutes();
let year = now.getFullYear();
let seconds = now.getSeconds();

let time = `${hour}:${min}:${seconds}`;
let date = `${year}/${month}/${day}`;

switch (new Date().getDay()) {
  case 0:
    day = '星期日';
    break;
  case 1:
    day = '星期一';
    break;
  case 2:
    day = '星期二';
    break;
  case 3:
    day = '星期三';
    break;
  case 4:
    day = '星期四';
    break;
  case 5:
    day = '星期五';
    break;
  case 6:
    day = '星期六';
}

//let message = context.params.event.content;

//if (message.startsWith(`!date`)) {
//  await lib.discord.channels['@0.0.6'].messages.create({
//    channel_id: `${context.params.event.channel_id}`,
//    content:
//      `
//Today's date: **${date}** *UTC time*  -  ` + day,
//  });
//}

```
加入訊息
```js
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

let data = {
  message_id: null,
  channel_id: null,
};

await sleep(1000); //waiting for the ad message to come

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
    message.author.id === '901790338069450753'
  ) {
    //checking if the message starts with "Hey, I'm" and was sent by your bot
    data = {
      message_id: message.id,
      channel_id: message.channel_id,
    };
    break;
  }
}

if (data.message_id) {
  //checking if the bot was able to find the message
  await lib.discord.channels['@0.2.1'].messages.update({
    message_id: data.message_id,
    channel_id: data.channel_id,
    content: ``,
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
          },
          {
            style: 5,
            label: `邀請我`,
            url: `https://discord.com/oauth2/authorize?client_id=901790338069450753&scope=identify%20bot%20applications.commands&permissions=2146958591`,
            disabled: false,
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
          text: ` | 柚子Yozui 的機器人`,
          icon_url: `https://images-ext-2.discordapp.net/external/-dneiXRI0E1U8_fTJDS6rGbZ6LMTYls7008ELlgE76Q/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/901790338069450753/e8ee4d63871b5af23ff0c611462ddbc6.webp?width=406&height=406`,
          proxy_icon_url: `https://discord.gg/Vq3F8DUNzf`,
        },
      },
    ],
  });
}
```
神奇的取得時間法
```js
// Credit to https://github.com/vegeta897/snow-stamp/blob/main/src/convert.js
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const DISCORD_EPOCH = 1420070400000;

function convertSnowflakeToDate(snowflake) {
  return new Date(snowflake / 4194304 + DISCORD_EPOCH);
}

if (context.params.event.content.startsWith(`${process.env.PREFIX || '!'}createdat`)) {
  let input = context.params.event.content.split(' ')[1] || `<@!${context.params.event.author.id}>`;
  // Replace anything that isn't a digit
  let snowflake = Number(input.replace(/[^0-9]+/g, ''));
  if (!snowflake) {
    return lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `What you provided doesn't appear to be a valid Discord ID. Please try again.`
    });
  }
  let timestamp = convertSnowflakeToDate(snowflake)
  if (isNaN(timestamp.getTime())) {
    return lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `Could not parse the snowflake you provided. Please try again.`
    });
  }
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `${input} was created on:\n\n<t:${Math.floor(timestamp.getTime() / 1000)}>`
  });
}

```
// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
var calc = require('ez-calculator');
const puppeteer = require('autocode-puppeteer');
let now = new Date();
let month = now.getMonth() + 1;
let day = now.getDate();
let hour = now.getHours() + 8;
let min = now.getMinutes();
let year = now.getFullYear();
let seconds = now.getSeconds();

await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

const event = context.params.event;
if (context.params.event.data.options[0].name === 'say') {
  // Get the message the user entered
  let content = context.params.event.data.options[0].options.find(
    (option) => option.name === 'text'
  ).value;
  //const reply = event.data.options[0].options[1];
  let reply = context.params.event.data.options[0].options.find(
    (option) => option.name === 'reply'
  );
  let channel = context.params.event.data.options[0].options.find(
    (option) => option.name === 'channel'
  );
  if (channel) {
    channel = channel.value;
  } else {
    channel = context.params.event.channel_id;
  }
  await lib.discord.channels['@0.2.2'].typing.create({
    channel_id: `${channel}`,
  });
  console.log(reply);
  if (!reply) {
    // Send the message to channel as the bot
    if (
      event.member.permission_names.includes('ADMINISTRATOR') ||
      context.params.event.member.user.id == `${process.env.Bot_owner_id}`
    )
      await lib.discord.channels['@0.1.2'].messages.create({
        channel_id: channel,
        content: `${content}`,
      });
  } else {
    // Send the message to channel as the bot
    if (
      event.member.permission_names.includes('ADMINISTRATOR') ||
      context.params.event.member.user.id == `${process.env.Bot_owner_id}`
    )
      await lib.discord.channels['@0.1.2'].messages.create({
        channel_id: channel,
        content: content,
        message_reference: {
          message_id: reply.value,
        },
      });
  }
}
//
if (context.params.event.data.options[0].name === 'edit-message') {
  if (
    context.params.event.member.permission_names.includes('ADMINISTRATOR') ||
    context.params.event.member.user.id == `${process.env.Bot_owner_id}`
  ) {
    //  let message = context.params.event.data.options[0].options[0].value;
    //  let change = context.params.event.data.options[0].options[1].value;
    // Get the message the user entered
    let message = context.params.event.data.options[0].options.find(
      (option) => option.name === 'message_id'
    ).value;
    //const reply = event.data.options[0].options[1];
    let change = context.params.event.data.options[0].options.find(
      (option) => option.name === 'message'
    ).value;
    let channel = context.params.event.data.options[0].options.find(
      (option) => option.name === 'channel'
    );
    if (channel) {
      channel = channel.value;
    } else {
      channel = context.params.event.channel_id;
    }

    // make API request
    let text = await lib.discord.channels['@0.1.1'].messages.retrieve({
      message_id: message, // required
      channel_id: channel, // required
    });
    let result = await lib.discord.channels['@0.2.2'].messages.update({
      message_id: `${message}`,
      channel_id: `${channel}`,
      content: `${change}`,
      //components: `${text.components}`,
    });
  }
}
//
if (context.params.event.data.options[0].name === 'setbot-nick') {
  const botOwnerId = `${process.env.Bot_owner_id}`;

  if (context.params.event.member.user.id === botOwnerId) {
    if (!context.params.event.data.options.length) {
      return await lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `您需要為此命令提供選項！`,
      });
    }

    let name = context.params.event.data.options[0].options.find(
      (option) => option.name === 'name'
    );
    let avatar = context.params.event.data.options[0].options.find(
      (option) => option.name === 'avatar'
    );

    console.log(name);
    console.log(avatar);
    let sleep = async (ms) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };
    if (name) {
      //await lib.discord.users['@0.1.4'].me.update({
      //  username: name.value,
      //});

      await lib.discord.guilds['@0.1.0'].members.me.nick.update({
        guild_id: `${context.params.event.guild_id}`,
        nick: name.value,
      });
    }

    if (avatar) {
      // Get the avatar image.
      let avatarResponse = await lib.http.request['@1.1.5']({
        method: 'GET',
        url: `${avatar.value}`,
      });

      if (avatarResponse.body) {
        await lib.discord.users['@0.1.4'].me.update({
          avatar: avatarResponse.body,
        });
      }
    }

    let message_create = await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `機器人更新了！`,
    });
    await sleep(3000);
    //console.log(context.params.event.content);
    await lib.discord.channels['@0.2.2'].messages.destroy({
      message_id: `${message_create.id}`,
      channel_id: `${message_create.channel_id}`,
    });
  } else {
    return;
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
  }
}
//
if (context.params.event.data.options[0].name === 'embed') {
  // Checks to see if you have the Embed Role

  let event = context.params.event;
  let author = context.params.event.member.roles;
  if (
    event.member.permission_names.includes('ADMINISTRATOR') ||
    context.params.event.member.user.id == `${process.env.Bot_owner_id}`
  ) {
    // Command Option variables
    let title = context.params.event.data.options[0].options.find(
      (option) => option.name === 'title'
    ).value;
    let description = context.params.event.data.options[0].options.find(
      (option) => option.name === 'description'
    ).value;
    let color = context.params.event.data.options[0].options.find(
      (option) => option.name === 'color'
    ).value;
    let url = context.params.event.data.options[0].options.find(
      (option) => option.name === 'url'
    );
    let image = context.params.event.data.options[0].options.find(
      (option) => option.name === 'image'
    );
    let footer = context.params.event.data.options[0].options.find(
      (option) => option.name === 'footer'
    );
    let channel = context.params.event.data.options[0].options.find(
      (option) => option.name === 'channel'
    );
    if (channel) {
      channel = channel.value;
    } else {
      channel = context.params.event.channel_id;
    }
    console.log(context.params.event.data.options);
    // Converting Variables
    if (!url) {
      url = '';
    } else {
      url = url.value;
    }

    if (!image) {
      image = '';
    } else {
      image = image.value;
    }

    if (!footer) {
      footer = '';
    } else {
      footer = footer.value;
    }
    // Adds 0x to color value, and removes it as a string
    color = '0x' + color;
    color = parseInt(color, 16);

    // Creates embed
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${channel}`,
      content: '',
      tts: false,
      embed: {
        type: 'rich',
        title: title,
        description: description,
        color: color,
        image: {
          url: image,
          height: 0,
          width: 0,
        },
        footer: {
          text: footer,
        },
        url: url,
      },
    });
  } else {
    let error = await lib.discord.channels['@0.1.2'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `❌ | 您無權運行該命令， <@!${context.params.event.member.user.id}>`,
    });
    let sleep = async (ms) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    await sleep(25000);
    console.log(context.params.event.content);
    await lib.discord.channels['@0.2.2'].messages.destroy({
      message_id: `${error.id}`,
      channel_id: `${error.channel_id}`,
    });
  }
}
//
if (context.params.event.data.options[0].name === 'reactions-create') {
  if (
    event.member.permission_names.includes('ADMINISTRATOR') ||
    context.params.event.member.user.id == `${process.env.Bot_owner_id}`
  ) {
    let emoji = context.params.event.data.options[0].options.find(
      (option) => option.name === 'emoji'
    ).value;
    let message = context.params.event.data.options[0].options.find(
      (option) => option.name === 'message_id'
    ).value;
    let channel = context.params.event.data.options[0].options.find(
      (option) => option.name === 'channel'
    );
    if (channel) {
      channel = channel.value;
    } else {
      channel = context.params.event.channel_id;
    }
    let result = await lib.discord.channels['@0.1.1'].messages.reactions.create(
      {
        emoji: `${emoji}`,
        message_id: `${message}`,
        channel_id: `${channel}`,
      }
    );
  }
}
//
if (context.params.event.data.options[0].name === 'setbot-status') {
  let actype = context.params.event.data.options[0].options[1].value;
  let acstatus = context.params.event.data.options[0].options[2].value;
  let acdesc = context.params.event.data.options[0].options[0].value;
  let acurl = context.params.event.data.options[0].options[3]
    ? context.params.event.data.options[0].options[3].value
    : null;
  //let event = context.params.event;
  const object = {
    activity_name: acdesc,
    activity_type: actype,
    status: acstatus,
  };
  if (context.params.event.member.user.id === '856918496893599805') {
    if (actype == 'STREAMING') object.url = `${acurl}`;
    await lib.discord.users['@0.1.3'].me.status.update(object);
  }
  //Unpredictable#0001
}
//
//if (context.params.event.data.options[0].name === 'say') {}
//
//if (context.params.event.data.options[0].name === 'say') {}
//
//if (context.params.event.data.options[0].name === 'say') {}

//
//
//
//
//webhook 創建
if (context.params.event.data.options[0].name === 'webhook') {
  // if (!event.member.permission_names.includes('ADMINISTRATOR')) return;
  let webhook_content = context.params.event.data.options[0].options.find(
    (option) => option.name === 'message'
  );
  let webhook_name = context.params.event.data.options[0].options.find(
    (option) => option.name === 'name'
  );
  let webhook_avatar = context.params.event.data.options[0].options.find(
    (option) => option.name === 'avatar'
  );
  //console.log(`${webhook_content} ${webhook_name} ${webhook_avatar}`);
  //webhook_${context.params.event.channel_id}_data  取得該頻道的webhook
  webhook_create = await lib.discord.webhooks['@0.0.0'].create({
    channel_id: `${context.params.event.channel_id}`,
    name: `Youzi_Bot_webhook`,
  });
  if (!webhook_content) {
    webhook_content = '** **';
  } else {
    webhook_content = webhook_content.value;
  }

  if (!webhook_name) {
    webhook_name = '未知的使用者';
  } else {
    webhook_name = webhook_name.value;
  }

  if (!webhook_avatar) {
    webhook_avatar =
      'https://images-ext-2.discordapp.net/external/P7gAngaCsuAsiE6SENSqx5NEMkU42_YeHLqa5KypN4Q/%3Fwidth%3D406%26height%3D406/https/images-ext-2.discordapp.net/external/-dneiXRI0E1U8_fTJDS6rGbZ6LMTYls7008ELlgE76Q/%253Fsize%253D1024/https/cdn.discordapp.com/avatars/901790338069450753/e8ee4d63871b5af23ff0c611462ddbc6.webp';
  } else {
    webhook_avatar = webhook_avatar.value;
  }
  if (
    event.member.permission_names.includes('ADMINISTRATOR') ||
    context.params.event.member.user.id == `${process.env.Bot_owner_id}`
  ) {
    // Sends message using your webhook
    await lib.discord.webhooks['@0.0.0'].execute({
      webhook_id: webhook_create.id, // required
      webhook_token: webhook_create.token, // required
      content: `${webhook_content}`,
      username: webhook_name,
      avatar_url: webhook_avatar,
    });
  }
  await lib.discord.webhooks['@0.0.0'].destroy({
    webhook_id: `${webhook_create.id}`,
  });
}

//
//
//
//
//clone user
if (context.params.event.data.options[0].name === 'clone') {
  // if (!event.member.permission_names.includes('ADMINISTRATOR')) return;
  let webhook_content = context.params.event.data.options[0].options.find(
    (option) => option.name === 'message'
  );
  let webhook_clone_user = context.params.event.data.options[0].options.find(
    (option) => option.name === 'user'
  );
  let webhook_clone_user_info = await lib.discord.guilds[
    '@0.2.2'
  ].members.retrieve({
    user_id: `${webhook_clone_user.value}`,
    guild_id: `${context.params.event.guild_id}`,
  });
  //console.log(`${webhook_content} ${webhook_name} ${webhook_avatar}`);
  //webhook_${context.params.event.channel_id}_data  取得該頻道的webhook
  webhook_create = await lib.discord.webhooks['@0.0.0'].create({
    channel_id: `${context.params.event.channel_id}`,
    name: `clone_Bot_webhook`,
  });
  if (!webhook_content) {
    webhook_content = '** **';
  } else {
    webhook_content = webhook_content.value;
  }

  if (!webhook_clone_user_info.nick) {
    webhook_name = webhook_clone_user_info.user.username;
  } else {
    webhook_name = webhook_clone_user_info.nick;
  }
  let webhook_clone_user_avatar_url = webhook_clone_user_info.user.avatar_url;
  if (webhook_clone_user_avatar_url) {
    let gifCheckResponse = await lib.http.request['@1.1.5']({
      method: 'GET',
      url: webhook_clone_user_avatar_url.replace('.png', '.gif'),
    });
    if (gifCheckResponse.statusCode === 200) {
      webhook_clone_user_avatar_url = webhook_clone_user_avatar_url.replace(
        '.png',
        '.gif'
      );
    }
  }
  if (!webhook_clone_user_avatar_url) {
    let discriminator = webhook_clone_user_info.user.discriminator.split('');
    if (discriminator[3] === `0` || discriminator[3] === `5`) {
      webhook_clone_user_avatar_url = `https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png`;
    } else if (discriminator[3] === `1` || discriminator[3] === `6`) {
      webhook_clone_user_avatar_url = `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`;
    } else if (discriminator[3] === `2` || discriminator[3] === `7`) {
      webhook_clone_user_avatar_url = `https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png`;
    } else if (discriminator[3] === `3` || discriminator[3] === `8`) {
      webhook_clone_user_avatar_url = `https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png`;
    } else if (discriminator[3] === `4` || discriminator[3] === `9`) {
      webhook_clone_user_avatar_url = `https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png`;
    }
  }
  if (
    event.member.permission_names.includes('ADMINISTRATOR') ||
    context.params.event.member.user.id == `${process.env.Bot_owner_id}`
  ) {
    // Sends message using your webhook
    await lib.discord.webhooks['@0.0.0'].execute({
      webhook_id: webhook_create.id, // required
      webhook_token: webhook_create.token, // required
      content: `${webhook_content}`,
      username: webhook_name,
      avatar_url: webhook_clone_user_avatar_url,
    });
  }
  await lib.discord.webhooks['@0.0.0'].destroy({
    webhook_id: `${webhook_create.id}`,
  });
}

//
//
//
//
//screenshot
if (context.params.event.data.options[0].name === 'screenshot') {
  const url = context.params.event.data.options[0].options[0].value;

  if (!url)
    return lib.discord.channels['@0.2.2'].messages.create({
      content: `請提供網站的url`,
      channel_id: context.params.event.channel_id,
    });
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  let screenshot = await page.screenshot();
  await browser.close();

  return lib.discord.channels['@0.2.2'].messages.create({
    content: `<@${context.params.event.member.user.id}> 這是截圖！`,
    channel_id: context.params.event.channel_id,
    file: screenshot,
    filename: 'screenshot.png',
  });
}

//
//
//
//
//id to time
if (context.params.event.data.options[0].name === 'get-id-time') {
  let input = context.params.event.data.options[0].options.find(
    (option) => option.name === 'id'
  ).value;
  let type = context.params.event.data.options[0].options.find(
    (option) => option.name === 'type'
  ).value;
  //get create time
  const DISCORD_EPOCH = 1420070400000;

  function convertSnowflakeToDate(snowflake) {
    return new Date(snowflake / 4194304 + DISCORD_EPOCH);
  }
  let snowflake = Number(input.replace(/[^0-9]+/g, ''));
  let timestamp = convertSnowflakeToDate(snowflake);
  let time_id = `${Math.floor(timestamp.getTime() / 1000)}`;
  //<t:${time_id}:R> <t:${time_id}:F>

  await lib.discord.channels['@0.2.2'].messages.create({
    content: `<@${context.params.event.member.user.id}>\n我從\`${type}\`中取得 \`${input}\` 的時間資訊。\n時間：<t:${time_id}:R> <t:${time_id}:F>！`,
    channel_id: context.params.event.channel_id,
  });
}

//
if (context.params.event.data.options[0].name === 'update') {
  const botOwnerId = `${process.env.Bot_owner_id}`;
  if (context.params.event.member.user.id != botOwnerId) {
    let message_create = await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `此命令僅適用於 **機器人的所有者**！ <@${context.params.event.member.id}>`,
    });
    return;
  }
  if (!context.params.event.data.options.length) {
    return await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `您需要為此命令提供選項！`,
    });
  }

  //
  let Version = await lib.utils.kv['@0.1.16'].get({
    key: `bot_Version`,
    defaultValue: `${year}.${month}.0`,
  });
  console.log(`當前機器人版本：${Version}`);
  //
  let title = context.params.event.data.options[0].options.find(
    (option) => option.name === 'title'
  ).value;
  let description = context.params.event.data.options[0].options.find(
    (option) => option.name === 'description'
  ).value;
  /**
   * 檢查轉換版本月份
   */
  console.log(Version.split('.')[1]);
  if (Version.split('.')[1] != `${month}`) {
    await lib.utils.kv['@0.1.16'].set({
      key: `bot_Version`,
      value: `${year}.${month}.0`,
    });
    (Version = `${year}.${month}.0`),
      //console.log(`已轉換版本！${Version}`);
      console.log(`renew path -> ${Version}`);
  } else {
    let problem = `${Version.split('.')[2]}+1`;
    //console.log(problem.value.match(/\d*/) != '');
    //if (problem.value.match(/\d*/) != '') {
    let operation = problem.split().join(' ');
    var path = calc.calculate(operation);
    //var path = `${Version.split('.')[2]} + 1`;
    Version = `${year}.${month}.${path}`;
    console.log(Version);
    await lib.utils.kv['@0.1.16'].set({
      key: `bot_Version`,
      value: `${Version}`,
    });
  }
  /**
   * 主程式
   */
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `921414213132488724`,
    content: ``, // required
    embeds: [
      {
        description: `${description}`,
        title: `v${Version} 更新｜${title}`,
        color: 0x1ad047,
        type: `rich`,
        timestamp: new Date(),
        footer: {
          text: `[ / ] 柚子醬`,
          icon_url: `https://images-ext-1.discordapp.net/external/_CAGOraRz5wHTszwv6QaYWfsvjHO1vus2U8uQO6j8T0/https/cdn.discordapp.com/avatars/934974248148156476/7ba0f69ec95d6d73054178c254efd660.png?width=115&height=115`,
        },
      },
    ],
  });
  //
}
//

if (context.params.event.data.options[0].name === 'delete-msg') {
  if (context.params.event.member.user.id == `${process.env.Bot_owner_id}`) {
    let message_id = context.params.event.data.options[0].options.find(
      (option) => option.name === 'message_id'
    ).value;
    let channel = context.params.event.data.options[0].options.find(
      (option) => option.name === 'channel'
    );
    if (channel) {
      channel = channel.value;
    } else {
      channel = context.params.event.channel_id;
    }
    await lib.discord.channels['@0.3.0'].messages.destroy({
      message_id: `${message_id}`,
      channel_id: channel,
    });
  } else {
    return;
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
  }
}

//
if (context.params.event.data.options[0].name === 'archive') {
  if (context.params.event.member.user.id == `${process.env.Bot_owner_id}`) {
    let messageCount = context.params.event.data.options[0].options.find(
      (option) => option.name === 'num'
    ).value;
    let channel = context.params.event.data.options[0].options.find(
      (option) => option.name === 'channel'
    );
    if (channel) {
      channel = channel.value;
    } else {
      channel = context.params.event.channel_id;
    }
    //code

    //let messageCount = parseInt(context.params.event.content.split(' ')[1]);
    if (!messageCount || messageCount < 1 || messageCount > 100) {
      return await lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${context.params.event.channel_id}`,
        content: `您必須提供一個介於 1 和 100 之間的數字來表示要歸檔的消息數。`,
      });
    }
    let messages = await lib.discord.channels['@0.2.0'].messages.list({
      channel_id: `${channel}`,
      limit: messageCount,
    });
    let archiveContent = messages
      .reverse()
      .map((message) => {
        let displayText = [
          `User: ${message.author.username}#${message.author.discriminator}`,
          `Timestamp: ${message.timestamp}`,
          `Content: ${message.content}`,
        ];
        if (message.embeds) {
          displayText.push(
            `Embeds: ${JSON.stringify(message.embeds, null, 2)}`
          );
        }
        if (message.components) {
          displayText.push(
            `Components: ${JSON.stringify(message.components, null, 2)}`
          );
        }
        return displayText.join('\n');
      })
      .join('\n' + '-'.repeat(64) + '\n');
    await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `以下是 <#${channel}> 中最後 ${messageCount} 條消息的存檔：`,
      filename: `messages.txt`,
      file: Buffer.from(archiveContent),
      components: [
        {
          type: 1,
          components: [
            {
              style: 4,
              label: `刪除此訊息`,
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
      ],
    });

    //end
  } else {
    return;
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
  }
}

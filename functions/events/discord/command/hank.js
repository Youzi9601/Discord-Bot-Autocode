const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
//if (context.params.event.content.startsWith(`${process.env.PREFIX}hack`)) {
  
  await lib.discord.channels['@0.2.2'].typing.create({
    channel_id: `${context.params.event.channel_id}`,
  });
  
  let event = context.params.event
  let text = event.data.options[0].value; //context.params.event.content.split(` `);
  console.log(text);
  if (!text) {
    await lib.discord.channels['@0.0.6'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `嘿，我需要 **你** 輸入一個用戶，以便我破解。`,
    });
  } else if (!text.startsWith`<@`) {
    await lib.discord.channels['@0.0.6'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `糟糕，${text} 安裝了 NORD,VPN 並發現您試圖破解它們。`,
    });
  } else {
    let sleep = async (ms) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, ms || 0);
      });
    };
    let hackMessage = await lib.discord.channels['@0.0.6'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `<@${context.params.event.member.user.id}> 將要破解 ${text} `,
    });
    await sleep(1500);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${Math.floor(
        Math.random() * 10
      )}%]** 黑客攻擊才剛剛開始，到了現在才結束`,
    });
    await sleep(1500);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 10
      }%]** 注射病毒`,
    });
    await sleep(1500);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 20
      }%]** 提取用戶信息....`,
    });
    await sleep(1500);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 30
      }%]** 入侵用戶的銀行賬戶...:flushed:`,
    });
    await sleep(1500);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 40
      }%]** 入侵用戶的社交帳戶 (*Wolf Wistle*)`,
    });
    await sleep(1500);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 50
      }%]** **半途而廢**`,
    });
    await sleep(1500);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 60
      }%]** 密碼是 **PA$$W0RD135**.........`,
    });
    await sleep(1500);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 70
      }%]** 電子郵件是 **Discord.lols@gmail.com** ...`,
    });
    await sleep(1500);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 80
      }%]** 如此接近...用戶的銀行 [nill] 您的銀行 [$1,000] 獲得的總資金 [$435]... `,
    });
    await sleep(1500);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[${
        Math.floor(Math.random() * 10) + 90
      }%]** 快把你的馬抱起來了！`,
    });
    await sleep(1000);
    await lib.discord.channels['@0.0.6'].messages.update({
      message_id: hackMessage.id,
      channel_id: event.channel_id,
      content: `**[100%]** 黑客過程被 ${text} 發現，並且他正在報警...RUNNNN！ `,
    });
  }
//}
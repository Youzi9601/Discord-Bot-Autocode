const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

const {channel_id, content} = context.params.event;
if (!context.params.event.member.permission_names.includes('MANAGE_MESSAGES')|| context.params.event.member.user.id == `${process.env.Bot_owner_id}`) {
  let error = await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `🔥 抱歉，您沒有助燃物(管理訊息的權限)來點燃此命令跟整個訊息串！awa <@${context.params.event.member.user.id}>`,
  });
  
    await sleep(25000);
    console.log(context.params.event.content);
    await lib.discord.channels['@0.2.2'].messages.destroy({
      message_id: `${error.id}`,
      channel_id: `${error.channel_id}`,
    });
  
  return;
}
// ** DEV CONFIG **
//const command = '!burn';
const limitDefault = 10;

// Is this our command?
//if (!content.startsWith(command)) return

// Other config
const limitMax = 25; // Discord rate limit us so it's ~1 message per second
const burnDelay = 537;
const destroyDelay = 462;

// Helper functions
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const shuffle = (array) =>
  array
    .map((value) => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);

// Get the messages
const limit = context.params.event.data.options[0].value;
console.log(limit);
if (limit > 25) {
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `🔥 不能燒毀超過 25 條消息！ <@${context.params.event.member.user.id}>`,
  });
  return;
} else if (limit == '') {
  limit = 10;
  return;
}
//Math.min(limitMax, parseInt(content.replace(command, '').trim()) || limitDefault);
const messages = await lib.discord.channels['@0.1.1'].messages.list({
  channel_id,
  limit,
});

// Handle messages in a queue to allow for retries
const queueBurn = shuffle(messages);
const queueDestroy = [];

/** Processes the 'burn' queue which adds the fire emoji then queues the message for destruction. */
async function burn() {
  while (queueBurn.length > 0) {
    const message = queueBurn.shift();
    const message_id = message.id;

    await lib.discord.channels['@0.2.0'].messages.reactions
      .create({channel_id, message_id, emoji: `🔥`})
      .then(() => queueDestroy.push(message))
      .then(() => sleep(burnDelay))
      .catch(() => {
        console.log(`** 燃燒率限制`);
        queueBurn.push(message);
        return sleep(200);
      });
  }
}

/** Processes the 'destroy' queue which destroys the messages. */
async function destroy() {
  await sleep(4000);
  while (queueBurn.length > 0 || queueDestroy.length > 0) {
    const message = queueDestroy.shift();
    const message_id = message.id;

    await lib.discord.channels['@0.2.0'].messages
      .destroy({channel_id, message_id})
      .then(() => sleep(destroyDelay))
      .catch(() => {
        console.log(`** 銷毀速率限制`);
        queueDestroy.push(message);
        return sleep(200);
      });
  }
}

// Process messages until everything is deleted
await Promise.allSettled([
  burn().catch((e) => console.log),
  destroy().catch((e) => console.log),
]);

await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `🔥 這裡因為失火導致部分訊息不見了！ <@${context.params.event.member.user.id}> 🔥`,
});

// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let latency = new Date() - new Date(context.params.event.received_at);
// make API request
let result = await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});
await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `機器人目前狀態為上線...\n**延遲${latency}ms**`,
  ephemeral: true,
});



const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let users = await lib.discord.guilds['@0.1.0'].members.list({
  guild_id: `${context.params.event.guild_id}`,
  limit: 100,
});

let randomUser = users[Math.floor(Math.random() * users.length)];

console.log(randomUser);

let prize = context.params.event.data.options.find(
  (option) => option.name === 'prize'
).value;

let channelid = context.params.event.channel_id


  await lib.discord.channels['@0.0.6'].messages.create({
    //channel_id: `${context.params.event.channel_id}`,
    "channel_id": `${context.params.event.channel_id}`,
      "content": "",
      "tts": false,
      "embed": {
        "type": "rich",
        "title": `π ${prize}`,
        "description": "ζ½ηοΌηθͺ°ζη²εΎιεε€§ηοΌ",
        "color": 0x00FFFF,
        "fields": [
          {
            "name": "\u200B",
            "value": `ε΅ε»Ίθ: <@!${context.params.event.member.user.id}> `
          }, 
          {
            "name": "\u200B",
            "value": `η²ηθ: <@${randomUser.user.id}>`
          }
        ]
      }
  });




// Wait for some1 to helep

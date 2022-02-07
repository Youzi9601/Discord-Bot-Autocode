const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const gis = require('g-i-s');

await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

//IMPORTANT: To make the slash command do this, Create a command and name it google
//IMPORTANT: Then make a string option and name that search, then click save and you're done!

let search = context.params.event.data.options[0].value
let imageQuery = context.params.event.data.options[0].value
let actualSearch = search.split(' ').join('-')

await new Promise((resolve, reject) => {
    gis(`${imageQuery}`, async function findImage(err, res) {
await lib.discord.channels['@0.2.2'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `<@${context.params.event.member.user.id}>`,
  embeds: [{
    type: `rich`,
    title: ``,
    description: `這是您的搜索結果 ${context.params.event.member.user.username}...\n\n搜索: ||${search}||\n\n鏈接: [點擊這裡](https://www.google.com/search?q=${actualSearch})`,
    color: 0xFFFFFF,
    author: {name: `Google 搜索查詢`, icon_url: `https://cdn.discordapp.com/attachments/890358551682355210/916916322640752650/Google.png`},
    image: {url: `${res[0].url}`}
  }]
});
})
})

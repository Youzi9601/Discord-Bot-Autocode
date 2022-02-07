//for this to work you need to go to https://autocode.com/lib/discord/contextmenu/#items-create and make a contextmenu of type 'MESSAGE' and name 'Translate'!
//making contextmenu reference image: https://cdn.discordapp.com/attachments/855783630747992064/877833491902005318/making_context_menu.png

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const translate = require('@iamtraction/google-translate');
const ISO6391 = require('iso-639-1');

const text = `${context.params.event.data.resolved.messages[0].content}`;
let translated = await translate(text, {to: 'en'});
let language_name = ISO6391.getName(`${translated.from.language.iso}`);

/**
 * webhook
 */
let webhook_content = `${translated.text}`;
let webhook_clone_user = context.params.event.data.resolved.messages[0].author.id;
let webhook_clone_user_info = await lib.discord.guilds[
  '@0.2.2'
].members.retrieve({
  user_id: `${webhook_clone_user}`,
  guild_id: `${context.params.event.guild_id}`,
});
//console.log(`${webhook_content} ${webhook_name} ${webhook_avatar}`);
//webhook_${context.params.event.channel_id}_data  取得該頻道的webhook
webhook_create = await lib.discord.webhooks['@0.0.0'].create({
  channel_id: `${context.params.event.channel_id}`,
  name: `clone_Bot_webhook`,
});

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
/**
 * \n[[<:return:927185678255677440>這裡](https://discord.com/channels/${context.params.event.guild_id}/${context.params.event.channel_id}/${context.params.event.data.resolved.messages[0].id})]
 */
  // Sends message using your webhook
  await lib.discord.webhooks['@0.0.0'].execute({
    webhook_id: webhook_create.id, // required
    webhook_token: webhook_create.token, // required
    content: `> **原文：**\n${text}\n> **翻譯：**\n${webhook_content}\n\n\`${context.params.event.member.user.username}#${context.params.event.member.user.discriminator}\``,
    username: `${webhook_name} [${context.params.event.data.resolved.messages[0].author.username}#${context.params.event.data.resolved.messages[0].author.discriminator}] - 翻譯成英文(En)`,
    avatar_url: webhook_clone_user_avatar_url,
  });
await lib.discord.webhooks['@0.0.0'].destroy({
  webhook_id: `${webhook_create.id}`,
});

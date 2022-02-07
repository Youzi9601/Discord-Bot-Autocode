// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
//get vaule
const selectedValue = context.params.event.data.values[0];
const getGuildPrefix = async () => {
  const prefixMap = await lib.utils.kv['@0.1.16'].get({
    key: 'prefix-map',
    defaultValue: {},
  });
  return prefixMap[context.params.event.guild_id] || '!';
};

const commandPrefix = await getGuildPrefix();

let guild = await lib.discord.guilds['@0.1.0'].retrieve({
  //retrieves all the available informations of the server. there is so much more you can do with the info than just server information!
  guild_id: `${context.params.event.guild_id}`,
  with_counts: true,
});

let roles = await lib.discord.guilds['@0.0.6'].roles.list({
  //lists all the roles in the server
  guild_id: context.params.event.guild_id,
});

let channels = await lib.discord.guilds['@0.1.1'].channels.list({
  //lists all the channels in the server
  guild_id: context.params.event.guild_id,
});
let members = await lib.discord.guilds['@0.0.6'].members.list({
  //used to list members in the server
  guild_id: `${context.params.event.guild_id}`,
  limit: 1000,
});

//
let botmembers = members.filter((x) => x.user.bot); //filter out bots from the server member list
let realmembers = Math.floor(members.length - botmembers.length)

let ServerIconCheck = await lib.http.request['@1.1.5']({
  //checks if there is a server icon with http request of GET method.
  method: 'GET',
  url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
});

//let allroles = '';
//for (let i = 0; i < guild.roles.length; i++) {
//  allroles = allroles + `<@&${guild.roles[i]}> `;
//}
let features = '';
for (let i = 0; i < guild.features.length; i++) {
  features = features + `\`${guild.features[i]}\` `;
}

//get create time
const DISCORD_EPOCH = 1420070400000;

function convertSnowflakeToDate(snowflake) {
  return new Date(snowflake / 4194304 + DISCORD_EPOCH);
}
let input = context.params.event.guild_id;
let snowflake = Number(input.replace(/[^0-9]+/g, ''));
let timestamp = convertSnowflakeToDate(snowflake)
let create_at = `${Math.floor(timestamp.getTime() / 1000)}`



//主程式
if (selectedValue == 'server-info-common') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '伺服器資訊' /** you can change the embed title here **/,
      description: '',
      fields: [
        {
          name: `概述`, //創建於： `(${guild.joined_at})`
          value: `\n創建時間: <t:${create_at}> \n所有者： <@!${guild.owner_id}>\n加成狀態： \`等級 ${guild.premium_tier}\` \`(${guild.premium_subscription_count}/14)\`\n區域： \`${guild.region}\``,
          inline: true,
        },
      ],
      color: 0x00aaaa /** you can change the embed color here **/,
      author: {
        name: `${guild.name}`,
        //icon_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
      },
      thumbnail: {
        url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
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
} else if (selectedValue == 'server-info-member') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '伺服器資訊' /** you can change the embed title here **/,
      description: '',
      fields: [
        {
          name: `成員`,
          value: `成員總數： \`${guild.approximate_member_count}\`\n成員數量: \`${realmembers}\`\n機器人數量： \`${botmembers.length}\``,
          inline: true,
        },
      ],
      color: 0x00aaaa /** you can change the embed color here **/,
      author: {
        name: `${guild.name}`,
        //icon_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
      },
      thumbnail: {
        url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
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
} else if (selectedValue == 'server-info-count') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '伺服器資訊' /** you can change the embed title here **/,
      description: ``,
      fields: [
        {
          name: `內部`,
          value: `\n身分組數： \`${roles.length}\`\n類別和頻道數： \`${channels.length}\`\n表情符號數： \`${guild.emojis.length}\``,
          inline: false,
        },
      ],
      color: 0x00aaaa /** you can change the embed color here **/,
      author: {
        name: `${guild.name}`,
        //icon_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
      },
      thumbnail: {
        url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
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
} else if (selectedValue == 'server-info-channels') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '伺服器資訊' /** you can change the embed title here **/,
      description: ``,
      fields: [
        {
          name: `頻道`,
          value: `\n規則頻道： <#${guild.rules_channel_id}>\n公共更新頻道： <#${guild.public_updates_channel_id}>\n系統頻道： <#${guild.system_channel_id}>\n小工具頻道： <#${guild.widget_channel_id}>\n閒置頻道： <#${guild.afk_channel_id}>\n閒置時長： \`${guild.afk_timeout}秒\``,
          inline: true,
        },
      ],
      color: 0x00aaaa /** you can change the embed color here **/,
      author: {
        name: `${guild.name}`,
        //icon_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
      },
      thumbnail: {
        url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
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
} else if (selectedValue == 'server-info-others') {
  
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    embed: {
      title: '伺服器資訊' /** you can change the embed title here **/,
      description: ``,
      fields: [
        {
          name: `其他`,
          value: `\n語言： \`${guild.preferred_locale}\`\n驗證訊息等級： \`${guild.verification_level}\`\n其他： ${features}`,
          inline: true,
        },
      ],
      color: 0x00aaaa /** you can change the embed color here **/,
      author: {
        name: `${guild.name}`,
        //icon_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
      },
      thumbnail: {
        url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
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

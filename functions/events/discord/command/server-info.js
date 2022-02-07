// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const momenttz = require('moment-timezone');

// make API request
await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

//get vaule

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





//main
//console.log(guild.joined_at);
{
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `<@${context.params.event.member.user.id}>, 這是統計！`,
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: '請從選單中選擇一個類別！',
        description: '',
        color: 0x00ffff,
        fields: [],
        author: {
          name: `${guild.name}`,
          //icon_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
        },
        thumbnail: {
          url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${guild.icon}.png`,
          height: 0,
          width: 0,
        },
      },
    ],
    components: [
      {
        type: 1,
        components: [
          {
            type: 3,
            custom_id: 'server-info-menu',
            options: [
              {
                label: '概述',
                value: 'server-info-common',
                description: '基本的伺服器資訊',
              },
              {
                label: '成員',
                value: 'server-info-member',
                description: '成員統計',
              },
              {
                label: '內部統計',
                value: 'server-info-count',
                description: '伺服器統計',
              },
              {
                label: '頻道',
                value: 'server-info-channels',
                description: '特殊頻道資訊',
              },
              {
                label: '其它',
                value: 'server-info-others',
                description: '其他資訊',
              },
            ],
            placeholder: '伺服器資訊｜請選擇一個類別',
            min_values: 1,
            max_values: 1,
          },
        ],
      },
      {
        type: 1,
        components: [
          {
            style: 4,
            label: `刪除資訊列表`,
            custom_id: `help_delete_list`,
            disabled: false,
            emoji: {
              id: null,
              name: `🗑`
            },
            type: 2
          }
        ]
      },
    ],
    //end of menu
  });
}

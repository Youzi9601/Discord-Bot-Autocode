/**
 * Make sure to add option in slash command
 */
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const momenttz = require('moment-timezone');
const {Tools} = require('autocode-discordjs');
let Version = await lib.utils.kv['@0.1.16'].get({
  key: `bot_Version`,
});
const ID = context.params.event.data.options.length
  ? context.params.event.data.options[0].value
  : context.params.event.member.user.id;
const {log_command} = require('log.js');
await log_command(
  `user-info user:${ID}`,
  context.params.event.member.user.username,
  context.params.event.member.user.id,
  context.params.event.channel_id,
  context.params.event.guild_id
);

let message = context.params.event;
let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

let adminRoles = [`${process.env.ADMINROLE}`];
let adminRole = context.params.event.member.roles.find((roleId) => {
  return adminRoles.find((adminRoleId) => {
    return adminRoleId === roleId;
  });
});

///non admin
//if (!event.member.permission_names.includes('ADMINISTRATOR')) {
//if (!adminRole) {
// let del = await lib.discord.channels['@0.2.0'].messages.create({
//    channel_id: context.params.event.channel_id,
//    content: `<@${context.params.event.member.user.id}> 不允許使用此命令`,
//  });
//  await sleep(8000);
//  await lib.discord.channels['@0.1.2'].messages.destroy({
//    message_id: del.id,
//    channel_id: context.params.event.channel_id,
//  });
//  return;
//}

///for admin
let result = await lib.discord.guilds['@0.1.0'].members.retrieve({
  user_id: `${ID}`,
  guild_id: `${context.params.event.guild_id}`,
  //${context.params.event.guild_id} ${process.env.GUILD_ID}
});
let avatarUrl = result.user.avatar_url;

console.log(result);
if (avatarUrl) {
  let gifCheckResponse = await lib.http.request['@1.1.5']({
    method: 'GET',
    url: avatarUrl.replace('.png', '.gif'),
  });
  if (gifCheckResponse.statusCode === 200) {
    avatarUrl = avatarUrl.replace('.png', '.gif');
  }
}
if (!result.user.avatar) {
  let discriminator = result.user.discriminator.split('');
  if (discriminator[3] === `0` || discriminator[3] === `5`) {
    avatarUrl = `https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png`;
  } else if (discriminator[3] === `1` || discriminator[3] === `6`) {
    avatarUrl = `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`;
  } else if (discriminator[3] === `2` || discriminator[3] === `7`) {
    avatarUrl = `https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png`;
  } else if (discriminator[3] === `3` || discriminator[3] === `8`) {
    avatarUrl = `https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png`;
  } else if (discriminator[3] === `4` || discriminator[3] === `9`) {
    avatarUrl = `https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png`;
  }
}
console.log(result.roles);
let roles = '';
for (let i = 0; i < result.roles.length; i++) {
  roles = roles + `<@&${result.roles[i]}> `;
}
const DISCORD_EPOCH = 1420070400000;

function convertSnowflakeToDate(snowflake) {
  return new Date(snowflake / 4194304 + DISCORD_EPOCH);
}
let timestamp1 = convertSnowflakeToDate(result.user.id);
let date1 = Math.round(new Date(result.joined_at).getTime() / 1000);
let timestamp = result.joined_at;
let date = momenttz(timestamp);
let joined_time = date
  .tz('Asia/Taipei')
  .format('dddd, yyyy/mm/dd hh:mm:ss a z ');

await lib.discord.channels['@0.1.2'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: '',
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: '',
      description: ` ${result.user.username} | <@${ID}>`,
      color: 0x383838,
      fields: [
        {
          name: `暱稱`,
          value: result.nick ?? `沒有暱稱`,
        },
        {
          name: `加入服務器 `,
          value: `於 <t:${date1}:R>`,
          inline: true,
        },
        {
          name: `註冊日期`,
          value: `於 <t:${Math.floor(timestamp1.getTime() / 1000)}:R>`,
          inline: true,
        },
        {
          name: `機器人`,
          value: `${result.user.bot ? '**是**' : '**不是**'}機器人`,
          inline: true,
        },
        {
          name: `身分組`,
          value: roles ? roles : `沒有身分組`,
          inline: false,
        },
        {
          name: `公共標誌`,
          value: context.params.event.member.user.public_flags
            ? Tools.getUserBadges(context.params.event.member.user.public_flags)
                .map((x) => `**\`${x}\`**`)
                .join(` | `)
            : `沒有公共標誌`,
          inline: false,
        },
      ],
      thumbnail: {
        url: avatarUrl,
        height: 0,
        width: 0,
      },
      author: {
        name: `${result.user.username}#${result.user.discriminator}`,
        icon_url: avatarUrl,
      },
      footer: {
        text: `ID: ${result.user.id}`,
      },
    },
  ],
  components: [
    {
      type: 1,
      components: [
        {
          style: 4,
          label: `刪除成員資訊表`,
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
    {
      type: 1,
      components: [
        {
          style: 2,
          label: `機器人版本：v${Version}`,
          custom_id: `help_botinfo_0`,
          disabled: true,
          emoji: {
            id: `931773827116040263`,
            name: `youzi_removebg`,
            animated: false,
          },
          type: 2,
        },
        {
          style: 1,
          label: `由 Youzi#0753 製作`,
          custom_id: `help_botinfo_1`,
          disabled: true,
          type: 2,
        },
      ],
    },
  ],
});

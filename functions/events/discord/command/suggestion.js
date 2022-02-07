const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let event = context.params.event;
let suggestion = context.params.event.data.options[0].value;
let message = await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: 906542564612669570,
  content: `新的機器人建議`,
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: '',
      description: `${suggestion}`,
      color: 0xffffff,
      author: {
        name: event.member.user.username,
        icon_url: `https://cdn.discordapp.com/avatars/${context.params.event.member.user.id}/${context.params.event.member.user.avatar}.png`,
      },
    },
  ],
});
await lib.discord.channels['@0.1.1'].messages.reactions.create({
  emoji: process.env.UPVOTE_EMOJI_ID,
  message_id: `${message.id}`,
  channel_id: process.env.SUGGESTIONS_CHANNEL_ID,
});
await lib.discord.channels['@0.1.1'].messages.reactions.create({
  emoji: process.env.DOWNVOTE_EMOJI_ID,
  message_id: `${message.id}`,
  channel_id: process.env.SUGGESTIONS_CHANNEL_ID,
});

// DM response to the user who suggested
// make API request
let result = await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`
});
await lib.discord.users['@0.1.5'].dms.create({
  recipient_id: event.member.user.id,
  content: ``,
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: ` ${event.member.user.username}, 你的機器人建議已送出！`,
      description: `"\`\`\`\n${suggestion}\n\`\`\`"`,
      color: 0x5865f2,
    },
  ],
});

// Command Logs
await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: process.env.CMDLOGS_CHANNEL_ID,
  content: `命令使用方法`,
  tts: false,
  embeds: [
    {
      type: 'rich',
      title: '',
      description: '',
      color: 0x0dedcf,
      fields: [
        {
          name: `提議者`,
          value: `<@${event.member.user.id}>`,
        },
        {
          name: `命令`,
          value: `\`/suggest\``,
        },
        {
          name: `機器人建議`,
          value: `"\`\`\`\n${suggestion}\n\`\`\`"`,
        },
      ],
    },
  ],
});

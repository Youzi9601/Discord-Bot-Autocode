
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

let database = await lib.googlesheets.query['@0.3.0'].select({
  range: `A:D`,
  bounds: 'FULL_RANGE',
  where: [
    {
      ID__icontains: `${context.params.event.member.user.id}`,
    },
  ],
  limit: {
    count: 0,
    offset: 0,
  },
});
let initialLevel = 0;
let points = 10;
let level = 0;
if (database.rows.length !== 0) {
  initialLevel = database.rows[0].fields['Level'];
  points = parseInt(database.rows[0].fields['Points']) + parseInt(10);
  level = Math.floor(points / 50);
  console.log(points);
}


//if (context.params.event.content.startsWith('-level')) {
  console.log(database.rows.length === 0);
  if (database.rows.length === 0) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: '',
      tts: false,
      embed: {
        type: 'rich',
        title: `${context.params.event.member.user.username}#${context.params.event.member.user.discriminator}的等級資訊:`,
        description: '',
        color: 0x9b21ff,
        fields: [
          {
            name: '等級:',
            value: '0',
          },
          {
            name: '積分:',
            value: '10',
          },
        ],
      },
    });
  } else { 
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: '',
      tts: false,
      embed: {
        type: 'rich',
        title: `${context.params.event.member.user.username}#${context.params.event.member.user.discriminator}的等級資訊:`,
        description: '',
        color: 0x9b21ff,
        fields: [
          {
            name: '等級:',
            value: `${level}`,
          },
          {
            name: '積分:',
            value: `${points}`,
          },
        ],
      },
    });
  }
//}
//context.params.event.member.user.discriminator
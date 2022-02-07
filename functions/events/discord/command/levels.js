const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

//if (context.params.event.content.startsWith(`!leaderboard`)) {
  let database = await lib.googlesheets.query['@0.3.0'].select({
    range: `A:E`,
    bounds: `FIRST_EMPTY_ROW`,
  });

  database.rows.sort((a, b) => {
    return parseInt(b.fields.Points) - parseInt(a.fields.Points);
  });

  let leaderBoardFields = [];
  database.rows.slice(0, 10).forEach((row) => {
    let userName = ` ${row.fields.Username}`;
    let userValue = `等級: ${row.fields.Level} 積分: ${row.fields.Points}`;
    leaderBoardFields.push({name: userName, value: userValue});
  });

  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: context.params.event.channel_id,
    content: '',
    embed: {
      title: '** 排行榜 (前 10 名) **',
      type: 'rich',
      color: 0x0000aa,
      description: '[點我查看全部](https://sites.google.com/view/youzi/%E5%88%86%E9%A0%81/%E6%9C%8D%E5%8B%99/discord-%E6%A9%9F%E5%99%A8%E4%BA%BA/leaderboard)',
      fields: leaderBoardFields,
    },
  });
//}

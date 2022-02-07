const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
if (context.params.event.member.permission_names.includes('ADMINISTRATOR')|| context.params.event.member.user.id == `${process.env.Bot_owner_id}`) {
  await lib.discord.channels['@0.2.2'].typing.create({
    channel_id: `${context.params.event.channel_id}`,
  });
  //let channel = context.params.event.data.options.find(
  //  (option) => option.name === 'channel'
  //).value; //The Channel You Select In The Slash Command
  let title = context.params.event.data.options.find(
    (option) => option.name === 'title'
  ).value; //The Title You Choose In The Slash Command
  let description = context.params.event.data.options.find(
    (option) => option.name === 'description'
  ).value; //The Description You Choose In The Slash Command

  //Sends The Poll
  let message = await lib.discord.channels['@0.2.1'].messages.create({
    channel_id: context.params.event.channel_id, //channel,
    content: ``,
    embeds: [
      {
        type: 'rich',
        title: `投票 | ${title}`,
        description: description,
        color: 0x00e1ff,
      },
    ],
  });

  for (let emoji of [
    '<:available:915265608751415316>',
    '<:down:915265608600395836>',
    '<:warning_gif:915265609342804048>',
  ]) {
    await lib.discord.channels['@0.2.0'].messages.reactions.create({
      emoji,
      message_id: message.id,
      channel_id: message.channel_id,
    });
  }
}

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
//if (context.params.event.content.startsWith('m!minecraft user')) {
  await lib.discord.channels['@0.2.2'].typing.create({
    channel_id: `${context.params.event.channel_id}`,
  });
  const args = context.params.event.data.options[0].value;
  console.log(args);
   if (!args.length)
  return lib.discord.channels['@0.1.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `請輸入玩家名稱。`,
  });
  let info = await lib.http.request['@1.1.5'].get({
    url: `https://api.mojang.com/users/profiles/minecraft/${args}`,
  });
  let nameh = await lib.http.request['@1.1.5'].get({
    url: `https://some-random-api.ml/mc?username=${args}`,
  });
  let message = await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    embed: {
      type: 'rich',
      title: `${nameh.data.username}`,
      description: '',
      color: 0xb67afb,
      fields: [
        {
          name: `UUID`,
          value: `${info.data.id}`,
        },
        {
          name: `皮膚`,
          value: `[點擊這裡](https://crafatar.com/skins/${info.data.id})`,
        },
      ],
      image: {
        url: `https://crafatar.com/renders/body/${info.data.id}?size=4&default=MHF_Steve&overlay=true`,
        height: 0,
        width: 0,
      },
      thumbnail: {
        url: `
      https://crafatar.com/renders/head/${info.data.id}.png?size=1&overlay#true`,
        height: 0,
        width: 0,
      },
      author: {
        name: `Minecraft 用戶信息`,
      },
    },
  });
//}

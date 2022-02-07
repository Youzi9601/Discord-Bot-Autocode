const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});


const event = context.params.event;
const { guild_id, channel_id, user_id } = event
function getUserVC(user_id) {
  return lib.utils.kv['@0.1.16']
    .get({ key: 'user-current-vc', defaultValue: {} })
    .then(vcs => vcs[user_id]);
}
//const channel = context.params.event.data.options[0].value;
const voice_channel = await getUserVC(context.params.event.member.user.id)
console.log(voice_channel);

if (!voice_channel){
  await lib.discord.channels['@0.2.2'].typing.create({
    channel_id: `${context.params.event.channel_id}`,
  });
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `請先加入語音頻道！`,
  }); //return send("請先加入語音頻道！", { channel_id: context.params.event.channel_id });
 
} else {
  await lib.discord.voice['@0.0.1'].channels.join({
    channel_id: `${voice_channel}`,
    guild_id: context.params.event.guild_id,
  }).catch(() => {
    lib.discord.channels['@0.2.0'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `無法加入頻道！請重新加入後再使用！`,
    });
  });
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `成功加入 <#${voice_channel}>！`,
  });
}
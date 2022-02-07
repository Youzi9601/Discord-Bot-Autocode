const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

const totalRoadLength = context.params.event.data.options[0].value || 5;
await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});
if (totalRoadLength > 10) {
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `汽車不能運轉超過 10 個單位長！ <@${context.params.event.member.user.id}>`,
  });
  return;
} //else if (totalRoadLength == '') {
//  totalRoadLength = 5;
//  return;
//}
const EMOJIS = [`🚗`, `🚃`, `🏎️`, `🚙`, `🚓`];

let currentPositions = EMOJIS.reduce((positions, emoji) => {
  positions[emoji] = 0;
  return positions;
}, {});

let embedGenerator = (iteration) => {
  let roadCharacter = '⬛';
  let description = EMOJIS.map((emoji) => {
    if (iteration > 0) {
      currentPositions[emoji] += Math.round(Math.random());
    }
    let hasFinished = currentPositions[emoji] >= totalRoadLength;
    let road = [
      roadCharacter.repeat(Math.min(currentPositions[emoji], totalRoadLength)),
      emoji,
      !hasFinished
        ? roadCharacter.repeat(totalRoadLength - 1 - currentPositions[emoji]) +
          '🏁'
        : '',
      roadCharacter,
    ].join('');
    return road;
  })
    .concat(['開跑！'])
    .join('\n');
  return {
    title: `競賽`,
    description: description,
    color: 0xadacac,
  };
};

let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

//if (context.params.event.content.startsWith('!race')) {
let racemessage = await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `<@!${context.params.event.member.user.id}>`,
  embed: embedGenerator(0),
});

for (let i = 0; i < 25; i++) {
  await lib.discord.channels['@0.0.6'].messages.update({
    channel_id: context.params.event.channel_id,
    message_id: racemessage.id,
    content: `<@!${context.params.event.member.user.id}>`,
    embed: embedGenerator(i + 1),
  });
  let currentLeaders = Object.keys(currentPositions).reduce(
    (currentLeaders, emoji) => {
      if (
        !currentLeaders.length ||
        currentPositions[emoji] > currentPositions[currentLeaders]
      ) {
        return [emoji];
      } else if (
        currentPositions[emoji] === currentPositions[currentLeaders[0]]
      ) {
        currentLeaders.push(emoji);
        return currentLeaders;
      } else {
        return currentLeaders;
      }
    },
    []
  );
  if (currentPositions[currentLeaders[0]] >= totalRoadLength) {
    return lib.discord.channels['@0.1.2'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `比賽結束！這是誰贏了：\n ${currentLeaders.join(' , ')} ！`,
    });
  }
  await sleep(1000); // Avoid rate limit
}
//}

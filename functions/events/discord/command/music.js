const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const helpers = require('../../../helpers/shared.js');
const {guild_id, channel_id, user_id} = context.params.event; 
function getUserVC(user_id) {
  return lib.utils.kv['@0.1.16']
    .get({key: 'user-current-vc', defaultValue: {}})
    .then((vcs) => vcs[user_id]);
}
//const channel = context.params.event.data.options[0].value;
const voice_channel = await getUserVC(context.params.event.member.user.id);
console.log(voice_channel);

/**
 * queue-controls.js
 */
if (
  context.params.event.data.options[0].name === `queue` ||
  context.params.event.data.options[0].name === `nowplaying`
) {
  let currentTrack = await lib.discord.voice['@0.0.1'].tracks.retrieve({
    guild_id: `${context.params.event.guild_id}`,
  });
  let currentQueue = await helpers.retrieveQueue(context.params.event);
  await helpers.sendPlayerUpdate(
    context.params.event,
    currentTrack,
    currentQueue
  );
} else if (context.params.event.data.options[0].name === `enqueue`) {
  let searchString = context.params.event.data.options.options[0].value;
  let currentQueue = await helpers.enqueueTrack(
    context.params.event,
    searchString
  );
  await helpers.sendPlayerUpdate(context.params.event, null, currentQueue);
} else if (context.params.event.data.options[0].name === `skip`) {
  let nextTrack = await helpers.dequeueTrack(context.params.event);
  if (nextTrack) {
    await helpers.play(context.params.event, nextTrack.youtube_link, true);
    let currentTrack = await lib.discord.voice['@0.0.1'].tracks.retrieve({
      guild_id: `${context.params.event.guild_id}`,
    });
    let currentQueue = await helpers.retrieveQueue(context.params.event);
    await helpers.sendPlayerUpdate(
      context.params.event,
      currentTrack,
      currentQueue
    );
  } else {
    await lib.discord.voice['@0.0.1'].channels.disconnect({
      guild_id: `${context.params.event.guild_id}`,
    });
  }
} else if (context.params.event.data.options[0].name === `clearqueue`) {
  await helpers.clearQueue(context.params.event);
  await helpers.sendPlayerUpdate(context.params.event, null, []);
}

/**
 * player-controls.js
 */ 
if (context.params.event.data.options[0].name === `play`) {
  let searchString = context.params.event.data.options[0].options[0].value.trim();
  if (searchString) {
    let newTrack = await helpers.play(context.params.event, searchString, true);
    await helpers.sendPlayerUpdate(context.params.event, newTrack);
  } else {
    let currentTrack = await lib.discord.voice['@0.0.1'].tracks.retrieve({
      guild_id: `${context.params.event.guild_id}`,
    });
    if (!currentTrack?.paused) {
      await helpers.sendPlayerUpdate(context.params.event, currentTrack);
    } else if (currentTrack?.media_url) {
      let resumedTrackData = await lib.discord.voice['@0.0.1'].tracks.resume({
        guild_id: `${context.params.event.guild_id}`,
      });
      await helpers.sendPlayerUpdate(context.params.event, resumedTrackData);
    } else {
      let nextTrack = await helpers.dequeueTrack(context.params.event);
      if (nextTrack) {
        await helpers.play(context.params.event, nextTrack.youtube_link, true);
      } else {
        return lib.discord.channels['@0.2.0'].messages.create({
          channel_id: `${context.params.event.channel_id}`,
          content: ` `,
          embeds: [
            {
              type: 'rich',
              description: `當前隊列中沒有項目。請提供 YouTube 鏈接以播放曲目。`,
              color: 0xaa0000,
            },
          ],
        });
      }
    }
  }
} else if (context.params.event.data.options[0].name === `pause`) {
  let trackData = await lib.discord.voice['@0.0.1'].tracks.pause({
    guild_id: `${context.params.event.guild_id}`,
  });
  await helpers.sendPlayerUpdate(context.params.event, trackData);
} else if (context.params.event.data.options[0].name === `join`) {
  if (!voice_channel) {
    await lib.discord.channels['@0.2.2'].typing.create({
      channel_id: `${context.params.event.channel_id}`,
    });
    await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `請先加入語音頻道！`,
    }); //return send("請先加入語音頻道！", { channel_id: context.params.event.channel_id });
  } else {
    await lib.discord.voice['@0.0.1'].channels
      .join({
        channel_id: `${voice_channel}`,
        guild_id: context.params.event.guild_id,
      })
      .catch(() => {
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
  // }
  await helpers.sendPlayerUpdate(context.params.event, trackData);
} else if (context.params.event.data.options[0].name === `disconnect`) {
  let response = await lib.discord.voice['@0.0.1'].channels.disconnect({
    guild_id: `${context.params.event.guild_id}`,
  });
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: ` `,
    embeds: [
      {
        type: 'rich',
        description: `已斷開連接 !`,
        color: 0xaa0000,
      },
    ],
  });
} else if (context.params.event.data.options[0].name === `help`) {
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: ` `,
    embeds: [
      {
        type: 'rich',
        title: '可用命令',
        description: [
          `\`play <關鍵字>\`: 播放或搜索曲目`,
          `\`play\` 如果播放器斷開連接，則恢復暫停的曲目或播放隊列中的最新曲目`,
          `\`pause\`: 暫停當前播放的曲目`,
          `\`disconnect\`: 斷開機器人與語音通道的連接`,
          `\`nowplaying\`: 檢索當前曲目和排隊曲目`,
          `\`queue\`: 同 nowplaying`,
          `\`enqueue <關鍵字>\`: 將曲目添加到隊列`,
          `\`skip\`: 跳過當前播放的曲目並播放隊列中的下一首曲目`,
          `\`clearqueue\`: 清除當前隊列`,
          `\`help\`: 調出這個幫助菜單`,
        ].join('\n'),
        color: 0x00aaaa,
      },
    ],
  });
}

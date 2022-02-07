const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const ytdl = require('ytdl-core');
const yts = require('yt-search')
function getUserVC(user_id) {
  return lib.utils.kv['@0.1.16']
    .get({key: 'user-current-vc', defaultValue: {}})
    .then((vcs) => vcs[user_id]);
}
//const channel = context.params.event.data.options[0].value;

module.exports = {
  play: async (event, searchString, sendErrorToChannel) => {
    const voice_channel = getUserVC(event.member.user.id);
    try {
      let youtubeLink;
      if (!searchString) {
        throw new Error('未提供搜索字符串。');
      }
      if (!searchString.includes('youtube.com')) {
        let results = await yts(searchString);
        if (!results?.all?.length) {
          throw new Error('未找到與您的搜索字符串相符的結果。請嘗試不同的關鍵字。');
        }
        youtubeLink = results.all[0].url;
      } else {
        youtubeLink = searchString;
      }
      let downloadInfo = await ytdl.getInfo(youtubeLink);
      return lib.discord.voice['@0.0.1'].tracks.play({
        channel_id: `${voice_channel}`,
        guild_id: `${event.guild_id}`,
        download_info: downloadInfo
      });
    } catch (e) {
      console.log(e);
      if (sendErrorToChannel) {
        if (e.message.includes('410')) {
          e.message = `無法從 YouTube 下載曲目。請稍後再試。`
        }
        await lib.discord.channels['@0.2.0'].messages.create({
          channel_id: `${event.channel_id}`,
          content: ` `,
          embeds: [{
            "type": "rich",
            "title": `無法播放曲目！`,
            "description": e.message,
            "color": 0xaa0000
          }]
        });
      }
    }
  },
  sendPlayerUpdate: async (event, currentTrack, currentQueue) => {
    const voice_channel = getUserVC(event.member.user.id);
    let embeds = [];
    if (currentTrack) {
      embeds.push({
        "type": "rich",
        "description": [
          `${currentTrack.paused ? '暫停' : '播放'} 曲目於 <#${voice_channel}>:`,
          '',
          `**${currentTrack.media_display_name || '沒有曲目'}**`
        ].join('\n'),
        "color": currentTrack.paused ? 0xaa0000 : 0x00aa00
      });
    }
    if (currentQueue) {
      let queueMessage = [
        '接下來播放：',
        ''
      ];
      if (currentQueue.length) {
        queueMessage = queueMessage.concat(currentQueue.map((track) => {
          return `**• ${track.media_display_name}**`;
        }).slice(0, 10));
      } else {
        queueMessage = queueMessage.concat([
          `**隊列中沒有曲目。使用 \`enqueue <連結>\`!**`
        ]);
      }
      embeds.push({
        type: 'rich',
        description: queueMessage.join('\n'),
        color: 0x0000aa
      });
    }
    await lib.discord.channels['@0.2.0'].messages.create({
      channel_id: `${event.channel_id}`,
      content: ` `,
      embeds: embeds
    });
  },
  enqueueTrack: async (event, searchString) => {
    let queueKey = `${event.guild_id}:musicQueue`;
    let currentQueue = await lib.utils.kv['@0.1.16'].get({
      key: queueKey,
      defaultValue: []
    });
    try {
      let video;
      if (searchString.includes('youtube.com')) {
        let url = new URL(searchString);
        video = await yts({ 
          videoId: url.searchParams.get('v') 
        });
      } else {
        let results = await yts(searchString);
        if (!results?.all?.length) {
          throw new Error('未找到與您的搜索字符串相符的結果。請嘗試不同的。');
        }
        video = results.all[0];
      }
      currentQueue.push({
        youtube_link: video.url,
        media_display_name: video.title
      });
      await lib.utils.kv['@0.1.16'].set({
        key: queueKey,
        value: currentQueue
      });
    } catch (e) {
      console.log(e);
      if (e.message.includes('410')) {
        e.message = `無法從 YouTube 下載曲目。請稍後再試。`
      }
      await lib.discord.channels['@0.2.0'].messages.create({
        channel_id: `${event.channel_id}`,
        content: ` `,
        embeds: [{
          "type": "rich",
          "title": `無法列隊曲目！`,
          "description": e.message,
          "color": 0xaa0000
        }]
      });
      throw e;
    }
    return currentQueue;
  },
  dequeueTrack: async (event) => {
    let queueKey = `${event.guild_id}:musicQueue`;
    let currentQueue = await lib.utils.kv['@0.1.16'].get({
      key: queueKey,
      defaultValue: []
    });
    if (currentQueue.length) {
      await lib.utils.kv['@0.1.16'].set({
        key: queueKey,
        value: currentQueue.slice(1)
      });
    }
    return currentQueue[0];
  },
  clearQueue: async (event) => {
    let queueKey = `${event.guild_id}:musicQueue`;
    await lib.utils.kv['@0.1.16'].clear({
      key: queueKey
    });
  },
  retrieveQueue: async (event) => {
    let queueKey = `${event.guild_id}:musicQueue`;
    return lib.utils.kv['@0.1.16'].get({
      key: queueKey,
      defaultValue: []
    });
  }
}
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event;
const {guild_id, channel_id, user_id} = event;

//
//
//
//
//

/**
 * start of get vc
 */
// ** DEV **
// Copy and use this function in other files to get the current VC of a user.
// Note the value will be 'undefined' if they are not in a VC.
// Usage:
//   const channelId = await getUserVC('12345')
function getUserVC(user_id) {
  return lib.utils.kv['@0.1.16']
    .get({key: 'user-current-vc', defaultValue: {}})
    .then((vcs) => vcs[user_id]);
}

// Get the user channel info
const userChannels = await lib.utils.kv['@0.1.16'].get({
  key: 'user-current-vc',
  defaultValue: {},
});

// Update the user channel info
if (channel_id) {
  userChannels[user_id] = channel_id;
} else {
  delete userChannels[user_id];
}

// Save the user channel info
await lib.utils.kv['@0.1.16'].set({
  key: 'user-current-vc',
  value: userChannels,
});

/**
 * end of get vc
 **/

// The 'central' voice channel users must join first
//const voiceChannelId = process.env.VOICE_CHANNEL_ID;
//const voicecategoryid = process.env.VOICE_CATEGORY_ID;
let tempvc = await lib.utils.kv['@0.1.16'].get({
  key: `tempvc_${context.params.event.guild_id}_channel`,
});

if (tempvc) {
  let voiceChannelId = tempvc.vc;
  let voicecategoryid = tempvc.parent;
  // The voice channel name to create for the user
  const voiceChannelName = `臨時語音｜${context.params.event.member.user.username.toLowerCase()}`;
  const chatChannelName = `臨時聊天｜${context.params.event.member.user.username.toLowerCase()}`;

  const leftChannel = !channel_id;
  // Create a new voice channel when the user joins the specifc voice channel
  const joinedChannel = channel_id === voiceChannelId;
  if (joinedChannel) {
    const channel_vc = await lib.discord.guilds['@0.1.0'].channels.create({
      guild_id,
      parent_id: voicecategoryid,
      name: voiceChannelName,
      type: 2, // vc
    });
    const channel_cc = await lib.discord.guilds['@0.1.0'].channels.create({
      guild_id,
      parent_id: voicecategoryid,
      name: chatChannelName,
      type: 0, // cc
    });
    await lib.discord.guilds['@0.1.0'].members.update({
      guild_id,
      user_id,
      channel_id: channel_vc.id,
    });
    return;
  }

  // Delete the user's voice channel when the user disconnects

  if (leftChannel) {
    const channels = await lib.discord.guilds['@0.1.0'].channels.list({
      guild_id,
    });
    const channel_vc = channels.find((c) => c.name === voiceChannelName);
    const channel_cc = channels.find((d) => d.name === chatChannelName);
    console.log({vc: `${channel_vc.id}`, cc: `${channel_cc.id}`});
    if (channel_vc)
      await lib.discord.channels['@0.2.0'].destroy({channel_id: channel_vc.id});
    await lib.discord.channels['@0.2.0'].destroy({channel_id: channel_cc.id});
    return;
  }

  // 其他成員加入
  if (false) {
    if (context.params.event.channel_id === `${channel_vc.id}`) {
      const channels = await lib.discord.guilds['@0.1.0'].channels.list({
        guild_id,
      });
      const channel_vc = channels.find((c) => c.name === voiceChannelName);
      const channel_cc = channels.find((c) => c.name === chatChannelName);
      await lib.discord.channels['@0.2.2'].permissions.update({
        overwrite_id: `${context.params.event.member.user.id}`,
        channel_id: `${channel_cc.id}`,
        allow: `${1 << 10}`,
        type: 1,
      });
    }
    if (context.params.event.channel_id === null) {
      const channels = await lib.discord.guilds['@0.1.0'].channels.list({
        guild_id,
      });
      const channel_vc = channels.find((c) => c.name === voiceChannelName);
      const channel_cc = channels.find((c) => c.name === chatChannelName);
      await lib.discord.channels['@0.2.2'].permissions.destroy({
        overwrite_id: `${context.params.event.member.user.id}`,
        channel_id: `${channel_cc.id}`,
      });
    }
    //
  }
}

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
async function log_command(command,username,user,channel,guild) {
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${process.env.logging}`,
    content: `\`${username} ${user}\` 使用了命令: /${command} \n於\`${guild}\` \`${channel}\``,
    tts: false,
  });
}
/**
 * 
 */
module.exports = {
  log_command,
};

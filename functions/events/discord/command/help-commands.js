const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event;
const {guild_id, channel_id} = event;

const commands = await lib.discord.commands['@0.0.1'].list({guild_id}); //{guild_id}
//console.log(`${commands}`);
await lib.discord.channels['@0.2.0'].messages.create({
  channel_id,
  content: ``,
  embed: {
    title: '斜線命令 (空則無)',
    fields: commands.map((cmd) => ({
      name: `/${cmd.name}`,
      value: cmd.description,
      inline: true,
    })),
  },
});

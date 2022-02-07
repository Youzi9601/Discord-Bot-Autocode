const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
// make API request
let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
let result = await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});
// START OF CUSTOMISABLE!

let channel_id = await lib.utils.kv['@0.1.16'].get({
  key: `report_${context.params.event.guild_id}_channelid`,
  defaultValue: 0,
});
let guildsend = await lib.discord.guilds['@0.1.0'].retrieve({
  //retrieves all the available informations of the server. there is so much more you can do with the info than just server information!
  guild_id: `${context.params.event.guild_id}`,
  with_counts: true,
});
let reportChannel = `857832626466848797`; //what channel the reports are sent in for Admins to read
//let mentionedRole = `849810787865460806`; //role mentioned in reports channel before displaying the report (used to ping Admins when a report is created)
//let requiredRole = [//used to allow only certain roles to use the report command
//  `849813503932891177`, // role name here to keep track e.g: 村名｜成員
//  ``, // role name here to keep track e.g: all
//  `ROLE_ID_HERE`, // role name here to keep track e.g: mod
//  `ROLE_ID_HERE`, // role name here to keep track e.g: admin
//];
// END OF CUSTOMISABLE!

let messageString = context.params.event.data.options[0].value; //takes the first option and calls it messageString
let authorString = context.params.event.member.user.id; //calls the comand user authorString
let authorStringInfo = await lib.discord.guilds['@0.1.0'].members.retrieve({
  //get info about
  user_id: `${authorString}`, //this user
  guild_id: `${context.params.event.guild_id}`, //in this guild
});
//let hasRequiredRole = authorStringInfo.roles.find((roleId) => { //make hasRequiredRole tru if the user has roles
//  return requiredRole.includes(roleId); // which include atleast one of the requiredRole
//});

//if (hasRequiredRole) {
await lib.discord.channels['@0.1.0'].messages.create({
  //create a message
  channel_id: `${reportChannel}`, //總部
  content: `<@${authorString}> 於 ${guildsend.name} **舉報:** ${messageString}`, //saying this
});
if (!channel_id) {
} else {
  await lib.discord.channels['@0.1.0'].messages.create({
    //create a message
    channel_id: `${channel_id}`, //其他伺服器
    content: `<@${authorString}> **舉報:** ${messageString}`, //saying this
  });
}
await lib.discord.channels['@0.1.1'].messages.create({
  //create another message
  channel_id: `${context.params.event.channel_id}`, //in the channel the command was sent in
  content: `**已報告！**`, //the response
});
//}  if (!hasRequiredRole) { //if hasRequiredRole wasnt triggered
//  let error = await lib.discord.channels['@0.2.0'].messages.create({ //create message
//    channel_id: `${context.params.event.channel_id}`, //in this channel
//    content: `您無權訪問此命令！`, //saying this
//  });
// await sleep(29000)
//  await lib.discord.channels['@0.2.2'].messages.destroy({
//    message_id: `${error.id}`,
//    channel_id: `${error.channel_id}`,
//  });

//}
//.MeltedButter#9266

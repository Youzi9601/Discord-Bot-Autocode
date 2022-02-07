// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});
var calc = require('ez-calculator');
let problem = context.params.event.data.options[0];
//console.log(problem.value.match(/\d*/) != '');
//if (problem.value.match(/\d*/) != '') {
  let operation = problem.value.split().join(' ');
  var result = calc.calculate(operation);
  console.log(result == '');
if (!result == '') {
  //change your prefix to your liking
  let result_num = await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ` \`\`\`${operation}= ${result}\`\`\` `,
  });

  //console.log(result);
  let sleep = async (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  await sleep(25000);
  //console.log(context.params.event.content);
  await lib.discord.channels['@0.2.2'].messages.destroy({
    message_id: `${result_num.id}`,
    channel_id: `${result_num.channel_id}`,
  });
} else {
let result_num = await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: context.params.event.channel_id,
  content: ` \`\`\`${operation}= 錯誤 (null)\`\`\` `,
});

//console.log(result);
let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

await sleep(25000);
//console.log(context.params.event.content);
await lib.discord.channels['@0.2.2'].messages.destroy({
  message_id: `${result_num.id}`,
  channel_id: `${result_num.channel_id}`,
});
}
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const {key, getEmbed, stop} = require('giveaway.js');
const event = context.params.event;

const {channel_id} = event;
const user = event.member.user.id;
//const time = event.data.options[0].value;
//const prize = event.data.options[1].value;
let time = context.params.event.data.options.find(
  (option) => option.name === 'time'
).value;
console.log(time);
//  處理時間
let times = {day: 0, hour: 0, min: 0};
let problem = '';
let operation = '';
times.day = time.split('-')[0] || '0';
times.hour = time.split('-')[1] || '0';
times.min = time.split('-')[2] || '0';
var calc = require('ez-calculator');
//
problem = `${times.day}*24*60*60`;
operation = problem.split().join(' ');
var result1 = calc.calculate(operation);
//
problem = `${times.hour}*60*60`;
operation = problem.split().join(' ');
var result2 = calc.calculate(operation);
//
problem = `${times.min}*60`;
operation = problem.split().join(' ');
var result3 = calc.calculate(operation);
//
times.all = result1 + result2 + result3;
console.log(times.all);
//time_id
let time_id = Math.floor((new Date().getTime() + times.all * 1000)/1000);
//console.log(time_id);
//<t:${time_id}:R> <t:${time_id}:F>
/**
 *
 */
const prize = context.params.event.data.options.find(
  (option) => option.name === 'prize'
).value;
let winners = context.params.event.data.options.find(
  (option) => option.name === 'winners'
);

if (winners) {
  winners = winners.value;
} else {
  winners = `1`;
}

const isAdmin = event.member.permission_names.includes('ADMINISTRATOR');
if (!isAdmin)
  return lib.discord.channels['@0.2.0'].messages.create({
    channel_id,
    content: `抱歉 <@!${user}>，只有管理員可以創建贈品 🎉`,
  });

// Is there a giveaway in progress?
const giveaway = await lib.utils.kv['@0.1.16'].get({key});
if (giveaway) await stop(true);

// Create giveaway message
const message = await lib.discord.channels['@0.1.1'].messages.create({
  channel_id,
  content: `🎉 **抽獎｜GIVEAWAY** 🎉`,
  tts: false,
  embed: getEmbed(user, times.all, prize, winners, `0`, time_id),
});

// Add reaction
await lib.discord.channels['@0.1.1'].messages.reactions.create({
  channel_id,
  message_id: message.id,
  emoji: `🎉`,
});

// Create storage
await lib.utils.kv['@0.1.16'].set({
  key,
  value: {
    channel_id,
    message_id: message.id,
    prize,
    winners: [],
    finish: new Date().getTime() + times.all * 1000,
  },
});

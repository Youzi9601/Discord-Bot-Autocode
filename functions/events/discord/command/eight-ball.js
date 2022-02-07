const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
// make API request
//let result = await lib.discord.channels['@0.2.2'].typing.create({
//  channel_id: `${context.params.event.channel_id}`,
//});
await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});

let actext = context.params.event.data.options[0].value;
let items = [
  '對',
  '錯',
  '可能',
  '也許',
  '優柔寡斷',
  '如果你不知道會更好',
  '當然',
  '當然不',
  '顯然不是',
  '可能不是',
  '不想理會',
  '喔。',
  'So?',
  '*尷尬而不語...*',
  '**NOPE**',
  '`沒當作一回事.ing`',
  '怕.bot',
  '我還是不要回答好了。',
  '不知道',
  '我覺得可以喔',
  '你做不到',
  '先不要。',
  '你一定可以的',
  '你確定？',
  '仔細思考，你自己一定知道答案',
  '加油，努力就會成功',
  '笑死欸，一定會失敗的',
  '好喔。',
  '再問一次吧！',
  '不告訴你',
  '一定會成功！',
  '我相信你！',
  '你的問題我不想回答',
  '是喔。',
  '所以呢？',
  '我不要',
  '我不愛你',
  '你是想被我MUTE喔',
  '不想理會',
  '我覺得你可以放棄',
  '你或許可以在這裡找到答案',
  '我是海螺，住在海裡，你的問題，我只能沉默。',
  '我是機器人，我選擇...不要選擇',
  '我沒權限告訴你答案，因為你說得太抽象了',
  '小孩子才問這問題',
  '這問題神奇到我無法回答',
  '有事請 https://google.com，不要找我',
  '此指令交互失敗，騙你的',
  '只要你爽就好',
  '我期待你的表現唷！',
  '我再看看',
  '我的運作時間為24h，除了週一到週日以外。\n現在為下班時間，請下次再來。',
  '哈哈哈，我就不告訴你，就是玩',
  '努力不懈，成功即至',
  '不要啦，齁唷',
  '加油，我愛你',
];
let random = items[Math.floor(Math.random() * items.length)];

await lib.discord.interactions['@0.0.0'].followups.create({
  token: `${context.params.event.token}`,
  content: random,
});
//await lib.discord.channels['@0.1.1'].messages.create({
//  channel_id: `${context.params.event.channel_id}`,
//  content: random,
//});

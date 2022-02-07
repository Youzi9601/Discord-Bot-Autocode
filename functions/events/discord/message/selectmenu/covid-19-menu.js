const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

//get vaule
const selectedValue = context.params.event.data.values[0];

let now = new Date();
let month = now.getMonth() + 1;
let day = now.getDate();
let hour = now.getHours() + 8;
let min = now.getMinutes();
let year = now.getFullYear();
let seconds = now.getSeconds();

let now_time = `${hour}:${min}:${seconds}`;
let now_date = `${year}-${month}-${day}`;
console.log(now_date);

/**
 *  取得資料
 */
let data = await lib.http.request['@1.1.6'].get({
  url: `https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5001`,
});
let date = data.headers.date;
let info = data.data;

/**
 * 總確診
 */
let 總確診人數 = info.length;
let 總境外移入 = info.filter((d) => d.a03 == `境外移入`);
let 總本土確診 = info.filter((d) => d.a03 != `境外移入`);
/*
 * 今日確診
 */
let latest_date = info[0].a02;
//console.log(latest_date);

let today_info = info.filter((d) => d.a02 == latest_date);

let 今日確診人數 = today_info.length;
let 境外移入 = today_info.filter((d) => d.a03 == `境外移入`);
let 本土病例 = today_info.filter((d) => d.a03 != `境外移入`);
//filtering the channel where message can be sent
//d.a02.split('-')[0] == `${year}` && Math.floor(d.a02.split('-')[1]) == `${month}` && Math.floor(d.a02.split('-')[2]) == `${day}`
//console.log(today_info);

console.log(
  `總確診人數：${總確診人數}, 今日確診人數: ${今日確診人數}, 本土病例: ${本土病例.length}, 境外移入: ${境外移入.length}`
);

if (selectedValue == 'all') {
  /**
   * 性別
   */
  let 男生 = info.filter((d) => d.a05 == `男`);
  let 女生 = info.filter((d) => d.a05 == `女`);
  /**
   * 年齡層
   */
  let 零到四 = info.filter((d) => d.a07 == `0-4`);
  let 五到九 = info.filter((d) => d.a07 == `5-9`);
  let 十到十四 = info.filter((d) => d.a07 == `10-14`);
  let 十五到十九 = info.filter((d) => d.a07 == `15-19`);
  let 二十到二四 = info.filter((d) => d.a07 == `20-24`);
  let 二五到二九 = info.filter((d) => d.a07 == `25-29`);
  let 三十到三四 = info.filter((d) => d.a07 == `30-34`);
  let 三五到三九 = info.filter((d) => d.a07 == `35-39`);
  let 四十到四四 = info.filter((d) => d.a07 == `40-44`);
  let 四五到四九 = info.filter((d) => d.a07 == `45-49`);
  let 五十到五四 = info.filter((d) => d.a07 == `50-54`);
  let 五五到五九 = info.filter((d) => d.a07 == `55-59`);
  let 六十到六四 = info.filter((d) => d.a07 == `60-64`);
  let 六五到六九 = info.filter((d) => d.a07 == `65-69`);
  let 七十歲以上 = info.filter((d) => d.a07 == `70+`);

  /**
   *
   */
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    tts: false,
    //
    embeds: [
      {
        type: 'rich',
        title: `COVID-19`,
        description: `**${latest_date}** 的確診統計`,
        color: 0xef501f,
        fields: [
          {
            name: `性別分類`,
            value: `男: ${男生.length}人 \n女: ${女生.length}人`,
          },
          {
            name: `年齡層分類`,
            value: [
              `70+: \`${七十歲以上.length}\`例`,
              `65-69: \`${六五到六九.length}\`例`,
              `60-64: \`${六十到六四.length}\`例`,
              `55-59: \`${五五到五九.length}\`例`,
              `50-54: \`${五十到五四.length}\`例`,
              `45-49: \`${四五到四九.length}\`例`,
              `40-44: \`${四十到四四.length}\`例`,
              `35-39: \`${三五到三九.length}\`例`,
              `30-34: \`${三十到三四.length}\`例`,
              `25-29: \`${二五到二九.length}\`例`,
              `20-24: \`${二十到二四.length}\`例`,
              `15-19: \`${十五到十九.length}\`例`,
              `10-14: \`${十到十四.length}\`例`,
              `5-9: \`${五到九.length}\`例`,
              `0-4: \`${零到四.length}\`例`,
            ].join('\n'),
          },
        ],
        thumbnail: {
          url: `https://images-ext-2.discordapp.net/external/-watiLG0hc3JrvOQ4T8DNUTriLQVWyfB4WtICliLBYY/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/688490378264969313/67d13c047ec8a88f0082c9548ee59b68.png?width=406&height=406`,
          height: 0,
          width: 0,
        },
        footer: {
          text: `[ / ] 柚子醬`,
          icon_url: `https://images-ext-2.discordapp.net/external/P7gAngaCsuAsiE6SENSqx5NEMkU42_YeHLqa5KypN4Q/%3Fwidth%3D406%26height%3D406/https/images-ext-2.discordapp.net/external/-dneiXRI0E1U8_fTJDS6rGbZ6LMTYls7008ELlgE76Q/%253Fsize%253D1024/https/cdn.discordapp.com/avatars/901790338069450753/e8ee4d63871b5af23ff0c611462ddbc6.webp`,
        },
      },
    ],
  });
  //
} else if (selectedValue == 'today') {
  await lib.discord.channels['@0.1.2'].messages.update({
    message_id: context.params.event.message.id,
    channel_id: context.params.event.message.channel_id,
    content: context.params.event.message.content,
    components: context.params.event.message.components,
    tts: false,
    //
    embeds: [
      {
        type: 'rich',
        title: `COVID-19`,
        description: `**${latest_date}** 的確診統計`,
        color: 0xef501f,
        fields: [
          {
            name: `今日確診人數`,
            value: `${今日確診人數}人`,
          },
          {
            name: `今日本土病例`,
            value: `${本土病例.length}例`,
            inline: true,
          },
          {
            name: `今日境外移入`,
            value: `${境外移入.length}例`,
            inline: true,
          },
          {
            name: `總確診人數`,
            value: `${總確診人數}人`,
          },
          {
            name: `總本土確診`,
            value: `${總本土確診.length}例`,
            inline: true,
          },
          {
            name: `總境外移入`,
            value: `${總境外移入.length}例`,
            inline: true,
          },
        ],
        thumbnail: {
          url: `https://images-ext-2.discordapp.net/external/-watiLG0hc3JrvOQ4T8DNUTriLQVWyfB4WtICliLBYY/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/688490378264969313/67d13c047ec8a88f0082c9548ee59b68.png?width=406&height=406`,
          height: 0,
          width: 0,
        },
        footer: {
          text: `[ / ] 柚子醬`,
          icon_url: `https://images-ext-2.discordapp.net/external/P7gAngaCsuAsiE6SENSqx5NEMkU42_YeHLqa5KypN4Q/%3Fwidth%3D406%26height%3D406/https/images-ext-2.discordapp.net/external/-dneiXRI0E1U8_fTJDS6rGbZ6LMTYls7008ELlgE76Q/%253Fsize%253D1024/https/cdn.discordapp.com/avatars/901790338069450753/e8ee4d63871b5af23ff0c611462ddbc6.webp`,
        },
      },
    ],
  });
}

// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
//
/**
 * 欄位說明
 * {"id":"","a01":"個案研判日","a02":"個案公佈日","a03":"縣市","a04":"鄉鎮","a05":"性別","a06":"是否為境外移入","a07":"年齡層"}
 */

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
await lib.discord.channels['@0.2.2'].typing.create({
  channel_id: `${context.params.event.channel_id}`,
});
let Version = await lib.utils.kv['@0.1.16'].get({
  key: `bot_Version`,
});
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

await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `<@${context.params.event.member.user.id}>, 以下為 台灣 COVID-19 的統計：`,
  tts: false,
  components: [
    {
      type: 1,
      components: [
        {
          custom_id: `covid-menu`,
          placeholder: `COVID-19 台灣｜請選擇想要查看的資訊`,
          options: [
            {
              label: `今日確診`,
              value: `today`,
              description: `今日的確診人數統計`,
              default: false,
              emoji: {
                id: null,
                name: `🕘`,
              },
            },
            {
              label: `總計確診`,
              value: `all`,
              description: `總確診人數統計`,
              default: false,
              emoji: {
                id: null,
                name: `📈`,
              },
            },
          ],
          min_values: 1,
          max_values: 1,
          type: 3,
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          style: 4,
          label: `刪除此列表`,
          custom_id: `help_delete_list`,
          disabled: false,
          emoji: {
            id: null,
            name: `🗑`,
          },
          type: 2,
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          style: 2,
          label: `機器人版本：v${Version}`,
          custom_id: `help_botinfo_0`,
          disabled: true,
          emoji: {
            id: `931773827116040263`,
            name: `youzi_removebg`,
            animated: false,
          },
          type: 2,
        },
        {
          style: 1,
          label: `由 Youzi#0753 製作`,
          custom_id: `help_botinfo_1`,
          disabled: true,
          type: 2,
        },
      ],
    },
  ],
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

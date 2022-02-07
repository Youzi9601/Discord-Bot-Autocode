const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
var calc = require('ez-calculator');
const axios = require('axios');
/**
 * 維護模式
 */
let maintain = `${process.env.maintain}`;
console.log(process.env.maintain);
/**
 * COVID-19 API
 * https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5001
 */
/**
let info = await lib.http.request['@1.1.5'].get({
  url: `https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=5001`,
});
*/

/**
 * youtube subs
 */
/* Fill these datils */

const details = {
  url: 'https://www.youtube.com/channel/UCGLbazmDlVg22pO6aGuSRsw', //Channel URL
};

/* Get the Html Data of website */
const rawHtml = await axios(details.url).then((res) => res.data);

/* Going to use regex to get subs count */
const superSet = rawHtml.match(/"subscriberCountText".+?(?="tvBanner":)/s)[0];
const subSet = '{' + superSet.match(/(?<=subscribers"}},)"simpleText":(.)+/);
const subData = JSON.parse(subSet.substr(0, subSet.length - 3));

/* If channel name is same as subs then stop the execution */
const subs = `${subData?.simpleText.split(' ')[0]}`;

/**
 * 取得伺服器資訊
 */
//var client = require('client');
let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

let servers = await lib.discord.guilds['@0.1.0'].list({
  limit: 100,
});
console.log(
  `${servers.length === 100 ? servers.length + '+' : servers.length} 個伺服器！`
);

/**
 * server members
 */
let servers_members = 0;
for (let i = 0; i < servers.length; i++) {
  console.log(i);
  server_members = await lib.discord.guilds['@0.0.6'].members.list({
    //used to list members in the server
    guild_id: `${servers[i].id}`,
    limit: 1000,
  });
  console.log(`${servers[i].name} ${servers[i].id} ${server_members.length}人`);
  servers_members = Math.floor(servers_members + server_members.length);
}
console.log(servers_members);
//const all = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

//client.user.setPresence({
//    activities: [{
//        name: `/help • ${client.guilds.cache.size}個伺服器 | ${all}個使用者`,
//    }],
//    status: 'connecting',
//});

/**
 * 狀態列表 `[ / ] 指令 ｜`
 */
if (maintain === `true`) {
  //
  //
  //
  //
  //
  activitynameslist = [
    `暫停服務｜目前正在自我檢測......`,
    `暫停服務｜正在統計......`,
    `暫停服務｜維修`,
    `暫停服務｜未知......`,
  ];
  activitytypelist = [`WATCHING`];
  status = [
    //  'ONLINE',
    `DND`,
    //`IDLE`,
  ];
  //
  //
  //
  //
  //
} else {
  //
  //
  //
  //
  //
  activitynameslist = [
    `由 Youzi#0753 製作`,
    `[ / ] 指令觸發！`,
    `${
      servers.length === 100 ? servers.length + '+' : servers.length
    } 個伺服器 & ${servers_members} 個成員！`,
    `https://Youzi-tw.tk`,
    `Youtube 訂閱數: ${subs}位！( 柚子Youzi )`,
  ];
  activitytypelist = [
    //`STREAMING`,
    `GAME`,
    `COMPETING`,
    `LISTENING`,
    `WATCHING`,
  ];
  status = [
    //  'ONLINE',
    //  `DND`,
    `IDLE`,
  ];
  //
  //
  //
  //
  //
  //End
}

//Start of status
//for (let i = 0; i < 3; i++) { //運行幾次
let ActivityChoice = Math.floor(Math.random() * activitynameslist.length);
let activity = activitynameslist[ActivityChoice];

let ActypeChoice = Math.floor(Math.random() * activitytypelist.length);
let activitytype = activitytypelist[ActypeChoice];

let statusChoice = Math.floor(Math.random() * status.length);
let statustype = status[statusChoice];

let statusParams = {
  activity_name: `${activity}`,
  activity_type: `${activitytype}`,
  status: `${statustype}`,
};
console.log(statusParams);

if (activitytype === 'STREAMING') {
  statusParams.url = 'https://www.twitch.tv/youzi9601';
}
// https://twitch.tv/YourBudTevin
await lib.discord.users['@0.1.1'].me.status.update(statusParams);
//console.log(activity);
//重複
//  await sleep(9000);
//} //重複結束

//
//
//
//
//
//web
//const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let channel_id = '915918358027857950';

//webs
const sites = [
  //'http://youzi-tw.tk',
  'https://google.com',
  'https://sites.google.com/view/youzi/',
  //'youzi.sssrv.xyz'
  //'https://this-site-doesnt-exist.zyx',
];

const sendWarning = async (siteUrl) => {
  const content = `⚠ 注意 ｜ ${siteUrl} 沒有回應`;
  console.warn(content);
  return lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${channel_id}`,
    content,
  });
};

// Send a GET request up to 3 times for a specific site
const checkSite = async (site) => {
  for (let checks = 0; checks < 3; checks++) {
    const passed = await axios
      .get(site, {timeout: 8e3}) // 8 secs
      .then(() => true)
      .catch(() => false);
    if (passed) return true;
  }
  return false;
};

// Test all sites and post warnings
await Promise.all(
  (
    await Promise.all(sites.map(checkSite))
  )
    .map((passed, i) => [passed, sites[i]])
    .filter(([passed, _]) => !passed)
    .map(([_, site]) => sendWarning(site))
);

//

//
//
//
//
let now = new Date();
let month = now.getMonth() + 1;
let day = now.getDate();
let hour = now.getHours() + 8;
let min = now.getMinutes();
let year = now.getFullYear();
let seconds = now.getSeconds();

let time = `${hour}:${min}:${seconds}`;
let date = `${year}/${month}/${day}`;
//抽獎活動
if (false) {
  if (hour === 16) {
    if (min === 0) {
      //執行抽獎
      let event_data_list = await lib.utils.kv['@0.1.16'].get({
        key: `抽獎活動`,
      });
      //let event_data_lists = [event_data_list]
      let event_data_random =
        event_data_list[Math.floor(Math.random() * event_data_list.length)];
      console.log(event_data_list.length);
      console.log(event_data_list);
      console.log(event_data_random);
      //let event_data_num = Math.floor(Math.random() * event_data_lists.length);
      //發送訊息
      //role_id = 859714533467357194
      //channel_id = 862278436064067584
      await lib.discord.guilds['@0.1.3'].members.roles.update({
        role_id: `859714533467357194`,
        user_id: event_data_random,
        guild_id: `849809683085525032`,
      });
      await lib.discord.channels['@0.1.1'].messages.create({
        channel_id: `862278436064067584`,
        content: ``,
        embeds: [
          {
            type: rich,
            title: `> 恭喜 <@${event_data_random}> 獲得 <@&859714533467357194>`,
            description: '',
            color: 0x00ffff,
          },
        ],
        allowed_mentions: {
          replied_user: false,
          parse: [users],
          users: [`${event_data_random}`],
        },
      });
      //清除
      await lib.utils.kv['@0.1.16'].clear({
        key: `抽獎活動`,
      });
      //
    }
  }
}
//
//
//
//
//
//
/**
 * 檢查更新
 
let Version = await lib.utils.kv['@0.1.16'].get({
  key: `bot_Version`,
  defaultValue: `${year}.${month}.0`
});
console.log(`當前機器人版本：${year}.${month}.0`);
//console.log(Version.split(".")[1]);
if (Version.split(".")[1] != `${month}`) { 
  Version = await lib.utils.kv['@0.1.16'].set({
    key: `bot_Version`,
    value: `${year}.${month}.0`,
  });
  console.log(`已轉換版本！${Version}`);
}
*/
//
//
//
//
//
//giveaway
const {stop} = require('giveaway.js');
await stop();
//
//
//
//
//
return statusParams;

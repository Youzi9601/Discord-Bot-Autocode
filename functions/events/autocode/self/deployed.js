const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
console.log(`已觸發`);
/**
 * 這是互動程式
 */
if (true) {
  await lib.discord.contextmenu['@0.0.0'].items.bulkOverwrite({
    items: [
      //message
      {
        default_permission: true,
        default_member_permissions: null,
        type: 3,
        name: '舉報此訊息',
        dm_permission: null,
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 3,
        name: '翻譯成中文',
        dm_permission: null,
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 3,
        name: '翻譯成英文',
        dm_permission: null,
      },
      //user
      {
        default_permission: true,
        default_member_permissions: null,
        type: 2,
        name: '成員資訊',
        dm_permission: null,
      },
    ],
  });
}

if (true) {
  // **DO NOT RUN** UNLESS YOU KNOW WHAT YOU ARE DOING

  let keyValues = (await lib.utils.kv['@0.1.16'].entries()).filter((entry) =>
    entry[0].startsWith('temp')
  );

  let keys = await keyValues.map((entry) => `${entry[0]}`);
  let values = await keyValues.map((entry) => `${entry[1]}`);
  let ids = ``;
  for (let i = 0; i < keyValues.length; i++) {
    ids = `${ids}, ` + `${keys[i]}`.split('_')[1];
  }
  console.log(keyValues);
  console.log(keys);
  console.log(values);
  console.log(ids);
  /*
  for (let i = 0; i < keys.length; i++) {
    await lib.utils.kv.clear({
      key: `${key[i]}`,
    });
  }
  let keys2 = await lib.utils.kv['@0.1.16'].entries();
  console.log(`New Keys =`, keys2);
  */
  // **DO NOT RUN** UNLESS YOU KNOW WHAT YOU ARE DOING
}

/**
 * await lib.utils.kv['@0.1.16'].set({
 *   key: `guild_leave`,
 *   value: `0`,
 *   ttl: 180,
 * });
 */

//於除了自己的伺服器外的其他伺服器中退出並刪除相關頻道！
if (false) {
  let result = await lib.utils.kv['@0.1.16'].get({
    key: `guild_leave`,
    defaultValue: `0`,
  });
  let guild_list = await lib.discord.guilds['@0.2.1'].list({
    limit: 100,
    after: `${result}`,
  });
  /* 刪除之伺服器 */
  for (let i = 0; i < guild_list.length; i++) {
    console.log(i);
    if (guild_list[i].id != '849809683085525032') {
      /* 主要命令 */
      //function 等待命令
      let sleep = async (ms) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      };
      //console.log(`取得各項基本東西..`);
      //前置 取得建議頻道
      let suggestions_channel = await lib.utils.kv['@0.1.16'].get({
        key: `Suggestions_${guild_list[i].id}_channelid`,
        defaultValue: 0,
      });
      lib.utils.kv['@0.1.16'].clear({
        key: `Suggestions_${guild_list[i].id}_channelid`, // required
      });
      await lib.utils.kv['@0.1.16'].clear({
        key: `Suggestions_num_${context.params.event.guild_id}`,
      });
      //let channelid = channel_id; //'849835494317359125'
      //前置 取得數數字頻道
      let count_channel = await lib.utils.kv['@0.1.16'].get({
        key: `count_${guild_list[i].id}_channelid`,
        defaultValue: 0,
      });
      lib.utils.kv['@0.1.16'].clear({
        key: `count_${guild_list[i].id}_channelid`, // required
      });
      lib.utils.kv['@0.1.16'].clear({
        key: `currentnum_count_${guild_list[i].id}`, // required
      });
      //取得 跨服連線
      let Connection_guild_channelid = await lib.utils.kv['@0.1.16'].get({
        key: `Connections_${guild_list[i].id}_channelid`,
        //value: result,
      });
      lib.utils.kv['@0.1.16'].clear({
        key: `Connections_${guild_list[i].id}_channelid`, // required
      });
      lib.utils.kv['@0.1.16'].clear({
        key: `Connections_${guild_list[i].id}_webhook`, // required
      });
      //清除頻道
      await lib.discord.channels['@0.3.0']
        .destroy({
          channel_id: suggestions_channel, // required
        })
        .catch(() => {
          console.log(`** 建議頻道`);
          //製作退出訊息
        });
      await lib.discord.channels['@0.3.0']
        .destroy({
          channel_id: count_channel, // required
        })
        .catch(() => {
          console.log(`** 數數字頻道`);
          //製作退出訊息
        });
      await lib.discord.channels['@0.3.0']
        .destroy({
          channel_id: Connection_guild_channelid, // required
        })
        .catch(() => {
          console.log(`** 連線頻道`);
          //製作退出訊息
        });
      await lib.discord.users['@0.2.0'].me.guilds.destroy({
        guild_id: `${guild_list[i].id}`, // required
      });
      console.log(`已退出${guild_list[i].name}！`);
      await lib.utils.kv['@0.1.16'].set({
        key: `guild_leave`,
        value: `${guild_list[i].id}`,
        ttl: 180,
      });
    }
  }
  //end
}
/**
 * 命令
 */
//command
if (true) {
  console.log(`setting commands`);
  await lib.discord.commands['@0.1.0'].bulkOverwrite({
    commands: [
      {
        guild_id: '849809683085525032',
        name: 'rank',
        description: '取得你的等級！',
        options: [],
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        dm_permission: null,
      },
      {
        guild_id: '849809683085525032',
        name: 'levels',
        description: '取得這裡的排名！',
        options: [],
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        dm_permission: null,
      },
      {
        default_permission: true,
        default_member_permissions: null,
        dm_permission: null,
        name: 'tic-tac-toe',
        description: '井字棋！允許自己跟自己比賽喔！',
        options: [
          {
            type: 6,
            name: 'user',
            description: '對戰對手',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        name: 'covid-19',
        description: '疫情真的很嚴重......來看看台灣的資料統計吧！',
        options: [],
        type: 1,
        dm_permission: null,
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'vc',
        description: '更改臨時語音聊天的設置！',
        dm_permission: null,
        options: [
          {
            type: 1,
            name: 'kick',
            description: '從您的 TempVC 中踢出用戶',
            options: [
              {
                type: 6,
                name: 'user',
                description: '要從您的 TempVC 中踢出的用戶',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'ban',
            description: '從您的 TempVC 禁止用戶',
            options: [
              {
                type: 6,
                name: 'user',
                description:
                  '禁止用戶使用您的 TempVC，這會鎖定被禁止用戶的 vc。',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'hardban',
            description: '禁止用戶使用您的 TempVC，這會鎖定被禁止用戶的 vc。',
            options: [
              {
                type: 6,
                name: 'user',
                description: '用戶禁止使用您的 TempVC',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'unban',
            description: '從您的 TempVC 中取消禁止用戶',
            options: [
              {
                type: 6,
                name: 'user',
                description: '用戶從您的 TempVC 中解禁',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'whitelist',
            description: '允許用戶繞過鎖定或隱藏 TempVC',
            options: [
              {
                type: 6,
                name: 'user1',
                description: '允許訪問您的 TempVC 的用戶',
                required: true,
              },
              {
                type: 6,
                name: 'user2',
                description: '允許訪問您的 TempVC 的用戶',
              },
              {
                type: 6,
                name: 'user3',
                description: '允許訪問您的 TempVC 的用戶',
              },
              {
                type: 6,
                name: 'user4',
                description: '允許訪問您的 TempVC 的用戶',
              },
              {
                type: 6,
                name: 'user5',
                description: '允許訪問您的 TempVC 的用戶',
              },
              {
                type: 6,
                name: 'user6',
                description: '允許訪問您的 TempVC 的用戶',
              },
              {
                type: 6,
                name: 'user7',
                description: '允許訪問您的 TempVC 的用戶',
              },
              {
                type: 6,
                name: 'user8',
                description: '允許訪問您的 TempVC 的用戶',
              },
              {
                type: 6,
                name: 'user9',
                description: '允許訪問您的 TempVC 的用戶',
              },
              {
                type: 6,
                name: 'user10',
                description: '允許訪問您的 TempVC 的用戶',
              },
            ],
          },
          {
            type: 1,
            name: 'unwhitelist',
            description: '從您的 TempVC 中取消允許用戶',
            options: [
              {
                type: 6,
                name: 'user',
                description: '用戶取消對您的 TempVC 的訪問權限',
                required: true,
              },
            ],
          },
          {
            type: 2,
            name: 'role',
            description: '按角色調節對 TempVC 的訪問權限的選項',
            options: [
              {
                type: 1,
                name: 'ban',
                description: '禁止任何具有特定角色的人加入您的 TempVC',
                options: [
                  {
                    type: 8,
                    name: 'role',
                    description: '禁止您的 TempVC 的角色',
                    required: true,
                  },
                ],
              },
              {
                type: 1,
                name: 'unban',
                description: '從您的 TempVC 中取消禁止角色',
                options: [
                  {
                    type: 8,
                    name: 'role',
                    description: '從您的 TempVC 中解禁的角色',
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: 1,
            name: 'hide',
            description: '向未列入白名單的任何人隱藏您的 TempVC',
          },
          {
            type: 1,
            name: 'unhide',
            description: '向所有未列入白名單的用戶展示您的 TempVC',
          },
          {
            type: 1,
            name: 'lock',
            description: '鎖定您的 TempVC，以便只有列入白名單的用戶才能加入',
          },
          {
            type: 1,
            name: 'unlock',
            description: '將您的 TempVC 解鎖給未列入白名單的任何人',
          },
          {
            type: 1,
            name: 'limit',
            description: '設置 TempVC 的用戶限制',
            options: [
              {
                type: 4,
                name: 'max-users',
                description: '設置 TempVC 中的最大用戶數',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'name-change',
            description: '更改 TempVC 的名稱',
            options: [
              {
                type: 3,
                name: 'new-name',
                description: '將什麼設置為 TempVC 的新名稱',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'owner-transfer',
            description: '將您的 TempVC 的所有權轉讓給指定用戶',
            options: [
              {
                type: 6,
                name: 'new-owner',
                description: '誰設置為您的 TempVC 的新所有者',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'chat',
            description: '在 TempVC 中為用戶添加文本通道',
            options: [
              {
                type: 5,
                name: 'on-off',
                description: '創建或銷毀指定給此 VC 的文本聊天',
                required: true,
              },
            ],
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'user-info',
        description: '成員資訊',
        dm_permission: null,
        options: [
          {
            type: 6,
            name: 'user',
            description: '取得該成員 ( 空則取得自己的資訊！ )',
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'weather',
        description: '查詢天氣',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'city',
            description: '城市(首都)',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'random-user',
        description: '隨機抽選一個成員！適合用於抽獎！',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'prize',
            description: '獎品(或是倒楣鬼?)',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'global',
        description: '於所有伺服器執行！[限定機器人所有者]',
        dm_permission: null,
        options: [
          {
            type: 1,
            name: 'ban',
            description: '封鎖特定惡搞人士',
            options: [
              {
                type: 3,
                name: 'user',
                description: '成員ID (限制數字)',
                required: true,
              },
              {
                type: 3,
                name: 'reason',
                description: '原因',
              },
            ],
          },
          {
            type: 1,
            name: 'kick',
            description: '踢出特定惡搞人士',
            options: [
              {
                type: 3,
                name: 'user',
                description: '成員ID (限制數字)',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'update',
            description: '更新機器人！[限定所有者！]',
            options: [
              {
                type: 3,
                name: 'title',
                description: '你的更新標題 [版本 更新｜<title>]',
                required: true,
              },
              {
                type: 3,
                name: 'content',
                description: '更新內容',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'connections_shout',
            description: '於 #跨服連線 頻道使用公告訊息',
            options: [
              {
                type: 3,
                name: 'name',
                description: '名稱 (預設為：全區跨群廣播)',
              },
              {
                type: 3,
                name: 'avatar',
                description: '頭像 (預設為：廣播圖示)',
              },
              {
                type: 3,
                name: 'context',
                description: '內容',
              },
              {
                type: 3,
                name: 'embed-title',
                description: '嵌入的標題 (預設為：跨群聊天公告)',
              },
              {
                type: 3,
                name: 'embed-description',
                description:
                  '嵌入的內容 (預設為：請遵守Discord的社群規範！\\n尊重他人、合理的限度內宣傳\\n不使用有關血腥、暴力、色情之字詞，並且不刷屏，否則我們將會聯合封鎖/踢出該成員！)',
              },
              {
                type: 3,
                name: 'embed-url',
                description: '嵌入的連結',
              },
              {
                type: 3,
                name: 'embed-image',
                description: '嵌入的照片',
              },
              {
                type: 3,
                name: 'embed-footer',
                description: '嵌入的頁腳',
              },
            ],
          },
          {
            type: 1,
            name: 'unban',
            description: '撤銷封鎖特定人士',
            options: [
              {
                type: 3,
                name: 'user',
                description: '成員ID (限制數字)',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'timeout',
            description: '禁言特定人士',
            options: [
              {
                type: 3,
                name: 'user',
                description: '成員ID (限制數字)',
                required: true,
              },
              {
                type: 10,
                name: 'time',
                description:
                  '時長( 秒，上限28天 ) 1m=24192001w=604800 1d=86400 1h=3600 1min=60',
                required: true,
              },
              {
                type: 3,
                name: 'reason',
                description: '原因',
              },
            ],
          },
          {
            type: 1,
            name: 'un-timeout',
            description: '解除禁言特定人士',
            options: [
              {
                type: 3,
                name: 'user',
                description: '成員ID (限制數字)',
                required: true,
              },
            ],
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'bot',
        description: '控制機器人',
        dm_permission: null,
        options: [
          {
            type: 1,
            name: 'reactions-create',
            description: '讓機器人給予訊息一個反應！',
            options: [
              {
                type: 3,
                name: 'emoji',
                description: '表情符號',
                required: true,
              },
              {
                type: 3,
                name: 'message_id',
                description: '訊息ID',
                required: true,
              },
              {
                type: 3,
                name: 'channel',
                description: '所在的頻道ID',
              },
            ],
          },
          {
            type: 1,
            name: 'edit-message',
            description: '更改機器人說的內容',
            options: [
              {
                type: 3,
                name: 'message_id',
                description: '要更改的訊息ID',
                required: true,
              },
              {
                type: 3,
                name: 'message',
                description: '訊息內容',
                required: true,
              },
              {
                type: 3,
                name: 'channel',
                description: '所在的頻道ID',
              },
            ],
          },
          {
            type: 1,
            name: 'setbot-nick',
            description: '設定機器人的暱稱',
            options: [
              {
                type: 3,
                name: 'name',
                description: '名稱',
              },
              {
                type: 3,
                name: 'avatar',
                description: '大頭貼',
              },
            ],
          },
          {
            type: 1,
            name: 'archive',
            description: '讓機器人把頻道內容轉為文字檔案！',
            options: [
              {
                type: 10,
                name: 'num',
                description: '訊息數量',
                required: true,
              },
              {
                type: 3,
                name: 'channel',
                description: '頻道ID',
              },
            ],
          },
          {
            type: 1,
            name: 'embed',
            description: '為訊息添加嵌入！',
            options: [
              {
                type: 3,
                name: 'title',
                description: '嵌入的標題（格式不起作用）',
                required: true,
              },
              {
                type: 3,
                name: 'description',
                description: '嵌入的描述',
                required: true,
              },
              {
                type: 3,
                name: 'color',
                description:
                  '提供嵌入的顏色十六進制代碼（例如：FFFFFF（白色））',
                required: true,
              },
              {
                type: 3,
                name: 'url',
                description:
                  '如果你想要一個 URL 添加它！ （確保它是 http(s):// 格式）',
              },
              {
                type: 3,
                name: 'image',
                description:
                  '如果需要，請附上圖片鏈接！ （確保它是 http(s):// 格式）',
              },
              {
                type: 3,
                name: 'footer',
                description: '您嵌入的頁腳',
              },
              {
                type: 3,
                name: 'channel',
                description: '傳送的的頻道ID',
              },
            ],
          },
          {
            type: 1,
            name: 'say',
            description: '讓機器人說話！',
            options: [
              {
                type: 3,
                name: 'text',
                description: '內容',
                required: true,
              },
              {
                type: 3,
                name: 'reply',
                description: '回覆的訊息ID',
              },
              {
                type: 3,
                name: 'channel',
                description: '傳送的的頻道ID',
              },
            ],
          },
          {
            type: 1,
            name: 'delete-msg',
            description: '讓機器人說話！',
            options: [
              {
                type: 3,
                name: 'message_id',
                description: '訊息的ID',
                required: true,
              },
              {
                type: 3,
                name: 'channel',
                description: '傳送的的頻道ID',
              },
            ],
          },
          {
            type: 1,
            name: 'setbot-status',
            description:
              '更改機器人狀態(他不會理你，因為只限 柚子Yozui 可以使用)',
            options: [
              {
                type: 3,
                name: 'name',
                description: '狀態內容 ',
                required: true,
              },
              {
                type: 3,
                name: 'type',
                description: '動作',
                required: true,
                choices: [
                  {
                    name: '遊玩',
                    value: 'GAME',
                  },
                  {
                    name: '直播',
                    value: 'STREAMING',
                  },
                  {
                    name: '正在聽',
                    value: 'LISTENING',
                  },
                  {
                    name: '觀看',
                    value: 'WATCHING',
                  },
                  {
                    name: '競爭',
                    value: 'COMPETING',
                  },
                ],
              },
              {
                type: 3,
                name: 'status',
                description: '狀態',
                required: true,
                choices: [
                  {
                    name: '上線',
                    value: 'ONLINE',
                  },
                  {
                    name: '勿擾',
                    value: 'DND',
                  },
                  {
                    name: '閒置',
                    value: 'IDLE',
                  },
                  {
                    name: '隱形',
                    value: 'INVISIBLE',
                  },
                ],
              },
              {
                type: 3,
                name: 'url',
                description: '連結(限定直播狀態使用)',
              },
            ],
          },
          {
            type: 1,
            name: 'update',
            description: '更新機器人！[限定所有者！]',
            options: [
              {
                type: 3,
                name: 'title',
                description: '你的更新標題 [版本 更新｜<title>]',
                required: true,
              },
              {
                type: 3,
                name: 'description',
                description: '更新內容',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'webhook',
            description: '使用webhook來發送訊息！',
            options: [
              {
                type: 3,
                name: 'message',
                description: '訊息內容',
                required: true,
              },
              {
                type: 3,
                name: 'name',
                description: '名稱',
              },
              {
                type: 3,
                name: 'avatar',
                description: '頭像(限用http://或是https://)',
              },
            ],
          },
          {
            type: 1,
            name: 'clone',
            description: '複製一個長得像是指定成員的使用者！',
            options: [
              {
                type: 3,
                name: 'message',
                description: '訊息內容',
                required: true,
              },
              {
                type: 6,
                name: 'user',
                description: '複製的對象',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'screenshot',
            description: '讓機器人為你截圖！',
            options: [
              {
                type: 3,
                name: 'url',
                description: '要截圖的連結',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'get-id-time',
            description: '取得各種ID的時間',
            options: [
              {
                type: 3,
                name: 'type',
                description: '種類',
                required: true,
                choices: [
                  {
                    name: '訊息',
                    value: '訊息',
                  },
                  {
                    name: '伺服器',
                    value: '伺服器',
                  },
                  {
                    name: '成員',
                    value: '成員',
                  },
                  {
                    name: '頻道',
                    value: '頻道',
                  },
                  {
                    name: '討論串',
                    value: '討論串',
                  },
                ],
              },
              {
                type: 3,
                name: 'id',
                description: '你所複製的ID',
                required: true,
              },
            ],
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'setup',
        description: '設置',
        dm_permission: null,
        options: [
          {
            type: 1,
            name: 'threads-channel',
            description: '創建一個臨時文字頻道(討論串)',
            options: [
              {
                type: 7,
                name: 'channel',
                description: '指定臨時頻道的位置',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'music-bot',
            description: '設定音樂電台',
            options: [
              {
                type: 7,
                name: 'channel',
                description: '音樂頻道位置',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'report-channel',
            description: '設定舉報頻道',
            options: [
              {
                type: 7,
                name: 'channel',
                description: '舉報頻道位置',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'count-channel',
            description: '設定數數字頻道',
            options: [
              {
                type: 7,
                name: 'channel',
                description: '數數字頻道位置',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'suggestion-channel',
            description: '設置建議頻道位置',
            options: [
              {
                type: 7,
                name: 'channel',
                description: '建議頻道位置',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'connections-channel',
            description: '連接柚子醬的專屬跨服頻道！[測試版]',
            options: [
              {
                type: 7,
                name: 'channel',
                description:
                  '連接的頻道 (注意：千萬不要刪除該頻道的webhook！或是webhook不要超過5個，否則無法創建喔！)',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'tempvc-channel',
            description: '創建一個語音大廳！並且創建一個類別供臨時頻道的放置！',
            options: [],
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'poll',
        description: '創建一個投票！',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'title',
            description: '標題',
            required: true,
          },
          {
            type: 3,
            name: 'description',
            description: '敘述',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'google',
        description: '搜尋引擎。 為啥不直接開個網頁直接搜尋啊?',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'search',
            description: '搜尋關鍵字',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'kick',
        description: '踢除成員',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'userid',
            description: '成員ID',
            required: true,
          },
          {
            type: 3,
            name: 'reason',
            description: '原因',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'ban',
        description: '封鎖成員',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'user-id',
            description: '成員ID',
            required: true,
          },
          {
            type: 3,
            name: 'reason',
            description: '原因',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'test',
        description: '一個測試命令? 小心一點！[不要隨意觸發]',
        dm_permission: null,
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'hank',
        description: '來入侵別人的帳號！',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'user',
            description: '"提及" 成員，以便我來黑他！',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'race',
        description: '5 台車比賽！看誰跑得快！',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'long',
            description: '路長(不可超過10個單位長！)',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'summon',
        description: '召喚我到語音頻道！',
        dm_permission: null,
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'minecraft-player',
        description: 'Minecraft玩家資訊',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'player_name',
            description: '玩家名稱 ',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'burn',
        description:
          '燃燒吧～！聊天室！ (注意：訊息將會被燃燒殆盡！等同於 /clear )',
        dm_permission: null,
        options: [
          {
            type: 10,
            name: 'num',
            description: '燃燒的範圍 ( 上限 25 )',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'calc',
        description: '計算機? 好像可以算平方開根號?',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'math',
            description: '你的算式',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'dm',
        description: 'DM成員！',
        dm_permission: null,
        options: [
          {
            type: 6,
            name: 'user',
            description: '成員',
            required: true,
          },
          {
            type: 3,
            name: 'text',
            description: '內容',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'giveaway',
        description: '抽獎時間！[此功能已下架]',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'time',
            description: '時間(以"-"分開，Day-hour-Min)',
            required: true,
          },
          {
            type: 3,
            name: 'prize',
            description: '獎品內容',
            required: true,
          },
          {
            type: 3,
            name: 'winners',
            description: '抽選人數',
            required: false,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'server-info',
        description: '伺服器資訊！',
        dm_permission: null,
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'music',
        description: '音樂 [測試版]',
        dm_permission: null,
        options: [
          {
            type: 1,
            name: 'help',
            description: '有關音樂命令',
          },
          {
            type: 1,
            name: 'force-play',
            description: '強制插入音樂',
            options: [
              {
                type: 3,
                name: 'name',
                description: '名稱或是連結',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'loop',
            description: '重複播放',
          },
          {
            type: 1,
            name: 'unloop',
            description: '取消重複播放',
          },
          {
            type: 1,
            name: 'lyrics',
            description: '尋找歌曲(從歌詞中)',
            options: [
              {
                type: 3,
                name: 'text',
                description: '歌詞',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'pause',
            description: '暫停歌曲',
          },
          {
            type: 1,
            name: 'play',
            description: '播放歌曲',
            options: [
              {
                type: 3,
                name: 'name',
                description: '曲目 名稱/連結',
                required: true,
              },
            ],
          },
          {
            type: 1,
            name: 'nowplaying',
            description: '正在播放',
          },
          {
            type: 1,
            name: 'save',
            description: '儲存至曲目中',
          },
          {
            type: 1,
            name: 'summon',
            description: '將我拉入語音頻道',
            options: [
              {
                type: 7,
                name: 'channel',
                description: '頻道',
                required: true,
              },
            ],
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'invite',
        description: '邀請機器人到你的伺服器(也就是接我邀請進去！)',
        dm_permission: null,
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'dm-embed',
        description: 'DM成員！',
        dm_permission: null,
        options: [
          {
            type: 6,
            name: 'user',
            description: '成員',
            required: true,
          },
          {
            type: 3,
            name: 'title',
            description: '標題',
            required: true,
          },
          {
            type: 3,
            name: 'text',
            description: '內容',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'help',
        description: '一個機器人的核心操作手冊',
        dm_permission: null,
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'clear',
        description: '清除聊天室',
        dm_permission: null,
        options: [
          {
            type: 10,
            name: 'num',
            description: '數量 (最大值為100)',
            required: true,
          },
          {
            type: 6,
            name: 'user',
            description: '指定成員',
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: '8ball',
        description: '一個神奇的東西?',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'what-to-ask',
            description: '輸入你想問的問題?或許他的回答會幫助你owo?',
            required: true,
          },
        ],
      },
      {
        default_permission: true,
        default_member_permissions: null,
        type: 1,
        name: 'ping',
        description: '看看我會不會回你訊息? ',
        dm_permission: null,
        options: [
          {
            type: 3,
            name: 'hi',
            description: '這個輸入不影響回答owob',
          },
        ],
      },
    ],
  });
}

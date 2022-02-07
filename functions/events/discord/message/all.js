// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
//function 等待命令
let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
//console.log(`取得各項基本東西..`);
//前置 取得建議頻道
let suggestions_channel = await lib.utils.kv['@0.1.16'].get({
  key: `Suggestions_${context.params.event.guild_id}_channelid`,
  defaultValue: 0,
});
//let channelid = channel_id; //'849835494317359125'
//前置 取得數數字頻道
let count_channel = await lib.utils.kv['@0.1.16'].get({
  key: `count_${context.params.event.guild_id}_channelid`,
  defaultValue: 0,
});
//取得 跨服連線
let Connection_guild_channelid = await lib.utils.kv['@0.1.16'].get({
  key: `Connections_${context.params.event.guild_id}_channelid`,
  //value: result,
});

//前置
const event = context.params.event;
let message = context.params.event.content;
//取得版本
let Version = await lib.utils.kv['@0.1.16'].get({
  key: `bot_Version`,
});
//髒話列表取得
let badWordList = process.env.UNWANTED_WORDS.split(', ').join('|');
let badWordsRegex = new RegExp(badWordList, 'i');
//console.log(badWordsRegex);
//let context.params.event.content = context.params.event.content;
//
//
//
//
//判斷是否執行回應
//if (!suggestions_channel === context.params.event.channel_id | !count_channel === context.params.event.channel_id | !Connection_guild_channelid === context.params.event.channel_id) {}
//console.log((!suggestions_channel === context.params.event.channel_id) | (!count_channel === context.params.event.channel_id) | (!Connection_guild_channelid === context.params.event.channel_id));
if (suggestions_channel != context.params.event.channel_id) {
  if (count_channel != context.params.event.channel_id) {
    if (Connection_guild_channelid != context.params.event.channel_id) {
      //
      //
      //
      //
      //
      //井字棋
      const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
      let sleep = async (ms) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      };
      let emptyTile = '⬛';
      let piece1 = '⭕';
      let piece2 = '❌';
      
      let checkState = (board) => {
        let hasRowMatch = board.find((row) => {
          return row[0] !== emptyTile && row[0] === row[1] && row[1] === row[2];
        });
        let hasColumnMatch = board[0].find((columnHeader, i) => {
          return (
            columnHeader !== emptyTile &&
            columnHeader === board[1][i] &&
            board[1][i] === board[2][i]
          );
        });
        let hasDiagonalMatch =
          (board[0][0] !== emptyTile &&
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2]) ||
          (board[0][2] !== emptyTile &&
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0]);
        let isFull = !board.find((row) => {
          return row.find((tile) => {
            return tile === emptyTile;
          });
        });
        if (hasRowMatch || hasColumnMatch || hasDiagonalMatch) {
          return '贏';
        } else if (isFull) {
          return '平手';
        } else {
          return '不完整';
        }
      };
      
      //let event = context.params.event;
      let referencedMessage = event.referenced_message;
      
      if (
        !referencedMessage &&
        (event.content.startsWith(`!ttt`) || event.content.startsWith(`!tictactoe`))
      ) {
        if (!event.mentions.length) {
          return lib.discord.channels['@0.1.2'].messages.create({
            channel_id: `${event.channel_id}`,
            content: `你必須提及要對戰的人！`,
          });
        }
        let starterBoard = [
          [emptyTile, emptyTile, emptyTile],
          [emptyTile, emptyTile, emptyTile],
          [emptyTile, emptyTile, emptyTile],
        ];
        await lib.discord.channels['@0.1.1'].messages.create({
          channel_id: `${event.channel_id}`,
          content: [
            `這是井字遊戲！ <@!${event.author.id}>，輪到你了！你是 ${piece1}。`,
            ``,
            `使用**回覆**來告訴我你所選的行（a、b 或 c）和列（1、2 或 3）。例如，\`a,1\``,
            ``,
            `<@!${event.mentions[0].id}>，你是下一個。`,
          ].join('\n'),
          embed: {
            type: 'rich',
            description: starterBoard
              .map((row) => {
                return row.join('');
              })
              .join('\n'),
            color: 0x00aaaa,
          },
        });
      } else if (
        referencedMessage &&
        referencedMessage.author.bot &&
        referencedMessage.content.startsWith(`這是井字遊戲！`)
      ) {
        let botResponse = await lib.discord.users['@0.1.4'].me.list();
        if (referencedMessage.author.id !== botResponse.id) {
          return;
        }
        let currentUser;
        let nextUser;
        let currentPiece = referencedMessage.content.includes(piece1)
          ? piece1
          : piece2;
        if (!referencedMessage.mentions[1]) {
          // Playing against yourself
          currentUser = referencedMessage.mentions[0].id;
          nextUser = referencedMessage.mentions[0].id;
        } else if (
          referencedMessage.content.indexOf(referencedMessage.mentions[0].id) <
          referencedMessage.content.indexOf(referencedMessage.mentions[1].id)
        ) {
          currentUser = referencedMessage.mentions[0].id;
          nextUser = referencedMessage.mentions[1].id;
        } else {
          currentUser = referencedMessage.mentions[1].id;
          nextUser = referencedMessage.mentions[0].id;
        }
        if (event.author.id !== currentUser) {
          await lib.discord.channels['@0.1.2'].messages.destroy({
            message_id: `${context.params.event.id}`,
            channel_id: `${context.params.event.channel_id}`,
          });
          return lib.discord.channels['@0.1.2'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `抱歉，現在是 <@!${currentUser}> 的回合！`,
          });
        }
        let currentBoard = referencedMessage.embeds[0].description
          .split('\n')
          .map((row) => {
            return [...row]; // Split on empty character does not work on emoji
          });
        let row = event.content.split(',')[0].trim().toLowerCase();
        let column = parseInt((event.content.split(',')[1] || '').trim());
        if (!['a', 'b', 'c'].includes(row) || ![1, 2, 3].includes(column)) {
          await lib.discord.channels['@0.1.2'].messages.destroy({
            message_id: `${context.params.event.id}`,
            channel_id: `${context.params.event.channel_id}`,
          });
          let message_create = await lib.discord.channels['@0.1.2'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `抱歉 <@!${currentUser}>，${event.content} 不是有效的位置！試試“a,1”。`,
          });
      
          await sleep(5000);
          return lib.discord.channels['@0.2.2'].messages.destroy({
            message_id: `${message_create.id}`,
            channel_id: `${context.params.event.channel_id}`,
          });
        }
        if (row === 'a') {
          row = 0;
        } else if (row === 'b') {
          row = 1;
        } else {
          row = 2;
        }
        column = column - 1;
        let currentTile = currentBoard[row][column];
        if (currentTile !== emptyTile) {
          await lib.discord.channels['@0.1.2'].messages.destroy({
            message_id: `${context.params.event.id}`,
            channel_id: `${context.params.event.channel_id}`,
          });
          let message_create = await lib.discord.channels['@0.1.2'].messages.create({
            channel_id: `${context.params.event.channel_id}`,
            content: `抱歉<@!${currentUser}>，${event.content} 已經有了！`,
          });
      
          await sleep(5000);
          return lib.discord.channels['@0.2.2'].messages.destroy({
            message_id: `${message_create.id}`,
            channel_id: `${context.params.event.channel_id}`,
          });
        }
        currentBoard[row][column] = currentPiece;
        let replyContent;
        let gameState = checkState(currentBoard);
        if (gameState === '贏') {
          replyContent = `遊戲結束了！ <@!${currentUser}> 獲勝！`;
        } else if (gameState === '平手') {
          replyContent = `遊戲結束了！這是一個平局！`;
        } else {
          replyContent = [
            `這是井字遊戲！ <@!${nextUser}>，輪到你了！你是${
              currentPiece === piece1 ? piece2 : piece1
            }.`,
            ``,
            `使用**回覆**來告訴我你所選的行（a、b 或 c）和列（1、2 或 3）。例如，\`a,1\``,
            ``,
            `<@!${currentUser}>，你是下一個。`,
          ].join('\n');
        }
        let newEmbed = referencedMessage.embeds[0];
        newEmbed.description = currentBoard
          .map((row) => {
            return row.join('');
          })
          .join('\n');
        /*
        return lib.discord.channels['@0.1.2'].messages.create({
          channel_id: `${event.channel_id}`,
          content: replyContent,
          embed: newEmbed
        });
        */
        lib.discord.channels['@0.3.0'].messages.update({
          message_id: `${context.params.event.referenced_message.id}`,
          channel_id: `${event.channel_id}`,
          content: replyContent,
          embed: newEmbed,
        });
        return lib.discord.channels['@0.3.0'].messages.destroy({
          message_id: `${context.params.event.id}`,
          channel_id: `${context.params.event.channel_id}`,
        });
      }
      
      //
      //
      //
      //
      //tag-youzi
      // Only respond to messages containing the word
      if (
        context.params.event.content.match(
          /856918496893599805|934974248148156476*/
        )
      ) {
        let messageContent = [``];
        if (context.params.event.content.match(/856918496893599805*/)) {
          messageContent = [
            `他不太喜歡有人提及他`,
            `== 不要提及到他！`,
            `你提及他...你確定是有急事嗎?`,
            `你呼叫的人好像...正在忙?`,
            `如果有任何問題請私信他，或是至支援伺服器找他！`,
          ];
        } else if (context.params.event.content.match(/934974248148156476*/)) {
          messageContent = [
            `請使用 \`/help\`！ 我不喜歡有人提及/回覆我，因為我不會想要去理解那則訊息。`,
            `請使用 \`/help\`！== 不要提及到我！`,
            `請使用 \`/help\`！找我有啥事?`,
            `請使用 \`/help\`！不要找我。`,
            `請使用 \`/help\`！你找我能做啥?`,
            `請使用 \`/help\`！我不想聽你說話。`,
            `請使用 \`/help\`！(╯°□°）╯︵ ┻━┻ 不要煩我！`,
          ];
        }
        let random =
          messageContent[Math.floor(Math.random() * messageContent.length)];

        let send_tag_msg = await lib.discord.channels['@0.0.6'].messages.create(
          {
            channel_id: context.params.event.channel_id,
            content: `<@${context.params.event.author.id}>, ${random}`,
            message_reference: {
              message_id: context.params.event.id,
            },
          }
        );
        //console.log(`OK > ${context.params.event.content}`);

        await sleep(10000);

        await lib.discord.channels['@0.2.2'].messages.destroy({
          message_id: `${send_tag_msg.id}`,
          channel_id: `${send_tag_msg.channel_id}`,
        });
      }
      //
      //let mentions = context.params.event.metnions.map(m => m.id)
      //if (mentions.includes('856918496893599805') {
      //console.log(`tag_youzi is ok`);
      //
      //
      //
      //
      //
      //
      //
      //
      //過濾髒話
      if (context.params.event.content.match(badWordsRegex)) {
        let webhook_content = context.params.event.content.replace(
          badWordsRegex,
          '||*//已刪除//*||'
        );
        for (let i = 0; webhook_content.match(badWordsRegex); i++) {
          console.log(`不雅數量：${i}個`);
          webhook_content = webhook_content.replace(
            badWordsRegx,
            '||*//已刪除//*||'
          );
        }
        let webhook_clone_user_info = await lib.discord.guilds[
          '@0.2.2'
        ].members.retrieve({
          user_id: `${context.params.event.author.id}`,
          guild_id: `${context.params.event.guild_id}`,
        });
        //console.log(`${webhook_content} ${webhook_name} ${webhook_avatar}`);
        //webhook_${context.params.event.channel_id}_data  取得該頻道的webhook
        webhook_create = await lib.discord.webhooks['@0.0.0'].create({
          channel_id: `${context.params.event.channel_id}`,
          name: `clone_Bot_webhook`,
        });

        if (!webhook_clone_user_info.nick) {
          webhook_name = webhook_clone_user_info.user.username;
        } else {
          webhook_name = webhook_clone_user_info.nick;
        }
        let webhook_clone_user_avatar_url =
          webhook_clone_user_info.user.avatar_url;
        if (webhook_clone_user_avatar_url) {
          let gifCheckResponse = await lib.http.request['@1.1.5']({
            method: 'GET',
            url: webhook_clone_user_avatar_url.replace('.png', '.gif'),
          });
          if (gifCheckResponse.statusCode === 200) {
            webhook_clone_user_avatar_url =
              webhook_clone_user_avatar_url.replace('.png', '.gif');
          }
        }
        if (!webhook_clone_user_avatar_url) {
          let discriminator =
            webhook_clone_user_info.user.discriminator.split('');
          if (discriminator[3] === `0` || discriminator[3] === `5`) {
            webhook_clone_user_avatar_url = `https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png`;
          } else if (discriminator[3] === `1` || discriminator[3] === `6`) {
            webhook_clone_user_avatar_url = `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`;
          } else if (discriminator[3] === `2` || discriminator[3] === `7`) {
            webhook_clone_user_avatar_url = `https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png`;
          } else if (discriminator[3] === `3` || discriminator[3] === `8`) {
            webhook_clone_user_avatar_url = `https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png`;
          } else if (discriminator[3] === `4` || discriminator[3] === `9`) {
            webhook_clone_user_avatar_url = `https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png`;
          }
        }
        // Sends message using your webhook
        await lib.discord.channels['@0.2.2'].messages.destroy({
          message_id: `${context.params.event.id}`,
          channel_id: `${context.params.event.channel_id}`,
        });
        await lib.discord.webhooks['@0.0.0'].execute({
          webhook_id: webhook_create.id, // required
          webhook_token: webhook_create.token, // required
          content: `${webhook_content}`,
          username: `${webhook_name} - [已過濾不當字串]`,
          avatar_url: webhook_clone_user_avatar_url,
        });
        await lib.discord.webhooks['@0.0.0'].destroy({
          webhook_id: `${webhook_create.id}`,
        });
      }
      //
      //
      //
      //
      //say-hi

      // Only respond to messages containing the word "hi", "hey", "hello", or "sup"
      if (
        context.params.event.content.match(
          /\bhi\b|\bhey\b|\bhello\b|\bbye\b|\bbyebye\b|\bcya\b|\bgtg\b|\bsup\b|嗨|你好|歡迎|掰|掰掰/i
        )
      ) {
        let messageContent = context.params.event.content.match(
          /\bhi\b|\bhey\b|\bhello\b|\bbye\b|\bbyebye\b|\bcya\b|\bgtg\b|\bsup\b|嗨|你好|歡迎|掰|掰掰/i
        );
        let message_reference = [`**${messageContent}~!  👋**`];
        let send_hello_msg = await lib.discord.channels[
          '@0.0.6'
        ].messages.create({
          channel_id: context.params.event.channel_id,
          content: `${message_reference[0]}`,
          message_reference: {
            message_id: context.params.event.id,
          },
        });

        await sleep(10000);

        await lib.discord.channels['@0.2.2'].messages.destroy({
          message_id: `${send_hello_msg.id}`,
          channel_id: `${send_hello_msg.channel_id}`,
        });
      }

      //say 特殊字詞
      if (context.params.event.content.match(/笑死/i)) {
        let messageContent = [
          `死了沒? 是有多好笑? (= =?`,
          `死了喔? 那你怎麼還在這裡? (owo?`,
          `趕快去死！(www`,
          `我們永遠懷念你！(xdd`,
        ];
        let random =
          messageContent[Math.floor(Math.random() * messageContent.length)];
        let send_match_msg = await lib.discord.channels[
          '@0.0.6'
        ].messages.create({
          channel_id: context.params.event.channel_id,
          content: `${random}`,
          message_reference: {
            message_id: context.params.event.id,
          },
        });
        await sleep(10000);

        await lib.discord.channels['@0.2.2'].messages.destroy({
          message_id: `${send_match_msg.id}`,
          channel_id: `${send_match_msg.channel_id}`,
        });
      } else if (context.params.event.content.match(/酷|cool/i)) {
        let messageContent = [`酷ㄟ！`, `cool!`, `神奇！`, `有趣！`];
        let random =
          messageContent[Math.floor(Math.random() * messageContent.length)];
        let send_match_msg = await lib.discord.channels[
          '@0.0.6'
        ].messages.create({
          channel_id: context.params.event.channel_id,
          content: `${random}`,
          message_reference: {
            message_id: context.params.event.id,
          },
        });
        await sleep(10000);

        await lib.discord.channels['@0.2.2'].messages.destroy({
          message_id: `${send_match_msg.id}`,
          channel_id: `${send_match_msg.channel_id}`,
        });
      } else if (context.params.event.content.match(/完蛋/i)) {
        let messageContent = [
          `你估計真的完了。`,
          `是啥悲慘事情?`,
          `快來拜我！(awa`,
          `完了。`,
        ];
        let random =
          messageContent[Math.floor(Math.random() * messageContent.length)];
        let send_match_msg = await lib.discord.channels[
          '@0.0.6'
        ].messages.create({
          channel_id: context.params.event.channel_id,
          content: `${random}`,
          message_reference: {
            message_id: context.params.event.id,
          },
        });
        await sleep(10000);

        await lib.discord.channels['@0.2.2'].messages.destroy({
          message_id: `${send_match_msg.id}`,
          channel_id: `${send_match_msg.channel_id}`,
        });
      } else if (context.params.event.content.match(/蛤/i)) {
        let messageContent = [`蛤蜊在水裡啦，蛤啥蛤? `, `你在講蝦?`];
        let random =
          messageContent[Math.floor(Math.random() * messageContent.length)];
        let send_match_msg = await lib.discord.channels[
          '@0.0.6'
        ].messages.create({
          channel_id: context.params.event.channel_id,
          content: `${random}`,
          message_reference: {
            message_id: context.params.event.id,
          },
        });
        await sleep(10000);

        await lib.discord.channels['@0.2.2'].messages.destroy({
          message_id: `${send_match_msg.id}`,
          channel_id: `${send_match_msg.channel_id}`,
        });
      }
      //console.log(`say_hi is ok`);
      //
      //
      //
      //
      //help取得
      if (context.params.event.content.match(/^help/i)) {
        await lib.discord.users['@0.2.0'].dms
          .create({
            recipient_id: context.params.event.author.id,
            content: '需要幫助? 這是命令列表！',
            tts: false,
            embed: {
              title: '命令列表' /** you can change the embed title here **/,
              description: '請選擇一個分類！',
              color: 0x00aaaa /** you can change the embed color here **/,
              thumbnail: {
                url: `https://media.discordapp.net/attachments/878151893677924362/904726989393510400/discord_icon_-_.png?width=406&height=406`,
                height: 0,
                width: 0,
              },
              footer: {
                text: ` | 柚子Yozui 的機器人`,
                icon_url: `https://images-ext-2.discordapp.net/external/-dneiXRI0E1U8_fTJDS6rGbZ6LMTYls7008ELlgE76Q/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/901790338069450753/e8ee4d63871b5af23ff0c611462ddbc6.webp?width=406&height=406`,
                proxy_icon_url: `https://discord.gg/Vq3F8DUNzf`,
              },
            },
            //end of embed
            components: [
              {
                type: 1,
                components: [
                  {
                    type: 3,
                    custom_id: 'help-menu',
                    options: [
                      {
                        label: '一般',
                        value: 'help-common',
                        description: '常見的指令',
                        emoji: {
                          name: '🔰',
                        },
                      },
                      {
                        label: '趣味',
                        value: 'help-joy',
                        description: '專門搞笑用的?',
                        emoji: {
                          name: '🎲',
                        },
                      },
                      {
                        label: '控制',
                        value: 'help-control',
                        description: '控制機器人',
                        emoji: {
                          name: '🕹',
                        },
                      },
                      {
                        label: '管理',
                        value: 'help-mod',
                        description: '管理成員與伺服器',
                        emoji: {
                          name: '🛠',
                        },
                      },
                      {
                        label: '設定',
                        value: 'help-setting',
                        description: '設定有關機器人的功能',
                        emoji: {
                          name: '⚙',
                        },
                      },
                      {
                        label: '互動',
                        value: 'help-interactive',
                        description: '與機器人的互動功能',
                        emoji: {
                          name: '👾',
                        },
                      },
                      {
                        label: '其它',
                        value: 'help-others',
                        description: '其他指令',
                        emoji: {
                          name: '➖',
                          //id: '837125081763282955',
                        },
                      },
                    ],
                    placeholder: '命令列表｜請選擇一個分類',
                    min_values: 1,
                    max_values: 1,
                  },
                ],
              },
              {
                type: 1,
                components: [
                  {
                    style: 4,
                    label: `刪除幫助列表`,
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
                    label: `機器人版本：${Version}`,
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
            //end of menu
          })
          .catch(() => {
            console.log(`** 無法發送私人訊息`);
            lib.discord.channels['@0.3.0'].messages.reactions.create({
              emoji: `<:warning_gif:915265609342804048>`,
              message_id: `${context.params.event.id}`,
              channel_id: `${context.params.event.channel_id}`,
            });
            return;
          });
        //end of dm
        await lib.discord.channels['@0.3.0'].messages.reactions.create({
          emoji: `<:youzi_removebg:931773827116040263>`,
          message_id: `${context.params.event.id}`,
          channel_id: `${context.params.event.channel_id}`,
        });
      }
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //與機器人說話
      if (context.params.event.channel_id == 914091325715017728) {
        const axios = require('axios');

        const message = context.params.event.content;
        const bot_name = '柚子醬'; //Your bot name
        const channel_id = '914091325715017728'; //ID of the channel where you want the chat bot to respond

        let returnMsg = await axios(
          `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(
            message
          )}&botname=${encodeURIComponent(
            bot_name
          )}&ownername=CTK WARRIOR&user=${context.params.event.author.id}`
        );
        returnMsg = returnMsg ? returnMsg.data : false;
        if (!returnMsg || !returnMsg.message) return;
        await lib.discord.channels['@0.1.1'].messages.create({
          channel_id: context.params.event.channel_id,
          content: returnMsg.message,
          message_reference: {
            message_id: context.params.event.id,
          },
        });
      }
      //
      //
      //
      //
      //抽獎活動
      if (context.params.event.channel_id === 'X') {
        //862278436064067584
        let event_data_list = await lib.utils.kv['@0.1.16'].get({
          key: `抽獎活動`,
        });
        let event_data = `${context.params.event.author.id}`;
        if (!event_data_list) {
          await lib.utils.kv['@0.1.16'].set({
            key: `抽獎活動`,
            value: `\`${event_data}\``, // required
          });
        } else {
          await lib.utils.kv['@0.1.16'].set({
            key: `抽獎活動`,
            value: `${event_data_list},\`${event_data}\``, // required
          });
        }
        await lib.discord.channels['@0.2.2'].messages.reactions.create({
          emoji: `<:click_v:858993551618473984>`,
          message_id: `${context.params.event.id}`,
          channel_id: `${context.params.event.channel_id}`,
        });
      }
      //
      //
      //
      //
      //新增反應

      if (
        context.params.event.content.match(
          /公告|#關於我|歡迎|加入|youtube.com|invite|discord.gg/i
        )
      ) {
        if (context.params.event.guild_id == '849809683085525032') {
          // *** Set your channel ID and emojis here ***
          //const channel_id = context.params.event.channel_id;
          //const message = context.params.event.id;
          const emojis = ['👍', '❤', '🥰', '😁', '😮', '😥', '😡'];

          // Create the original message

          // React with the emojis
          for (let i = 0; i < emojis.length; i++) {
            await lib.discord.channels['@0.2.2'].messages.reactions.create({
              emoji: emojis[i],
              message_id: `${context.params.event.id}`,
              channel_id: `${context.params.event.channel_id}`,
            });
          }
        }
      }

      //console.log(`add 反應 is ok`);
      //
      //
      //
      //
      //取得時間
      if (
        context.params.event.content.match(
          /時間|\btime\b|\bdate\b|\bday\b|日期/i
        )
      ) {
        let now = new Date();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hour = now.getHours() + 8;
        let min = now.getMinutes();
        let year = now.getFullYear();
        let seconds = now.getSeconds();

        let time = `${hour}時${min}分${seconds}秒`;
        let date = `${year}年${month}月${day}日`;

        switch (new Date().getDay()) {
          case 0:
            day = '星期日';
            break;
          case 1:
            day = '星期一';
            break;
          case 2:
            day = '星期二';
            break;
          case 3:
            day = '星期三';
            break;
          case 4:
            day = '星期四';
            break;
          case 5:
            day = '星期五';
            break;
          case 6:
            day = '星期六';
        }

        let timemsg = await lib.discord.channels['@0.0.6'].messages.create({
          channel_id: `${context.params.event.channel_id}`,
          content: `現在時間: **\`${time}\`** \n**  **                  **\`${date}\` \`${day}\`**  *(台灣時間)*`,
          message_reference: {
            message_id: context.params.event.id,
          },
        });

        await sleep(20000);

        await lib.discord.channels['@0.2.2'].messages.destroy({
          message_id: `${timemsg.id}`,
          channel_id: `${timemsg.channel_id}`,
        });
      }
      //console.log(`get_time is ok`);
      //
      //
      //
      //
      //邀請連結
      if (context.params.event.content.startsWith(`邀請`)) {
        let info = await lib.discord.users['@0.1.5'].me.list();
        let id = info.id;
        let Avatar = info.avatar_url;
        ////console.log(`${context.params.event.channel_id}`);
        await lib.discord.channels['@0.2.0'].messages.create({
          channel_id: `${context.params.event.channel_id}`,
          content: ``,
          message_reference: {
            message_id: context.params.event.id,
          },
          components: [
            {
              type: 1,
              components: [
                {
                  style: 5,
                  label: `官方網站`,
                  url: `https://sites.google.com/view/youzi/Home`,
                  disabled: false,
                  type: 2,
                },
                {
                  style: 5,
                  label: `支援伺服器`,
                  url: `https://discord.gg/Vq3F8DUNzf`,
                  disabled: false,
                  emoji: {
                    id: `894962565044658206`,
                    name: `information`,
                    animated: false,
                  },
                  type: 2,
                },
                {
                  style: 5,
                  label: `邀請我`,
                  url: `${process.env.invite_url}`,
                  disabled: false,
                  emoji: {
                    id: `931773827116040263`,
                    name: `youzi_removebg`,
                    animated: false,
                  },
                  type: 2,
                },
              ],
            },
          ],
          embeds: [
            {
              type: 'rich',
              title: `柚子醬！`,
              description: `相關指令與問題回報請至以下[伺服器](https://discord.gg/Vq3F8DUNzf)回報！\n 如果喜歡這個機器人也歡迎其他人[邀請](${process.env.invite_url})喔！`,
              color: 0x499307,
              fields: [
                {
                  name: `<:Discovery:894962564415492216> 製作者`,
                  value: `<@856918496893599805>`,
                  inline: true,
                },
                //{
                //  name: `<:Discovery:894962564415492216> 協作者`,
                //  value: `<@645251944624947202>`,
                //  inline: true,
                //},
                {
                  name: `<:discord_coop:894962564851712010> 機器人架設`,
                  value: `\`Autocode\``,
                  inline: true,
                },
              ],
              thumbnail: {
                url: `https://media.discordapp.net/attachments/878151893677924362/904726989393510400/discord_icon_-_.png?width=406&height=406`,
                height: 0,
                width: 0,
              },
              footer: {
                text: ` | 柚子Youzi 的機器人`,
                icon_url: `https://images-ext-2.discordapp.net/external/-dneiXRI0E1U8_fTJDS6rGbZ6LMTYls7008ELlgE76Q/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/901790338069450753/e8ee4d63871b5af23ff0c611462ddbc6.webp?width=406&height=406`,
                proxy_icon_url: `https://discord.gg/Vq3F8DUNzf`,
              },
            },
          ],
        });
      }
      //console.log(`invite_me is ok`);

      //
      //
      //
      //
      //等級系統

      //create a database with the following columns (case sensitive):
      //ID, Username, Level, Points. You can also refer to the googlesheets template:
      //https://docs.google.com/spreadsheets/d/1MtxpE5nogVypBQy79iPQ2Y45Q_7thvvGP08dYeDUrYQ/template/preview

      if (context.params.event.guild_id == '849809683085525032') {
        let addpoint = [`1`, `2`, `3`];
        let randompoints =
          addpoint[Math.floor(Math.random() * addpoint.length)];
        //let addpoints = '10'
        let database = await lib.googlesheets.query['@0.3.0'].select({
          range: `A:D`,
          bounds: 'FULL_RANGE',
          where: [
            {
              ID__icontains: `${context.params.event.author.id}`,
            },
          ],
          limit: {
            count: 0,
            offset: 0,
          },
        });
        let initialLevel = 0;
        let points = 1;
        let level = 0;
        if (database.rows.length !== 0) {
          initialLevel = database.rows[0].fields['Level'];
          //initialpointsneed = database.rows[0].fields['Max'];
          points =
            parseInt(database.rows[0].fields['Points']) +
            parseInt(randompoints);
          nextpoints = Math.floor(50 * level + 50);
          level = Math.floor(points / nextpoints);
        }
        let timeout = await lib.utils.kv['@0.1.16'].get({
          key: `timeout`,
          defaultValue: false,
        });

        let roleloc = null;
        let roleid = null;
        let role = null;
        //console.log(context.params.event.content.match(badWordsRegex));
        if (!context.params.event.content.match(badWordsRegex)) {
          if (!timeout) {
            if (database.rows.length === 0) {
              await lib.googlesheets.query['@0.3.0'].insert({
                range: `A:D`,
                fieldsets: [
                  {
                    ID: `${context.params.event.author.id}`,
                    Username: `${context.params.event.author.username}`,
                    Level: `0`,
                    Points: `10`,
                  },
                ],
              });
            } else {
              await lib.googlesheets.query['@0.3.0'].update({
                spreadsheetId: process.env.SPREADSHEET_ID,
                range: `A:D`,
                bounds: 'FULL_RANGE',
                where: [
                  {
                    ID__icontains: `${context.params.event.author.id}`,
                  },
                ],
                limit: {
                  count: 0,
                  offset: 0,
                },
                fields: {
                  Username: `${context.params.event.author.username}`,
                  Level: level,
                  Points: points,
                },
              });
              if (level > initialLevel) {
                await lib.discord.channels['@0.1.0'].messages.create({
                  channel_id: context.params.event.channel_id,
                  content: `做得好，你又提升了一個層次！你的新級別是: Lv.**${level}** ！`,
                  message_reference: {
                    message_id: context.params.event.id,
                  },
                });
              }
              await lib.utils.kv['@0.1.16'].set({
                key: `timeout`,
                value: true,
                ttl: 5,
              });
            }
          }
        }
      }
      //if you would like, you can change the prefix of the following prefix command

      //autorole part
      //let roles = process.env.LEVEL_ROLE_IDS.split(', ');
      //let lev10 = roles[0];
      //let lev25 = roles[1];
      //let lev50 = roles[2];
      //if (points === 500) {
      //  await lib.discord.guilds['@0.1.0'].members.roles.update({
      //    role_id: `${lev10}`,
      //    user_id: `${context.params.event.author.id}`,
      //    guild_id: `${context.params.event.guild_id}`,
      //  });
      //}
      //if (points === 1250) {
      //  await lib.discord.guilds['@0.1.0'].members.roles.update({
      //    role_id: `${lev25}`,
      //    user_id: `${context.params.event.author.id}`,
      //    guild_id: `${context.params.event.guild_id}`,
      //  });
      //}
      //if (points === 2500) {
      //  await lib.discord.guilds['@0.1.0'].members.roles.update({
      //    role_id: `${lev50}`,
      //    user_id: `${context.params.event.author.id}`,
      //    guild_id: `${context.params.event.guild_id}`,
      //  });
      //}

      //判定結束
    }
  }
}
//建議頻道
////console.log(`${context.params.event.channel_id} => 849835494317359125`);

if (context.params.event.channel_id == suggestions_channel) {
  var calc = require('ez-calculator');
  const message = context.params.event;
  let num = await lib.utils.kv['@0.1.16'].get({
    key: `Suggestions_num_${context.params.event.guild_id}`,
    defaultValue: 1,
  });

  //channel of 建議
  await sleep(1500);
  await lib.discord.channels['@0.2.0'].messages.destroy({
    channel_id: context.params.event.channel_id,
    message_id: context.params.event.id,
  });
  const suggestions = await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    //allowed_mentions: {
    //  replied_user: false,
    //  parse: [roles],
    //  roles: ['865176556607242251'],
    //},
    embeds: [
      {
        type: 'rich',
        title: `#${num} 提議：`,
        description: '',
        color: 0xb21818,
        fields: [
          {
            name: `提議內容`,
            value: `${context.params.event.content}`,
          },
        ],
        footer: {
          text: `  |  ${context.params.event.author.username}#${context.params.event.author.discriminator} 提出`,
          icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`,
        },
      },
    ],
  });
  for (let emoji of [
    '<:available:915265608751415316>',
    '<:down:915265608600395836>',
  ]) {
    await lib.discord.channels['@0.2.0'].messages.reactions.create({
      emoji,
      message_id: suggestions.id,
      channel_id: suggestions.channel_id,
    });
  }
  let threads = await lib.discord.channels['@0.2.0'].threads.create({
    channel_id: `${context.params.event.channel_id}`, // required
    name: `提議 ${num} ｜ 討論串`, // required
    auto_archive_duration: 1440,
    message_id: suggestions.id,
    type: 'GUILD_PUBLIC_THREAD',
  });
  let thread = await lib.discord.channels['@0.2.0'].threads.members.create({
    thread_id: `${threads.id}`,
    user_id: `${context.params.event.author.id}`,
  });
  await lib.discord.channels['@0.2.0'].threads.update({
    thread_id: `${threads.id}`,
    rate_limit_per_user: 3,
  });
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: threads.id,
    content: `可在此區討論了喔！或許會有些新的想法可以在這裡作補充！`,
  });
  var result = calc.calculate(`${num}+1`);
  await lib.utils.kv['@0.1.16'].set({
    key: `Suggestions_num_${context.params.event.guild_id}`,
    value: result,
  });
  await sleep(1000);
}
//console.log(`建議頻道 is ok`);

//
//
//
//
//數數字

if (context.params.event.channel_id == `${count_channel}`) {
  //'911211652295307324') {
  //replace with real counting channel id
  //

  //let problem = context.params.event.content.split(' ')[0];
  //let operation = problem.value.split().join(' ');
  //var result = calc.calculate(operation);

  //

  //console.log(`正在取得目前數字`);
  let current_num = await lib.utils.kv['@0.1.16'].get({
    key: `currentnum_count_${context.params.event.guild_id}`,
    defaultValue: 1,
  });
  console.log(current_num);
  console.log(context.params.event.guild_id);
  //let user = context.params.event.member.user.id;
  //console.log(`正在取得是否有權限`);
  let isAdmin = (context.params.event.member.permissions & (1 << 3)) === 1 << 3;
  ////console.log((context.params.event.member.permissions & (1 << 3)) === 1 << 3);
  if (context.params.event.content.startsWith('!reset-count') && isAdmin) {
    await lib.utils.kv['@0.1.16'].set({
      key: `currentnum_count_${context.params.event.guild_id}`,
      value: 1,
    });

    await lib.discord.channels['@0.1.1'].messages.reactions.create({
      emoji: `<:_:894962565044658206>`,
      message_id: `${context.params.event.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
  } else if (parseInt(message.split(' ')[0]) !== parseInt(current_num)) {
    //await lib.discord.channels['@0.1.1'].messages.destroy({
    //  message_id: `${context.params.event.id}`,
    //  count_channel: `${context.params.event.count_channel}`
    //console.log(`正在刪除錯誤的數字`);
    await lib.discord.channels['@0.1.1'].messages.reactions.create({
      emoji: `<:_:860888406773989426>`,
      message_id: `${context.params.event.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
    await sleep(20000);
    await lib.discord.channels['@0.1.1'].messages.destroy({
      message_id: `${context.params.event.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
  }
  //else if (lastuser = user) {
  //await lib.discord.channels['@0.1.1'].messages.destroy({
  //  message_id: `${context.params.event.id}`,
  //  channel_id: `${context.params.event.count_channel}`
  //await lib.discord.channels['@0.1.1'].messages.destroy({
  //  message_id: `${context.params.event.id}`,
  //  channel_id: `${context.params.event.count_channel}`,
  //});
  //}
  else {
    //console.log(`正在給予數字反應`);
    await lib.utils.kv['@0.1.16'].set({
      key: `currentnum_count_${context.params.event.guild_id}`,
      value: parseInt(message.split(' ')[0]) + 1,
    });
    //await lib.utils.kv['@0.1.16'].set({
    //  key: `currentnum_user`,
    //  value: context.params.event.member.user.id,
    //  ttl: 360,
    //});
    await lib.discord.channels['@0.1.1'].messages.reactions.create({
      emoji: `<:_:911213579074666557>`,
      message_id: `${context.params.event.id}`,
      channel_id: `${context.params.event.channel_id}`,
    });
  }
}
//console.log(`count is ok`);

//
//
//
//
//Connection servers
//於前面的前置作業
//執行
if (Connection_guild_channelid === `${context.params.event.channel_id}`) {
  //自己的
  let webhook_username = await lib.discord.guilds['@0.1.0'].members.retrieve({
    user_id: `${context.params.event.author.id}`,
    guild_id: `${context.params.event.guild_id}`,
    //${context.params.event.guild_id} ${process.env.GUILD_ID}
  });
  //get nick
  if (!webhook_username.nick) {
    webhook_nickname = `${context.params.event.author.username}`;
  } else {
    webhook_nickname = webhook_username.nick;
  }
  //get avatar
  let avatarUrl = webhook_username.user.avatar_url;
  if (avatarUrl) {
    let gifCheckResponse = await lib.http.request['@1.1.5']({
      method: 'GET',
      url: avatarUrl.replace('.png', '.gif'),
    });
    if (gifCheckResponse.statusCode === 200) {
      avatarUrl = avatarUrl.replace('.png', '.gif');
    }
  }
  if (!webhook_username.user.avatar) {
    let discriminator = webhook_username.user.discriminator.split('');
    if (discriminator[3] === `0` || discriminator[3] === `5`) {
      avatarUrl = `https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png`;
    } else if (discriminator[3] === `1` || discriminator[3] === `6`) {
      avatarUrl = `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`;
    } else if (discriminator[3] === `2` || discriminator[3] === `7`) {
      avatarUrl = `https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png`;
    } else if (discriminator[3] === `3` || discriminator[3] === `8`) {
      avatarUrl = `https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png`;
    } else if (discriminator[3] === `4` || discriminator[3] === `9`) {
      avatarUrl = `https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png`;
    }
  }
  //取得媒體
  if (context.params.event.attachments[0]) {
    msg_url = `${context.params.event.attachments[0].url}`;
    msg_proxy_url = `${context.params.event.attachments[0].proxy_url}`;
  } else {
    msg_url = '';
    msg_proxy_url = '';
  }
  //取得回復之訊息
  //let webhook_msg_reference = await lib.discord.channels['@0.3.0'].messages.retrieve({
  //  message_id: null, // required
  //  channel_id: null,// required
  //});
  //console.log(context.params.event.referenced_message);
  //console.log(context.params.event.referenced_message.embeds[0].description .author.name
  await lib.discord.channels['@0.2.2'].messages.reactions.create({
    emoji: `<:greencircle:915265605832159342>`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`,
  });
  let webhook = await lib.utils.kv['@0.1.16'].get({
    key: `Connections_${context.params.event.guild_id}_webhook`,
  });
  let Connection_guild_list = await lib.discord.guilds['@0.1.3']
    .list({
      limit: 100,
    })
    .catch(() => {
      console.log(`** 無法取得列表`);
      lib.discord.channels['@0.2.2'].messages.reactions.destroy({
        emoji: `<:greencircle:915265605832159342>`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      lib.discord.channels['@0.2.2'].messages.reactions.create({
        emoji: `<:warning_gif:915265609342804048>`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      return;
    });

  let webhook_guildsend = await lib.discord.guilds['@0.1.0']
    .retrieve({
      //retrieves all the available informations of the server. there is so much more you can do with the info than just server information!
      guild_id: `${context.params.event.guild_id}`,
      with_counts: true,
    })
    .catch(() => {
      console.log(`** 無法取得伺服器`);
      lib.discord.channels['@0.2.2'].messages.reactions.destroy({
        emoji: `<:greencircle:915265605832159342>`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      lib.discord.channels['@0.2.2'].messages.reactions.create({
        emoji: `<:warning_gif:915265609342804048>`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      return;
    });
  await lib.discord.channels['@0.2.2'].messages
    .destroy({
      message_id: `${context.params.event.id}`,
      channel_id: `${context.params.event.channel_id}`,
    })
    .catch(() => {
      console.log(`** webhook無法刪除訊息`);
      lib.discord.channels['@0.2.2'].messages.reactions.destroy({
        emoji: `<:greencircle:915265605832159342>`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      lib.discord.channels['@0.2.2'].messages.reactions.create({
        emoji: `<:warning_gif:915265609342804048>`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      return;
    });
  //發送自己伺服器
  //
  //
  //
  //
  //
  if (!context.params.event.referenced_message) {
    await lib.discord.webhooks['@0.0.0'].execute({
      webhook_id: `${webhook.id}`,
      webhook_token: `${webhook.token}`,
      embeds: [
        {
          type: 'rich',
          title: '',
          description: `${context.params.event.content}`,
          color: 0x3a3a3a,
          author: {
            name: `${webhook_nickname} (${context.params.event.author.username}#${context.params.event.author.discriminator})`,
            icon_url: avatarUrl,
          },
          image: {
            url: `${msg_url}`,
            proxy_url: `${msg_proxy_url}`,
            height: 0,
            width: 0,
          },
          //footer: {
          //  text: `ID: ${context.params.event.author.id}`
          //},
        },
      ],
      content: ``, //${context.params.event.content}\n> (於 ${webhook_guildsend.name} )
      username: `${webhook_guildsend.name}`,
      avatar_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${webhook_guildsend.icon}.png`,
    });
    //
    //
    //
  } else {
    await lib.discord.webhooks['@0.0.0'].execute({
      webhook_id: `${webhook.id}`,
      webhook_token: `${webhook.token}`,
      embeds: [
        {
          type: 'rich',
          title: '',
          description: `${context.params.event.content}`,
          fields: [
            {
              name: `<:return:927185678255677440> ${context.params.event.referenced_message.embeds[0].author.name}`,
              value: `${context.params.event.referenced_message.embeds[0].description} \n[[原訊息]](https://discord.com/channels/${context.params.event.guild_id}/${context.params.event.channel_id}/${context.params.event.referenced_message.id}) `,
            },
          ],
          color: 0x3a3a3a,
          author: {
            name: `${webhook_nickname} (${context.params.event.author.username}#${context.params.event.author.discriminator})`,
            icon_url: avatarUrl,
          },
          image: {
            url: `${msg_url}`,
            proxy_url: `${msg_proxy_url}`,
            height: 0,
            width: 0,
          },
          //footer: {
          //  text: `ID: ${context.params.event.author.id}`
          //},
        },
      ],
      content: ``, //${context.params.event.content}\n> (於 ${webhook_guildsend.name} )
      username: `${webhook_guildsend.name}`,
      avatar_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${webhook_guildsend.icon}.png`,
      components: [
        {
          type: 1,
          components: [
            {
              style: 1,
              label: `${context.params.event.referenced_message.embeds[0].author.name}`,
              custom_id: `webhook_referenced_1`,
              disabled: true,
              emoji: {
                id: `927185678255677440`,
                name: `return`,
                animated: false,
              },
              type: 2,
            },
            {
              style: 5,
              label: `${context.params.event.referenced_message.embeds[0].description}`,
              url: `https://discord.com/channels/${context.params.event.guild_id}/${context.params.event.channel_id}`,
              disabled: false,
              type: 2,
            },
          ],
        },
        /*
        {
          type: 1,
          components: [
            
          ],
        },
        */
      ],
    });
  }

  //
  //
  //
  //
  //

  //重複於所有伺服器
  for (let i = 0; i < `${Connection_guild_list.length}`; i++) {
    //Connection_guild_list[i].id
    Connection_guild_channelid = await lib.utils.kv['@0.1.16'].get({
      key: `Connections_${Connection_guild_list[i].id}_channelid`,
    });
    webhook = await lib.utils.kv['@0.1.16'].get({
      key: `Connections_${Connection_guild_list[i].id}_webhook`,
    });
    //console.log(webhook);
    if (webhook) {
      if (context.params.event.guild_id != `${Connection_guild_list[i].id}`)
        if (!context.params.event.referenced_message) {
          //發送webhook
          await lib.discord.webhooks['@0.0.0']
            .execute({
              webhook_id: `${webhook.id}`,
              webhook_token: `${webhook.token}`,
              embeds: [
                {
                  type: 'rich',
                  title: '',
                  description: `${context.params.event.content}`,
                  color: 0x3a3a3a,
                  author: {
                    name: `${webhook_nickname} (${context.params.event.author.username}#${context.params.event.author.discriminator})`,
                    icon_url: avatarUrl,
                  },
                  image: {
                    url: `${msg_url}`,
                    proxy_url: `${msg_proxy_url}`,
                    height: 0,
                    width: 0,
                  },
                  //footer: {
                  //  text: `ID: ${context.params.event.author.id}`
                  //},
                },
              ],
              content: ``, //${context.params.event.content}\n> (於 ${webhook_guildsend.name} )
              username: `${webhook_guildsend.name}`,
              avatar_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${webhook_guildsend.icon}.png`,
            })
            .catch(() => {
              console.log(`** webhook無法發送`);
              //製作退出訊息
              if (true) {
                //啟用消除的開關
                lib.utils.kv['@0.1.16'].clear({
                  key: `Connections_${Connection_guild_list[i].id}_channelid`, // required
                });
                lib.utils.kv['@0.1.16'].clear({
                  key: `Connections_${Connection_guild_list[i].id}_webhook`, // required
                });
              }
            });
          //
        } else {
          await lib.discord.webhooks['@0.0.0']
            .execute({
              webhook_id: `${webhook.id}`,
              webhook_token: `${webhook.token}`,
              embeds: [
                {
                  type: 'rich',
                  title: '',
                  description: `${context.params.event.content}`,
                  fields: [
                    {
                      name: `<:return:927185678255677440> ${context.params.event.referenced_message.embeds[0].author.name} `,
                      value: `${context.params.event.referenced_message.embeds[0].description} \n[[原訊息]](https://discord.com/channels/${context.params.event.guild_id}/${context.params.event.channel_id}/${context.params.event.referenced_message.id}) `,
                    },
                  ],
                  color: 0x3a3a3a,
                  author: {
                    name: `${webhook_nickname} (${context.params.event.author.username}#${context.params.event.author.discriminator})`,
                    icon_url: avatarUrl,
                  },
                  image: {
                    url: `${msg_url}`,
                    proxy_url: `${msg_proxy_url}`,
                    height: 0,
                    width: 0,
                  },
                  //footer: {
                  //  text: `ID: ${context.params.event.author.id}`
                  //},
                },
              ],
              content: ``, //${context.params.event.content}\n> (於 ${webhook_guildsend.name} )
              username: `${webhook_guildsend.name}`,
              avatar_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${webhook_guildsend.icon}.png`,
              components: [
                {
                  type: 1,
                  components: [
                    {
                      style: 1,
                      label: `${context.params.event.referenced_message.embeds[0].author.name}`,
                      custom_id: `webhook_referenced_1`,
                      disabled: true,
                      emoji: {
                        id: `927185678255677440`,
                        name: `return`,
                        animated: false,
                      },
                      type: 2,
                    },
                  ],
                },
                {
                  type: 1,
                  components: [
                    {
                      style: 5,
                      label: `${context.params.event.referenced_message.embeds[0].description}`,
                      url: `https://discord.com/channels/${context.params.event.guild_id}/${context.params.event.channel_id}`,
                      disabled: false,
                      type: 2,
                    },
                  ],
                },
              ],
            })
            .catch(() => {
              console.log(`** webhook無法發送`);
              //製作退出訊息
              if (true) {
                //啟用消除的開關
                lib.utils.kv['@0.1.16'].clear({
                  key: `Connections_${Connection_guild_list[i].id}_channelid`, // required
                });
                lib.utils.kv['@0.1.16'].clear({
                  key: `Connections_${Connection_guild_list[i].id}_webhook`, // required
                });
              }
            });
        }
      //console.log(`ok webhook send!`);
    }
    //end of webhook 重複一次
  }
  //重複結束
}
//完結webhook

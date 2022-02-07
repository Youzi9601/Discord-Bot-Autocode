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
let user = context.params.event.data.options[0].value
let event = context.params.event;

/**
 * 主程式
 */
  if (!user) {
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
      `這是井字遊戲！ <@!${event.member.user.id}>，輪到你了！你是 ${piece1}。`,
      ``, 
      `使用**回覆**來告訴我你所選的行（a、b 或 c）和列（1、2 或 3）。例如，\`a,1\``,
      ``,
      `<@!${user}>，你是下一個。`,
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
/**
 * END
 */
//!weather [city name] shows the weather of that city. 
//To use this, you need to go to https://www.weatherapi.com/signup.aspx and make an account.
//then you need to go to https://www.weatherapi.com/my/ and copy your api key. 
//After copying the api key you need to insert it at line 9 where it saying YourAPIKeyHere and then you are ready to go. 
//Dm Nintendo_bot#7518 for help.   
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const {log_command} = require('log.js');
await log_command(`weather city:${context.params.event.data.options[0].value}`,context.params.event.member.user.username,context.params.event.member.user.id ,context.params.event.channel_id,context.params.event.guild_id );
//if (context.params.event.content.startsWith('!weather')) {
  const args = context.params.event.data.options[0].value; //context.params.event.content.split(' ').slice(1); 
const apiKey = `b45e2e54bef44cdcb35103446220601`; //Add API key here
  if (!args.length)
    return lib.discord.channels['@0.1.2'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `沒有提供任何論據。它應該用作 !weather [城市名稱]`,
    });
  let info = await lib.http.request['@1.1.5'].get({
    url: `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${args}&aqi=no`,//insert API key in this line where it says 'YourAPIKeyGoesHere'
  });
  let message = await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
    tts: false,
    embed: {
      type: 'rich',
      title: ``,
      description: [
        `🗺️ **地點:** ${info.data.location.name}, ${info.data.location.region}, ${info.data.location.country}`,
        `⌛ **當地時間:** ${info.data.location.localtime}`,
        `⏳ **最近更新時間:** ${info.data.current.last_updated}`,
        `🌦️ **天氣:** ${info.data.current.condition.text}`,
        `🌡️ **溫度:** ${info.data.current.temp_c}°C, ${info.data.current.temp_f}°F`,
        `🥵 **體感溫度:** ${info.data.current.feelslike_c}°C, ${info.data.current.feelslike_f}°F`,
        `🍃 **風:** ${info.data.current.wind_mph} mph, ${info.data.current.wind_kph} kph`,
        `🧭 **風向:** ${info.data.current.wind_dir}`,
        `💨 **壓力:** ${info.data.current.pressure_mb} mb, ${info.data.current.pressure_in} in`,
        `💧 **空氣品質:** ${info.data.current.precip_mm} mm, ${info.data.current.precip_in} in`,
        `💧 **濕度:** ${info.data.current.humidity}`,
        `☀️ **UV:** ${info.data.current.uv}`,
      ].join('\n'),
      color: 0x009eff,
      thumbnail: {
        url: `https:${info.data.current.condition.icon}`,
        height: 64,
        width: 64,
      },
    },
  });
//}

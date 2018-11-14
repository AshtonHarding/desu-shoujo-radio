'use strict';
/* desushoujo alert bot */


/* For listening... */
var http = require("http");

const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const discordStatus = 'with icecast';

var sink_options = {
  host: '107.181.154.114',
  port: 8420,
  path: '/sink.ogg'
};
var doobert_options = {
  host: '107.181.154.114',
  port: 8420,
  path: '/doobert.ogg'
};
var kashire_options = {
  host: '107.181.154.114',
  port: 8420,
  path: '/desu.ogg'
};
var cirno_options = {
  host: '107.181.154.114',
  port: 8420,
  path: '/gsf.ogg'
};



function discordBot()
{
  bot.on("ready", () =>
  {
    console.log('[Discord] desu shoujo online.');
    bot.user.setPresence({game:{ name:discordStatus , type: 0} });
    bot.user.setStatus("online");
    var desushoujo_channel = bot.channels.get('294869780324941834');
    var g_channel = bot.channels.get('451471058818695208');
    var wow_channel = bot.channels.get('446040496851386370');

    const sink_url = "http://107.181.154.114:8420/sink.ogg";
    const doobert_url = "http://107.181.154.114:8420/doobert.ogg";
    const kashire_url = "http://107.181.154.114:8420/desu.ogg";
    const cirno_url = "http://107.181.154.114:8420/gsf.ogg";

    var sink_online = false;
    var doobert_online = false;
    var kashire_online = false;
    var cirno_online = false;

    /* Some commands I decided to add... Unrelated. */
    bot.on("message", (message) =>
    {
        /* no longer case sensitive. */
        var lc_msg = message.content.toLowerCase();

        /* Ignore self. */
        if(message.author.bot){ return };

        /* Help = Commands list. */
        if(lc_msg.startswith(config.prefix + "help"))
        {
            message.channel.send('```!help            - what you\'re seeing now.\n' +
//                                    '!yt [query]      - searches youtube for your query.\n' +
            '```');
        }
        /* Youtube search */
/*
        if(lc_msg.startswith(config.prefix + "yt"))
        {
            // Get query
            var yt_query = lc_msg.split('!yt')[1];
            message.challen.send('query = ' + yt_query);
            // Get first video
            var request = require("request");
            var yt_url = 'https://www.youtube.com/results?search_query=' + yt_query;
            request({uri: yt_url},
                function(error, response, body){
                    console.log(body);
            });
            
            
            
            
            
            // get HTML
            // parse via pattern. >> '/<a href="\/watch\?v=(.*?)"/i'
            // return 1st video
            var selected_video = '';
            // print video
        }
*/
    }
    /* Ok commands list is done.  Radio stuff from here. */

    var timelimit = 10000; /* 10000 = 10 seconds */
    var interval = setInterval(function ()
    {
      /* Deals with the error (that crashes shit). */
      process.on('uncaughtException', function (error) {
        console.log(error.stack);
      });
      /* Deals with memory leak from above */
      process.setMaxListeners(0);

      console.log("Checking if online...");

      /* Check Sink */
      http.get(sink_options, function(res) {
        /* Is live. */
        if( (res.statusCode == 200 ) && (!sink_online) )
        {
          console.log("Sink is online");
          desushoujo_channel.sendMessage("Sink is online! LISTEN @ " + sink_url);
          g_channel.sendMessage("Sink is online! LISTEN @ " + sink_url);
          wow_channel.sendMessage("Sink is online! LISTEN @ " + sink_url);
          sink_online = true;
        }

        if( (res.statusCode != 200 ) && (sink_online) )
        {
          desushoujo_channel.sendMessage("Sink's broadcast went offline.");
          g_channel.sendMessage("Sink's broadcast went offline.");
          wow_channel.sendMessage("Sink's broadcast went offline.");
          console.log("Sink went offline.");
          sink_online = false;
        }
      });

      /* Check Doobert */
      http.get(doobert_options, function(res) {
        /* Is live. */
        if( (res.statusCode == 200 ) && (!doobert_online) )
        {
          console.log("Doobert is online");
          desushoujo_channel.sendMessage("Doobert is online! LISTEN @ " + doobert_url);
          g_channel.sendMessage("Doobert is online! LISTEN @ " + doobert_url);
          wow_channel.sendMessage("Doobert is online! LISTEN @ " + doobert_url);
          doobert_online = true;
        }

        if( (res.statusCode != 200 ) && (doobert_online) )
        {
          desushoujo_channel.sendMessage("Doobert's broadcast went offline.");
          g_channel.sendMessage("Doobert's broadcast went offline.");
          wow_channel.sendMessage("Doobert's broadcast went offline.");
          console.log("Doobert went offline.");
          doobert_online = false;
        }
      });

      /* Check Kashire */
      http.get(kashire_options, function(res) {
        /* Is live. */
        if( (res.statusCode == 200 ) && (!kashire_online) )
        {
          console.log("Kashire is online");
          desushoujo_channel.sendMessage("Kashire is online! LISTEN @ " + kashire_url);
          g_channel.sendMessage("Kashire is online! LISTEN @ " + kashire_url);
          wow_channel.sendMessage("Kashire is online! LISTEN @ " + kashire_url);
          kashire_online = true;
        }

        if( (res.statusCode != 200 ) && (kashire_online) )
        {
          desushoujo_channel.sendMessage("Kashire's broadcast went offline.");
          g_channel.sendMessage("Kashire's broadcast went offline.");
          wow_channel.sendMessage("Kashire's broadcast went offline.");
          console.log("Kashire went offline.");
          kashire_online = false;
        }
      });

      /* Check Cirno */
      http.get(cirno_options, function(res) {
        /* Is live. */
        if( (res.statusCode == 200 ) && (!cirno_online) )
        {
          console.log("cirno is online");
          desushoujo_channel.sendMessage("gsf is online! LISTEN @ " + cirno_url);
          g_channel.sendMessage("gsf is online! LISTEN @ " + cirno_url);
          wow_channel.sendMessage("gsf is online! LISTEN @ " + cirno_url);
          cirno_online = true;
        }

        if( (res.statusCode != 200 ) && (cirno_online) )
        {
          desushoujo_channel.sendMessage("gsf's broadcast went offline.");
          g_channel.sendMessage("gsf's broadcast went offline.");
          wow_channel.sendMessage("gsf's broadcast went offline.");
          console.log("cirno went offline.");
          cirno_online = false;
        }
      });

    },timelimit);
  });

  // Console errors
  process.on("unhandledRejection", (error) => { console.error('[discord]',error)});

  // Bot Responses
  bot.on("message", (message) => {
    //Ignore self.
    if(message.author.bot){ return };
    //Testing
  });
  bot.login(config.token);
}

async function main()
{
  discordBot();
}

main();

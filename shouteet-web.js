var view = (function view() {/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdn.auth0.com/styleguide/core/2.0.5/core.min.css" />
  <link rel="stylesheet" href="https://cdn.auth0.com/styleguide/components/2.0.0/components.min.css" />
  <style>
    body {
      min-height: 100vh;
    }
    .flex {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .mic {
      font-size: 40px;
      border-radius: 100px;
      height: 100px;
      width: 100px;
      line-height: 80px;
    }
    .btn {
      border-radius: 100px;
    }
    .result .btn {
      margin: 20px;
    }
    .btn-container {
      margin: 40px;
      position: relative;
    }
    .circle-activity {
      position: absolute;
      height: 100px;
      width: 100px;
      background: #E3E5E7;
      border-radius: 100px;
    }
    .circle-animated {
      animation: expand 1s ease-in-out infinite;
    }
    @media screen and (min-width: 400px) {
      .result {
        flex-direction: row;
      }
    }
    @keyframes expand {
      0%   { transform: scale(1);  }
      20%  { transform: scale(1.5);  }
      70%  { transform: scale(1.1);  }
      100% { transform: scale(1);  }
    }
  </style>
</head>
<body class="flex">
  <div class="creator flex">
    <h1 class="text-center">Shouteet</h1>
    <div class="btn-container">
      <div class="circle-activity"></div>
      <div class="btn btn-success btn-lg mic btn-icon icon-budicon-773">
      </div>
    </div>
    <p class="status text-center">Tap & say something</p>
  </div>
  <div class="result-container flex" style="display: none">
    <h2 class="text text-center"></h2>
    <div class="result flex">
      <div class="btn btn-default btn-lg retry">Try again</div>
      <div class="btn btn-success btn-lg shouteet">Shouteet</div>
    </div>
  </div>
  <div class="flex done" style="display: none">
    <h3>Thanks! Watch all the shouts at:</h3>
    <h1><a href="https://www.twitter.com/shouteet">www.twitter.com/shouteet</a></h1>
  </div>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script>
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

  var grammar = '#JSGF V1.0;'

  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;

  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  var stat = $('.status');
  var creator = $('.creator');
  var result = $('.result-container');
  var text = $('.text');
  var mic = $('.mic');
  var circle = $('.circle-activity');
  var retry = $('.retry');
  var shouteet = $('.shouteet');
  var done = $('.done');

  function toggleContainers() {
    creator.toggle();
    result.toggle();
  }

  function tryAgain() {
    toggleContainers();
    text.empty();
  }

  function success(data) {
    result.toggle();
    done.toggle();
    setTimeout(function() {
      done.toggle();
      creator.toggle();
    }, 3000);

  }

  mic.on('click', function() {
    recognition.start();
    circle.addClass('circle-animated');

  });

  shouteet.on('click', function() {
    $.ajax({
      method: "GET",
      url: "https://wt-1dca3d73c66d93662f53f003ccbf111e-0.run.webtask.io/shouteet?status=" + text.text(),
      success: success,
    });
  });

  retry.on('click', function() {
    tryAgain();
  })

  recognition.onresult = function(event) {
    var l = event.results.length - 1;
    var r = event.results[l][0].transcript;
    circle.removeClass('circle-animated');
    text.text(r[0].toUpperCase() + r.slice(1));
    toggleContainers();
  }

  recognition.onspeechend = function() {
    recognition.stop();
  }

  recognition.onerror = function(event) {
    circle.removeClass('circle-animated');
    stat.text('Error occurred in recognition: ' + event.error);
  }
</script>
</body>
</html>
*/}).toString().match(/[^]*\/\*([^]*)\*\/\s*\}$/)[1];

module.exports =
  function (context, req, res) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(require('ejs').render(view, {
          name: context.data.name || 'Anonymous'
      }));
  }
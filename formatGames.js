// const regex = /<\s*a\s*href="\/games\/([^\/]*)\/"\s*>\s*<img\s*src="[^"]*"\s*alt="[^"]*"\/>\s*&nbsp;([^<]*)<\/a>/gm;

const games = require("./games.json");
const fs = require("fs");

const newGames = {};

var decodeHtmlEntity = function(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
};

function storeData(data, path) {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

for (let i = 0; i < games.length; i++) {
  let game = games[i];
  console.log(game[1].content);
  let gameName = game[1].content.replace("\n", "")
  gameName = gameName.replace(/\s*/, "");
  console.log(gameName);
  gameName = decodeHtmlEntity(gameName);
  newGames[gameName] = game[0].content;
}

storeData(newGames, "gamedata.json");

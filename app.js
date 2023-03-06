const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
const dbpath = path.join(__dirname, "cricketTeam.db");
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();
app.get("/players/", async (request, response) => {
  const sqlQuery = `SELECT * FROM cricket_team ORDER BY player_id;`;
  const playerArray = db.all(sqlQuery);
  response.send(playerArray);
});
///
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const sqlQuery = `SELECT * FROM cricket_team WHERE player_id=${playerId};`;
  const playerDetails = db.get(sqlQuery);
  response.send(playerDetails);
});

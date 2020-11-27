module.exports = async client => {

  const SQLite = require("better-sqlite3");
  const sql = new SQLite('./scores.sqlite');


  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`Elon's Giant Rocket ${client.settings.get("default").prefix}help`, {type: "WATCHING"});

  //tabledb
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) {
      // If the table isn't there, create it and setup the database correctly.
      sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, money INTEGER);").run();
      // Ensure that the "id" row is always unique and indexed.
      sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
      sql.pragma("synchronous = 1");
      sql.pragma("journal_mode = wal");
    }

    // And then we have two prepared statements to get and set the score data.
    client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level, money) VALUES (@id, @user, @guild, @points, @level, @money);");

    //tableagency
    const atable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'agency';").get();
      if (!atable['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare("CREATE TABLE agency (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, aname TEXT, v INTEGER, iss INTEGER, rockets INTEGER);").run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_agency_id ON agency (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
      }

      // And then we have two prepared statements to get and set the score data.
      client.getAgency = sql.prepare("SELECT * FROM agency WHERE user = ? AND guild = ?");
      client.setAgency = sql.prepare("INSERT OR REPLACE INTO agency (id, user, guild, points, level, aname, v, iss, rockets) VALUES (@id, @user, @guild, @points, @level, @aname, @v, @iss, @rockets);");



};

////////// SECTION B //////////

// userLineupController.js, userLineupModel.js, userLineupRoutes.js is for managing userLineups
// (where users choose and setup 3 characters to battle)

const pool = require("../services/db");

//////////////////////////////////////////////////////////////
// findUser
//////////////////////////////////////////////////////////////
module.exports.findUser = (data, callback) => {
  const SQLSTATMENT = `
      SELECT user_id FROM User
      WHERE user_id = ?; 
      `;

  const VALUES = [data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// findHero
//////////////////////////////////////////////////////////////
module.exports.findHero = (data, callback) => {
  const SQLSTATMENT = `
      SELECT hero_id FROM UserHeroes
      WHERE owner_id = ? AND hero_id = ?; 
      `;

  const VALUES = [data.owner_id, data.hero_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// checkHeroRepeat
//////////////////////////////////////////////////////////////
module.exports.checkHeroRepeat = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT hero_id FROM UserLineupHeroes
      WHERE owner_id = ? AND hero_id = ?;
    `;

  const VALUES = [data.owner_id, data.hero_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// checkVacancy
//////////////////////////////////////////////////////////////
module.exports.checkVacancy = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT COUNT(*) AS hero_count 
      FROM UserLineupHeroes
      WHERE owner_id = ?;
    `;

  const VALUES = [data.owner_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// updateLineup
//////////////////////////////////////////////////////////////
module.exports.updateLineup = (data, callback) => {
  const SQLSTATEMENT = `
      UPDATE UserLineup 
      SET lineup_battle_power = lineup_battle_power + (
      SELECT total_power FROM UserHeroes
      WHERE owner_id = ? AND hero_id = ?)
      WHERE owner_id = ?;

      INSERT INTO UserLineupHeroes (owner_id, hero_id, character_nickname, total_power)
      SELECT owner_id, hero_id, character_nickname, total_power 
      FROM UserHeroes
      WHERE owner_id = ? AND hero_id = ?;

      SELECT * FROM UserLineupHeroes 
      WHERE owner_id = ? AND hero_id = ?;
    `;

  const VALUES = [
    data.owner_id,
    data.hero_id,
    data.owner_id,
    data.owner_id,
    data.hero_id,
    data.owner_id,
    data.hero_id,
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// checkHeroLineup
//////////////////////////////////////////////////////////////
module.exports.checkHeroLineup = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT hero_id FROM UserLineupHeroes
    WHERE owner_id = ? AND hero_id = ?;
      `;

  const VALUES = [data.owner_id, data.hero_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// removeHero
//////////////////////////////////////////////////////////////
module.exports.removeHero = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE UserLineup
    SET lineup_battle_power = lineup_battle_power - (
    SELECT total_power 
    FROM UserLineupHeroes 
    WHERE owner_id = ? AND hero_id = ?)
    WHERE owner_id = ?;

    DELETE FROM UserLineupHeroes
    WHERE owner_id = ? AND hero_id = ?;
    `;

  const VALUES = [
    data.owner_id,
    data.hero_id,
    data.owner_id,
    data.owner_id,
    data.hero_id,
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// getUserLineup
//////////////////////////////////////////////////////////////
module.exports.getUserLineup = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM UserLineup 
  WHERE owner_id = ?;

  SELECT * FROM UserLineupHeroes
  WHERE owner_id = ?;
  `;

  const VALUES = [data.owner_id, data.owner_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

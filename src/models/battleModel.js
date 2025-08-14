////////// SECTION B //////////

// battleController.js, battleModel.js, battleRoutes.js is for managing the battling of levels and pvp

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
// selectMapAndLevel
//////////////////////////////////////////////////////////////
module.exports.selectMapAndLevel = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM Map
    WHERE map_id = ?;

    SELECT * FROM Levels
    WHERE map_id = ? AND level = ?;
    `;

  const VALUES = [data.map_id, data.map_id, data.level];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// checkPowers
//////////////////////////////////////////////////////////////
module.exports.checkPowers = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM UserLineup
    WHERE owner_id = ?;

    SELECT * FROM Levels
    WHERE map_id = ? AND level = ?;
    `;

  const VALUES = [data.owner_id, data.map_id, data.level];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// levelComplete
//////////////////////////////////////////////////////////////
module.exports.levelComplete = (data, callback) => {
  const SQLSTATMENT = `
    UPDATE User 
    SET skillpoints = skillpoints + (
    SELECT skillpoints_reward FROM Levels
    WHERE map_id = ? AND level = ?)
    WHERE user_id = ?;
    `;

  const VALUES = [
    data.map_id,
    data.level,
    data.map_id,
    data.level,
    data.user_id,
  ];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// checkBothPowers
//////////////////////////////////////////////////////////////
module.exports.checkBothPowers = (data, callback) => {
  const SQLSTATMENT = `
      SELECT * FROM UserLineup
      WHERE owner_id = ?;
  
      SELECT * FROM UserLineup
      WHERE owner_id = ?;
      `;

  const VALUES = [data.owner_id, data.opponent_owner_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// battleComplete
//////////////////////////////////////////////////////////////
module.exports.battleComplete = (data, callback) => {
  const SQLSTATMENT = `
      UPDATE User 
      SET skillpoints = skillpoints + 200
      WHERE user_id = ?;

      SELECT * FROM User
      WHERE user_id = ?;
      `;

  const VALUES = [data.user_id, data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

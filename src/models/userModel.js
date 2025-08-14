////////// SECTION A //////////
// Parts 1 to 3

const pool = require("../services/db");

//////////////////////////////////////////////////////////////
// selectUsername
//////////////////////////////////////////////////////////////
module.exports.selectUsername = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;

  const VALUES = [data.username];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// insertSingle
//////////////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
  const SQLSTATMENT = `
    INSERT INTO User (username, skillpoints)
    VALUES (?, 0);

    -- save the inserted user_id as @owner_id for later use
    SET @owner_id = LAST_INSERT_ID();

    SELECT * FROM User
    WHERE user_id = @owner_id;

    -- ---------------------------------
    -- lineup for later use (section B)
    -- ---------------------------------
    INSERT INTO UserLineup (owner_id, lineup_battle_power)
    VALUES (@owner_id, 0);

    -- ---------------------------------------------------------------------------
    -- beginner heroes added into new user's UserHeroes for later use (section B)
    -- ---------------------------------------------------------------------------
    INSERT INTO UserHeroes (owner_id, character_id, class, character_name, 
    character_nickname, weapon_type, weapon_equipped, total_power)  
    VALUES
    (@owner_id, 13, 5, 'Starter : Swordsman Goblin', 'None', 'Sword', 0, 100),
    (@owner_id, 14, 5, 'Starter : Viking Goblin', 'None', 'Axe', 0, 100),
    (@owner_id, 15, 5, 'Starter : Lancer Goblin', 'None', 'Spear', 0, 100);
    `;
  const VALUES = [data.username];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// selectAll
//////////////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
  const SQLSTATMENT = `
        SELECT * FROM User;
        `;
  pool.query(SQLSTATMENT, callback);
};

//////////////////////////////////////////////////////////////
// updateById
//////////////////////////////////////////////////////////////
module.exports.updateById = (data, callback) => {
  const SQLSTATMENT = `
    UPDATE User
    SET username = ?, skillpoints = ?
    WHERE user_id = ?;
    `;
  const VALUES = [data.username, data.skillpoints, data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

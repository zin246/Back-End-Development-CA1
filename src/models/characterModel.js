////////// SECTION B //////////

// characterController.js, characterModel.js, characterRoutes.js is for drawing characters
// gacha system

const pool = require("../services/db");

//////////////////////////////////////////////////////////////
// getAllCharactersInPool
//////////////////////////////////////////////////////////////
module.exports.getAllCharactersInPool = (callback) => {
  const SQLSTATMENT = `
  SELECT * FROM CharacterPool;
  `;

  pool.query(SQLSTATMENT, callback);
};

//////////////////////////////////////////////////////////////
// getAllCharactersInPoolByClass
//////////////////////////////////////////////////////////////
module.exports.getAllCharactersInPoolByClass = (data, callback) => {
  const SQLSTATMENT = `
  SELECT * FROM CharacterPool
  WHERE class = ?; 
  `;

  const VALUES = [data.class];

  pool.query(SQLSTATMENT, VALUES, callback);
};

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
// deductSkillpoints
//////////////////////////////////////////////////////////////
module.exports.deductSkillpoints = (data, callback) => {
  const SQLSTATMENT = `
  UPDATE User
  SET skillpoints = skillpoints - 2000
  WHERE user_id = ? AND skillpoints >= 2000;
  `;

  const VALUES = [data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// getRandomCharacterAndStoreInHeroes
//////////////////////////////////////////////////////////////
module.exports.getRandomCharacterAndStoreInHeroes = (data, callback) => {
  const SQLSTATMENT = `
  INSERT INTO UserHeroes (owner_id, character_id, class, character_name, character_nickname, weapon_type, weapon_equipped, total_power)
  SELECT 
    ? AS owner_id,  
    character_id, 
    class, 
    character_name, 
    'None' AS character_nickname,  
    weapon_type, 
    0 AS weapon_equipped,   
    power AS total_power
  FROM CharacterPool
  ORDER BY RAND()
  LIMIT 1;

  SELECT * FROM UserHeroes
  WHERE hero_id = LAST_INSERT_ID();
  `;

  const VALUES = [data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

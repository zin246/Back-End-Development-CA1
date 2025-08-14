////////// SECTION B //////////

// userHeroesController.js, userHeroesModel.js, userHeroesRoutes.js is for managing userHeroes (where each user's own characters are stored)

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
// getAllHeroesByUserId
//////////////////////////////////////////////////////////////
module.exports.getAllHeroesByUserId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM UserHeroes
    WHERE owner_id = ?; 
    `;

  const VALUES = [data.owner_id];

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
// insertHeroNickname
//////////////////////////////////////////////////////////////
module.exports.insertHeroNickname = (data, callback) => {
  const SQLSTATMENT = `
  UPDATE UserHeroes
  SET character_nickname = ?
  WHERE owner_id = ? AND hero_id = ?;

  SELECT * FROM UserHeroes 
  WHERE owner_id = ? AND hero_id = ?;
  `;

  const VALUES = [
    data.character_nickname,
    data.owner_id,
    data.hero_id,
    data.owner_id,
    data.hero_id,
  ];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// findWeapon
//////////////////////////////////////////////////////////////
module.exports.findWeapon = (data, callback) => {
  const SQLSTATMENT = `
    SELECT inventory_id FROM UserInventory
    WHERE owner_id = ? AND inventory_id = ?; 
    `;

  const VALUES = [data.owner_id, data.inventory_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// checkWeaponTypes
//////////////////////////////////////////////////////////////
module.exports.checkWeaponTypes = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT *
    FROM UserInventory
    INNER JOIN UserHeroes
    ON 
    inventory_id = ? AND UserHeroes.owner_id = ? AND hero_id = ? AND UserHeroes.owner_id = UserInventory.owner_id AND UserHeroes.weapon_type = UserInventory.weapon_type;
  `;

  const VALUES = [data.inventory_id, data.owner_id, data.hero_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// checkVacancy
//////////////////////////////////////////////////////////////
module.exports.checkVacancy = (data, callback) => {
  const SQLSTATMENT = `
    SELECT weapon_equipped FROM UserHeroes
    WHERE owner_id = ? AND hero_id = ?; 
    `;

  const VALUES = [data.owner_id, data.hero_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// equipWeaponOnHero
//////////////////////////////////////////////////////////////
module.exports.equipWeaponOnHero = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE UserHeroes
    SET weapon_equipped = (
    SELECT inventory_id FROM UserInventory 
    WHERE owner_id = ? AND inventory_id = ?
    ),
    total_power = total_power + (
    SELECT power FROM UserInventory 
    WHERE owner_id = ? AND inventory_id = ? )
    WHERE owner_id = ? AND hero_id = ?;

    SELECT * FROM UserHeroes
    WHERE owner_id = ? AND hero_id = ?;
  `;

  const VALUES = [
    data.owner_id,
    data.inventory_id,
    data.owner_id,
    data.inventory_id,
    data.owner_id,
    data.hero_id,
    data.owner_id,
    data.hero_id,
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// checkWeaponEquipped
//////////////////////////////////////////////////////////////
module.exports.checkWeaponEquipped = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT weapon_equipped
    FROM UserHeroes
    WHERE owner_id = ? AND hero_id = ?;
  `;

  const VALUES = [data.owner_id, data.hero_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// unequipWeaponOnHero
//////////////////////////////////////////////////////////////
module.exports.unequipWeaponOnHero = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE UserHeroes
    SET total_power = total_power - (
    SELECT power FROM UserInventory 
    WHERE owner_id = ? AND inventory_id = weapon_equipped ),
    weapon_equipped = 0
    WHERE owner_id = ? AND hero_id = ?;

    SELECT * FROM UserHeroes
    WHERE owner_id = ? AND hero_id = ?;
  `;

  const VALUES = [
    data.owner_id,
    data.owner_id,
    data.hero_id,
    data.owner_id,
    data.hero_id,
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// deleteHeroById
//////////////////////////////////////////////////////////////
module.exports.deleteHeroById = (data, callback) => {
  const SQLSTATMENT = `
    DELETE FROM UserHeroes
    WHERE owner_id = ? AND hero_id = ?;

    UPDATE User
    SET skillpoints = skillpoints + 100
    WHERE user_id = ?;

    SELECT * FROM User
    WHERE user_id = ?;
    `;

  const VALUES = [data.owner_id, data.hero_id, data.owner_id, data.owner_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

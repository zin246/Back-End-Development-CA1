////////// SECTION B //////////

// weaponShopController.js, weaponShopModel.js, weaponShopRoutes.js is for managing the weapon shop and for buying weapons

const pool = require("../services/db");

//////////////////////////////////////////////////////////////
// getAllWeaponsInShop
//////////////////////////////////////////////////////////////
module.exports.getAllWeaponsInShop = (callback) => {
  const SQLSTATMENT = `
  SELECT * FROM WeaponShop;
  `;

  pool.query(SQLSTATMENT, callback);
};

//////////////////////////////////////////////////////////////
// getAllWeaponsByClass
//////////////////////////////////////////////////////////////
module.exports.getAllWeaponsByClass = (data, callback) => {
  const SQLSTATMENT = `
  SELECT * FROM WeaponShop
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
// findWeapon
//////////////////////////////////////////////////////////////
module.exports.findWeapon = (data, callback) => {
  const SQLSTATMENT = `
      SELECT weapon_id FROM WeaponShop
      WHERE weapon_id = ?; 
      `;

  const VALUES = [data.weapon_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// deductSkillpoints
//////////////////////////////////////////////////////////////
module.exports.deductSkillpoints = (data, callback) => {
  const SQLSTATMENT = `
  UPDATE User
  SET skillpoints = skillpoints - (
  SELECT cost 
  FROM WeaponShop 
  WHERE weapon_id = ?
  LIMIT 1
  )
  WHERE user_id = ? 
  AND skillpoints >= (
  SELECT cost 
  FROM WeaponShop 
  WHERE weapon_id = ?
  LIMIT 1
  );
  `;

  const VALUES = [data.weapon_id, data.user_id, data.weapon_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// insertNewWeapon
//////////////////////////////////////////////////////////////
module.exports.insertNewWeapon = (data, callback) => {
  const SQLSTATMENT = `
  INSERT INTO UserInventory (owner_id, weapon_id, weapon_name, weapon_rank, class, power, weapon_type)
  SELECT ?, ?, weapon_name, 0, class, power, weapon_type FROM WeaponShop
  WHERE weapon_id = ?;

  SELECT * FROM UserInventory 
  WHERE inventory_id = LAST_INSERT_ID();
  `;

  const VALUES = [data.user_id, data.weapon_id, data.weapon_id, data.weapon_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

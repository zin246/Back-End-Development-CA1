////////// SECTION B //////////

// userInventoryController.js, userInventoryModel.js, userInventoryRoutes.js is for managing user's inventory (weapons only)

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
// getInventoryByUserId
//////////////////////////////////////////////////////////////
module.exports.getInventoryByUserId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM UserInventory
    WHERE owner_id = ?; 
    `;

  const VALUES = [data.owner_id];

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
// deleteWeaponById
//////////////////////////////////////////////////////////////
module.exports.deleteWeaponById = (data, callback) => {
  const SQLSTATMENT = `
    DELETE FROM UserInventory
    WHERE owner_id = ? AND inventory_id = ?;

    UPDATE User
    SET skillpoints = skillpoints + 100
    WHERE user_id = ?;
    `;

  const VALUES = [data.owner_id, data.inventory_id, data.owner_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// checkRanks
//////////////////////////////////////////////////////////////
module.exports.checkRanks = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT weapon_name, weapon_rank 
    FROM UserInventory
    WHERE inventory_id IN (?, ?);
  `;

  const VALUES = [data.upgrade_id, data.upgrade_with_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// deductSkillpoints
//////////////////////////////////////////////////////////////
module.exports.deductSkillpoints = (data, callback) => {
  const SQLSTATMENT = `
  UPDATE User
  SET skillpoints = skillpoints - 120
  WHERE user_id = ? 
  AND skillpoints >= 120;
  `;

  const VALUES = [data.owner_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// upgradeTheWeapon
//////////////////////////////////////////////////////////////
module.exports.upgradeTheWeapon = (data, callback) => {
  const SQLSTATMENT = `
  UPDATE UserInventory 
  SET weapon_rank = weapon_rank + 1,
  power = power + 50
  WHERE owner_id = ? AND inventory_id = ?;

  DELETE FROM UserInventory 
  WHERE owner_id = ? AND inventory_id = ?;

  SELECT * FROM UserInventory 
  WHERE owner_id = ? AND inventory_id = ?;
  `;

  const VALUES = [
    data.owner_id,
    data.upgrade,
    data.owner_id,
    data.upgrade_with,
    data.owner_id,
    data.upgrade,
  ];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

////////// SECTION B //////////

// weaponShopController.js, weaponShopModel.js, weaponShopRoutes.js is for managing the weapon shop and for buying weapons

const model = require("../models/weaponShopModel.js");

//////////////////////////////////////////////////////////////
// 1 - get all weapons the shop is selling
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
module.exports.readAllWeapons = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllWeaponsInShop:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };

  // model.getAllWeaponsInShop to select all weapons
  model.getAllWeaponsInShop(callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 2 - get all weapons by class
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
module.exports.readAllWeaponsByClass = (req, res, next) => {
  const data = {
    class: req.params.class,
  };

  const callback = (error, results, fields) => {
    if (results.length == 0) {
      res.status(404).json({
        message: "Class not found",
      });
    } else res.status(200).json(results);
  };

  // model.getAllWeaponsByClass to select all weapons in shop by their class
  model.getAllWeaponsByClass(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 3 - purchase weapon and upload into inventory and deduct skillpoints
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if user exists
module.exports.checkUserExistence = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUserExistence:", error);
      res.status(500).json(error);
    }
    if (results.length == 0) {
      res.status(404).json({
        message: "User not found.",
      });
      return;
    }
    next();
  };

  // model.findUser to select user based on user_id
  model.findUser(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if weapon exists
module.exports.checkWeaponExistence = (req, res, next) => {
  if (req.body.weapon_id == undefined) {
    res.status(400).json({
      message: "Error: weapon_id is undefined",
    });
    return;
  }

  const data = {
    weapon_id: req.body.weapon_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkWeaponExistence:", error);
      res.status(500).json(error);
    }
    if (results.length == 0) {
      res.status(404).json({
        message: "Weapon not found.",
      });
      return;
    }
    next();
  };

  // model.findWeapon to select weapon based on weapon_id in body
  model.findWeapon(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// checking to see if user has enough skillpoints to buy specified weapon
module.exports.deductUserSkillpoints = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
    weapon_id: req.body.weapon_id,
  };

  const callback = (error, results, fields) => {
    if (results.affectedRows == 0) {
      res.status(409).json({
        message:
          "This user does not have sufficient skillpoints to buy the weapon.",
      });
      return;
    }
    next();
  };

  // model.deductSkillpoints to check if sufficient skillpoints in specified user by user_id and deduct according to weapon cost
  model.deductSkillpoints(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// after dealing with skillpoints, insert new weapon into user inventory
module.exports.updateInventory = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
    weapon_id: req.body.weapon_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateInventory:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        message: "New weapon obtained.",
        weapon: results[1][0],
      });
    }
  };

  // model.insertNewWeapon to add new weapon into the user inventory
  model.insertNewWeapon(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

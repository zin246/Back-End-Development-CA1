////////// SECTION B //////////

// userInventoryController.js, userInventoryModel.js, userInventoryRoutes.js is for managing user's inventory (weapons only)

const model = require("../models/userInventoryModel.js");

//////////////////////////////////////////////////////////////
// 1 - get all weapons in inventory by user_id
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// checking if user exists using user_id
module.exports.checkUserExistence = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
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
// after verifying user exists, read the user's inventory
module.exports.readInventoryByUserId = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (results.length == 0) {
      res.status(404).json({
        message: "This user has no weapons in the inventory.",
      });
    } else res.status(200).json(results);
  };

  // model.getInventoryByUserId to view inventory of specific user
  model.getInventoryByUserId(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 2 - delete weapon from inventory by inventory_id
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// checking if weapons exists using owner_id and inventory_id
module.exports.checkWeaponExistence = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    inventory_id: req.params.inventory_id,
  };

  const callback = (error, results, fields) => {
    if (results.length == 0) {
      res.status(404).json({
        message: "Weapon not found in user.",
      });
      return;
    }
    next();
  };

  // model.findWeapon to select weapon based on owner_id and inventory_id
  model.findWeapon(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// after checking that weapon exists, delete weapon and award skillpoints to the owner
module.exports.deleteWeaponByInventoryId = (req, res, next) => {
  const data = {
    inventory_id: req.params.inventory_id,
    owner_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteWeaponByInventoryId:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "Weapon not found : invalid inventory_id / user_id",
        });
      } else res.status(204).send(); // 204 no content
    }
  };

  // model.deleteWeaponById to delete a specific weapon from a users inventory
  model.deleteWeaponById(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 3 - upgrade weapons by merging them and increasing weapon rank
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if weapon to be used to upgrade (sacrificed weapon) exists in the user's inventory
module.exports.checkSacrificedWeaponExistence = (req, res, next) => {
  if (req.body.inventory_id == undefined) {
    res.status(400).json({
      message: "Error: inventory_id is undefined",
    });
    return;
  }

  const data = {
    owner_id: req.params.user_id,
    inventory_id: req.body.inventory_id,
  };

  const callback = (error, results, fields) => {
    if (results.length == 0) {
      res.status(404).json({
        message:
          "Weapon to be consumed for upgrading is not found in user inventory.",
      });
      return;
    }
    next();
  };

  // model.findWeapon to find the sacrificed weapon and check if it exists
  model.findWeapon(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// checking if rank of both weapons match
module.exports.checkWeaponRanks = (req, res, next) => {
  const data = {
    upgrade_id: req.params.inventory_id,
    upgrade_with_id: req.body.inventory_id,
  };

  const callback = (error, results, fields) => {
    if (req.params.inventory_id == req.body.inventory_id) {
      res.status(409).json({
        message:
          "Both weapons are the same, you cannot upgrade with same weapons.",
      });
    } else if (results[0].weapon_rank != results[1].weapon_rank) {
      res.status(409).json({
        message: "Weapons do not have the same rank and cannot be upgraded.",
      });
      return;
    } else if (results[0].weapon_name != results[1].weapon_name) {
      res.status(409).json({
        message:
          "Weapons are different, upgrade can only occur on the same weapons.",
      });
      return;
    }
    next();
  };

  // model.checkRanks to select both ranks of weapons
  model.checkRanks(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check for sufficient skillpoints and deduct accordingly
module.exports.deductUserSkillpoints = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (results.affectedRows == 0) {
      res.status(409).json({
        message:
          "This user does not have sufficient skillpoints to upgrade the weapon.",
      });
      return;
    }
    next();
  };

  // model.deductSkillpoints to check if sufficient skillpoints in specified user by user_id and deduct 120 skillpoints
  model.deductSkillpoints(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// upgrade weapon after checking user, weapon exists, and skillpoints sufficient, and successful deduction
module.exports.upgradeWeapon = (req, res, next) => {
  const data = {
    upgrade: req.params.inventory_id,
    upgrade_with: req.body.inventory_id,
    owner_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error upgradeWeapon:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "Error: Weapons cannot be upgraded.",
        });
      } else res.status(200).send(results[2][0]);
    }
  };

  // upgrade the weapon specified in params and delete the other one specified in body
  model.upgradeTheWeapon(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

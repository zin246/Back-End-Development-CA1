////////// SECTION B //////////

// userHeroesController.js, userHeroesModel.js, userHeroesRoutes.js is for managing userHeroes (where each user's own characters are stored)

const model = require("../models/userHeroesModel.js");

//////////////////////////////////////////////////////////////
// 1 - get all heroes in UserHeroes by user_id
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// checking if user exists
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
// get all the heroes owned by a specific user
module.exports.readAllHeroesByUserId = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (results.length == 0) {
      res.status(404).json({
        message: "This user has no heroes.",
      });
    } else res.status(200).json(results);
  };

  // model.getAllHeroesByUserId to select all heroes by user_id
  model.getAllHeroesByUserId(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 2 - update nickname of heroes by owner_id and hero_id
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if hero exists
module.exports.checkHeroExistence = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
  };

  const callback = (error, results, fields) => {
    if (results.length == 0) {
      res.status(404).json({
        message: "Hero not found in UserHeroes.",
      });
      return;
    }
    next();
  };

  model.findHero(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// update nickname after checking user and user's hero exists
module.exports.updateNickname = (req, res, next) => {
  if (req.body.character_nickname == undefined) {
    res.status(400).json({
      message: "Error: character_nickname is undefined",
    });
    return;
  }

  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
    character_nickname: req.body.character_nickname,
  };

  const callback = (error, results, fields) => {
    if (results.affectedRows == 0) {
      res.status(400).json({
        message: "Failed to update hero's character username.",
      });
    } else res.status(200).json(results[1][0]);
  };

  // model.insertHeroNickname to insert nickname into hero
  model.insertHeroNickname(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 3 - equip weapon on hero and increase its power
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if weapon exists
module.exports.checkWeaponExistence = (req, res, next) => {
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
        message: "Weapon not found.",
      });
      return;
    }
    next();
  };

  model.findWeapon(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if hero's weapon_type == the weapon's weapon_type
module.exports.checkWeaponAndHeroWeaponTypes = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
    inventory_id: req.body.inventory_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkWeaponAndHeroWeaponTypes");
      res.status(500).json(error);
      return;
    } else if (results.length == 0) {
      res.status(400).json({
        message:
          "This hero does not have the same weapon_type as the specified weapon, cannot equip weapon on hero.",
      });
      return;
    }
    next();
  };

  model.checkWeaponTypes(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if weapon is equipped on another hero
module.exports.checkWeaponVacancy = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
  };

  const callback = (error, results, fields) => {
    if (results[0].weapon_equipped != 0) {
      res.status(404).json({
        message:
          "This weapon is already equipped on another hero, cannot equip weapon",
      });
      return;
    }
    next();
  };

  // model.checkVacancy to check if weapon is vacant for equipping
  model.checkVacancy(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// equip weapon on character after everything is checked
module.exports.equipWeapon = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
    inventory_id: req.body.inventory_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error equipWeapon");
      res.status(500).json(error);
    } else {
      res.status(201).json(results[1][0]);
    }
  };

  // model.equipWeaponOnHero to edit data in UserHeroes and UserInventory to equip weapon
  model.equipWeaponOnHero(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 4 - unequip weapon on hero and decrease its power
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if weapon is equipped on hero
module.exports.checkEquipOn = (req, res, next) => {
  if (req.body.inventory_id == undefined) {
    if (req.body.username == undefined) {
      res.status(400).send("Error: inventory_id is undefined");
      return;
    }
  }

  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
    inventory_id: req.body.inventory_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkEquipOn");
      res.status(500).json(error);
    }
    if (results[0].weapon_equipped != req.body.inventory_id) {
      res.status(404).json({
        message: "This hero is not equipped with this weapon.",
      });
      return;
    }
    next();
  };

  // model.checkWeaponEquipped to check which weapon is equipped on hero
  model.checkWeaponEquipped(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// unequip weapon on character after everything is checked
module.exports.unequipWeapon = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error unequipWeapon");
      res.status(500).json(error);
    } else {
      res.status(201).json(results[1][0]);
    }
  };

  // model.unequipWeaponOnHero to edit data in UserHeroes to unequip weapon and minus back skillpoints
  model.unequipWeaponOnHero(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 5 - delete user and refund 100 skillpoints
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// after checking that user's hero and user exists
module.exports.deleteHeroByHeroId = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteHeroByHeroId:", error);
      res.status(500).json(error);
    } else res.status(200).send(results[2][0]);
  };

  model.deleteHeroById(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

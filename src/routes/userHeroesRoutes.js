////////// SECTION B //////////

// userHeroesController.js, userHeroesModel.js, userHeroesRoutes.js is for managing userHeroes (where each user's own characters are stored)

const express = require("express");
const router = express.Router();
const controller = require("../controllers/userHeroesController");

//////////////////////////////////////////////////////////////
// 1 - GET all heroes owned by specific user using user_id in params
//////////////////////////////////////////////////////////////
router.get(
  "/:user_id",
  controller.checkUserExistence,
  controller.readAllHeroesByUserId
);

//////////////////////////////////////////////////////////////
// 2 - PUT nickname into specific hero by owner_id and hero_id
//////////////////////////////////////////////////////////////
router.put(
  "/:user_id/:hero_id",
  controller.checkUserExistence,
  controller.checkHeroExistence,
  controller.updateNickname
);

//////////////////////////////////////////////////////////////
// 3 - PUT to equip weapon on a hero (inventory_id specified in body to specify weapon to be equipped)
//////////////////////////////////////////////////////////////
router.put(
  "/equip/:user_id/:hero_id",
  controller.checkUserExistence,
  controller.checkHeroExistence,
  controller.checkWeaponExistence,
  controller.checkWeaponAndHeroWeaponTypes,
  controller.checkWeaponVacancy,
  controller.equipWeapon
);

//////////////////////////////////////////////////////////////
// 4 - PUT to unequip weapon on a hero (inventory_id specified in body to specify weapon to be unequipped)
//////////////////////////////////////////////////////////////
router.put(
  "/unequip/:user_id/:hero_id",
  controller.checkUserExistence,
  controller.checkHeroExistence,
  controller.checkEquipOn,
  controller.unequipWeapon
);

//////////////////////////////////////////////////////////////
// 5 - DELETE hero in userHeroes (by hero_id and user_id in params)
//////////////////////////////////////////////////////////////
router.delete(
  "/:user_id/:hero_id",
  controller.checkUserExistence,
  controller.checkHeroExistence,
  controller.deleteHeroByHeroId
);

///// exporting /////
module.exports = router;

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

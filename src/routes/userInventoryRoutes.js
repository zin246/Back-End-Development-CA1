////////// SECTION B //////////

// userInventoryController.js, userInventoryModel.js, userInventoryRoutes.js is for managing user's inventory (weapons only)

const express = require("express");
const router = express.Router();
const controller = require("../controllers/userInventoryController");

///////////////////////
// 1 - GET all weapons in inventory by user_id
///////////////////////
router.get(
  "/:user_id",
  controller.checkUserExistence,
  controller.readInventoryByUserId
);

//////////////////////////////////////////////////////////////
// 2 - DELETE weapon in user inventory by inventory_id and user_id, then refund 100 skillpoints
//////////////////////////////////////////////////////////////
router.delete(
  "/:user_id/:inventory_id",
  controller.checkUserExistence,
  controller.checkWeaponExistence,
  controller.deleteWeaponByInventoryId
);

//////////////////////////////////////////////////////////////
// 3 - PUT new weapon by upgrading weapon after checking that both weapon_name and weapon_rank is the same,
// then weapon rank +1, power +50, and deduct 200 skillpoints
//////////////////////////////////////////////////////////////
router.put(
  "/:user_id/:inventory_id",
  controller.checkUserExistence,
  controller.checkWeaponExistence,
  controller.checkSacrificedWeaponExistence,
  controller.checkWeaponRanks,
  controller.deductUserSkillpoints,
  controller.upgradeWeapon
);

///// exporting /////
module.exports = router;

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

////////// SECTION B //////////

// battleController.js, battleModel.js, battleRoutes.js is for managing the battling of pve and pvp

const express = require("express");
const router = express.Router();
const controller = require("../controllers/battleController");

//////////////////////////////////////////////////////////////
// 1 - PUT to check map and level id, check level_cleared, compare power, earn skillpoints, edit level_cleared
//////////////////////////////////////////////////////////////
router.put(
  "/fight_level/:user_id",
  controller.checkUserExistence,
  controller.checkMapAndLevel,
  controller.fightLevel,
  controller.clearedLevel
);

//////////////////////////////////////////////////////////////
// 2 - PUT to check both users exist, compare lineup and determine winner and update skillpoints, update history
//////////////////////////////////////////////////////////////
router.put(
  "/fight_player/:user_id",
  controller.checkUserExistence,
  controller.checkEnemyExistence,
  controller.fightPlayer,
  controller.wonBattle
);

///// exporting /////
module.exports = router;

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

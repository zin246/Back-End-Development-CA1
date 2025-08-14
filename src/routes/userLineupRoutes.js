////////// SECTION B //////////

// userLineupController.js, userLineupModel.js, userLineupRoutes.js is for managing userLineups
// (where users choose and setup 3 characters to battle)

const express = require("express");
const router = express.Router();
const controller = require("../controllers/userLineupController");

//////////////////////////////////////////////////////////////
// 1 - POST hero into lineup and update UserLineup's and UserLineupHeroes's powers
//////////////////////////////////////////////////////////////
router.post(
  "/:user_id/:hero_id",
  controller.checkUserExistence,
  controller.checkHeroExistence,
  controller.checkHeroAvailability,
  controller.checkLineupVacancy,
  controller.addHeroAndUpdatePower
);

//////////////////////////////////////////////////////////////
// 2 - DELETE hero from lineup and update power
//////////////////////////////////////////////////////////////
router.delete(
  "/:user_id/:hero_id",
  controller.checkUserExistence,
  controller.checkHeroExistence,
  controller.checkHeroInLineup,
  controller.removeHeroFromLineup
);

//////////////////////////////////////////////////////////////
// 3 - GET user's lineup by owner_id
//////////////////////////////////////////////////////////////
router.get(
  "/:user_id",
  controller.checkUserExistence,
  controller.readUserLineupByUserId
);

///// exporting /////
module.exports = router;

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

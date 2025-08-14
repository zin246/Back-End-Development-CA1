////////// main route to connect to all other routes //////////

const express = require("express");
const router = express.Router();

//////////////////////////////////////////////////////////////////////
////////////////////////// SECTION A ROUTES //////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////////
///// Section A : Parts 1 to 3, in userRoutes.js
//////////////////
const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

//////////////////
///// Section A : Parts 4 to 9, in fitnessChallengeRoutes.js
//////////////////
const fitnessChallengeRoutes = require("./fitnessChallengeRoutes");
router.use("/challenges", fitnessChallengeRoutes);

//////////////////////////////////////////////////////////////////////
////////////////////////// SECTION B ROUTES //////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////////
///// Section B : in characterRoutes.js
//////////////////
const characterRoutes = require("./characterRoutes");
router.use("/characters", characterRoutes);

//////////////////
///// Section B : in userInventoryRoutes.js
//////////////////
const userInventoryRoutes = require("./userInventoryRoutes");
router.use("/inventory", userInventoryRoutes);

//////////////////
///// Section B : in weaponShopRoutes.js
//////////////////
const weaponShopRoutes = require("./weaponShopRoutes");
router.use("/shop", weaponShopRoutes);

//////////////////
///// Section B : in userHeroesRoutes.js
//////////////////
const userHeroesRoutes = require("./userHeroesRoutes");
router.use("/heroes", userHeroesRoutes);

//////////////////
///// Section B : in levelRoutes.js
//////////////////
const levelRoutes = require("./levelRoutes");
router.use("/level", levelRoutes);

//////////////////
///// Section B : in battleRoutes.js
//////////////////
const battleRoutes = require("./battleRoutes");
router.use("/battle", battleRoutes);

//////////////////
///// Section B : in userLineupRoutes.js
//////////////////
const userLineupRoutes = require("./userLineupRoutes");
router.use("/lineup", userLineupRoutes);

///// exporting /////
module.exports = router;

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

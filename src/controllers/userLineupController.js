////////// SECTION B //////////

// userLineupController.js, userLineupModel.js, userLineupRoutes.js is for managing userLineups
// (where users choose and setup 3 characters to battle)

const model = require("../models/userLineupModel.js");

//////////////////////////////////////////////////////////////
// 1 - check user and hero exists, check if lineup is vacant, update lineup and power
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// checking if user exists using user_id
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
// checking if hero exists in UserHeroes
module.exports.checkHeroExistence = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkHeroExistence:", error);
      res.status(500).json(error);
    }
    if (results.length == 0) {
      res.status(404).json({
        message: "Hero not found.",
      });
      return;
    }
    next();
  };

  // model.findHero to check if Hero exists
  model.findHero(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// checking if hero is already in UserLineupHeroes
module.exports.checkHeroAvailability = (req, res, next) => {
  const data = {
    hero_id: req.params.hero_id,
    owner_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkHeroAvailability:", error);
      res.status(500).json(error);
    }
    if (results.length > 0) {
      res.status(409).json({
        message: "Hero is already in user lineup",
      });
      return;
    }
    next();
  };

  // model.checkHeroRepeat to check if hero_id of request is repeated in the UserLineupHeroes
  model.checkHeroRepeat(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if UserLineup is still vacant
module.exports.checkLineupVacancy = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkLineupVacancy:", error);
      res.status(500).json(error);
    }
    if (results[0].hero_count >= 3) {
      res.status(409).json({
        message:
          "Lineup has a maximum of 3 characters only, please remove a character to successfully update lineup.",
      });
      return;
    }
    next();
  };

  // model.checkVacancy to check if lineup has less than 3 characters
  model.checkVacancy(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// update user lineup and power
module.exports.addHeroAndUpdatePower = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error addHeroAndUpdatePower:", error);
      res.status(500).json(error);
    } else res.status(200).send(results[2]);
  };

  // model.updateLineup to add hero into lineup and add its power into the lineup total power
  model.updateLineup(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 2 - check user and hero exists, check if hero is in lineup, delete hero from lineup
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if hero in lineup
module.exports.checkHeroInLineup = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkHeroInLineup:", error);
      res.status(500).json(error);
    }
    if (results.length == 0) {
      res.status(400).json({
        message: "Hero is not in user lineup, cannot remove hero.",
      });
      return;
    }
    next();
  };

  // model.checkHeroLineup
  model.checkHeroLineup(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// remove hero from lineup
module.exports.removeHeroFromLineup = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    hero_id: req.params.hero_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error removeHeroFromLineup:", error);
      res.status(500).json(error);
    } else
      res.status(200).json({
        message: "Hero successfully deleted from lineup.",
      });
  };

  // model.removeHero to remove hero and minus of skillpoints
  model.removeHero(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 3 - check user exists, read user's lineup
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
module.exports.readUserLineupByUserId = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readUserLineupByUserId:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };

  // model.getUserLineup to select UserLineup and UserLineupHeroes by user_id
  model.getUserLineup(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

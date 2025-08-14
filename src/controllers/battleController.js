////////// SECTION B //////////

// battleController.js, battleModel.js, battleRoutes.js is for managing the battling of levels and pvp

const model = require("../models/battleModel.js");

//////////////////////////////////////////////////////////////
// 1 - check user exists, check map and level exists,
// check level_cleared, fight level and update skillpoints
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
// check if map and level exists
module.exports.checkMapAndLevel = (req, res, next) => {
  if (req.body.map_id == undefined || req.body.level == undefined) {
    res.status(400).json({
      message: "Error: map_id / level is undefined.",
    });
    return;
  }

  const data = {
    map_id: req.body.map_id,
    level: req.body.level,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkMapAndLevel:", error);
      res.status(500).json(error);
    }
    if (results[0].length == 0) {
      res.status(404).json({
        message: "Map is not found, invalid map_id",
      });
      console.log(results);
      return;
    } else if (results[1].length == 0) {
      res.status(404).json({
        message: "Level is not found, invalid level",
      });
      return;
    }
    next();
  };

  // model.selectMapAndLevel to verify map and level in body exists
  model.selectMapAndLevel(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// fight the level
module.exports.fightLevel = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    map_id: req.body.map_id,
    level: req.body.level,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error fightLevel:", error);
      res.status(500).json(error);
    }
    if (results[0][0].lineup_battle_power <= results[1][0].enemy_total_power) {
      res.status(400).json({
        message:
          "You have lost, please try again when you have increased power.",
        tips: "You can increase your power by equiping weapons, upgrading weapons or pulling stronger heroes.",
      });
      return;
    }
    next();
  };

  // model.checkPowers to get the powers of enemy and user
  model.checkPowers(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// award skillpoints after fighting level
module.exports.clearedLevel = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
    map_id: req.body.map_id,
    level: req.body.level,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error clearedLevel:", error);
      res.status(500).json(error);
    }
    res.status(200).json({
      message: "Congratulations, you have cleared the level.",
    });
  };

  // model.levelComplete to mark level as completed and award skillpoints to user
  model.levelComplete(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 2 - check user exists, check enemy exists, fight each other and obtain skillpoints, update into pvp history
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check enemy exists (enemy user_id is at )
module.exports.checkEnemyExistence = (req, res, next) => {
  if (req.body.user_id == undefined) {
    res.status(400).json({
      message: "Error: Opponet user_id is undefined.",
    });
    return;
  }

  const data = {
    user_id: req.body.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkEnemyExistence:", error);
      res.status(500).json(error);
    }
    if (results.length == 0) {
      res.status(404).json({
        message: "Opponent user not found.",
      });
      return;
    }
    next();
  };

  // model.findUser to find enemy based on enemy's user_id
  model.findUser(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// fight the opponent after checking the opponent exists
module.exports.fightPlayer = (req, res, next) => {
  const data = {
    owner_id: req.params.user_id,
    opponent_owner_id: req.body.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error fightPlayer:", error);
      res.status(500).json(error);
    }
    if (req.params.user_id == req.body.user_id) {
      res.status(404).json({
        message: "You cannot battle yourself, you can only battle other users.",
      });
      return;
    } else if (
      results[0][0].lineup_battle_power <= results[1][0].lineup_battle_power
    ) {
      res.status(400).json({
        message:
          "You have lost to this player, please try again when you have increased power.",
        tips: "You can increase your power by equiping weapons, upgrading weapons or pulling stronger heroes.",
      });
      return;
    }
    next();
  };

  // model.checkPowers to get the powers of enemy and user
  model.checkBothPowers(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// after winning pvp battle, award 200 skillpoints
// award skillpoints after fighting level
module.exports.wonBattle = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error wonBattle:", error);
      res.status(500).json(error);
    }
    res.status(200).json({
      message:
        "Congratulations, you have beat the opponent and won the battle.",
      winner: results[1],
    });
  };

  // model.battleComplete to award skillpoints to user
  model.battleComplete(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

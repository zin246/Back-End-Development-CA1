////////// SECTION B //////////

// characterController.js, characterModel.js, characterRoutes.js is for drawing characters
// gacha system

const model = require("../models/characterModel.js");

//////////////////////////////////////////////////////////////
// 1 - get all characters to be drawn inside the CharacterPool
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
module.exports.readAllCharactersInCharacterPool = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllCharactersInPool:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };

  // model.getAllCharactersInPool to select all characters from CharacterPool table
  model.getAllCharactersInPool(callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 2 - get all characters to be drawn inside the CharacterPool by class
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
module.exports.readAllCharactersInCharacterPoolByClass = (req, res, next) => {
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

  // model.getAllCharactersInPoolByClass to select all characters from CharacterPool table by their class
  model.getAllCharactersInPoolByClass(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 3 - draw characters from character pool and then save it to UserHeroes by user_id, deducting 2000 skillpoints for each pull
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check to see if user exists
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
// checking to see if user skillpoints >= 2000 (cost of pulling characters set to 2000) and deduct if sufficient
module.exports.deductUserSkillpoints = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (results.affectedRows == 0) {
      res.status(409).json({
        message: "This user does not have sufficient skillpoints.",
      });
      return;
    }
    next();
  };

  // model.deductSkillpoints to check if sufficient skillpoints in specified user by user_id and deduct accordingly
  model.deductSkillpoints(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// after dealing with skillpoints, draw characters and insert new character into UserHeroes
module.exports.getRandomCharacter = (req, res, next) => {
  const data = {
    user_id: req.params.user_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getRandomCharacter:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        message: "New character has been obtained and saved to UserHeroes.",
        character: results[1],
      });
    }
  };

  // model.getRandomCharacterAndStoreInHeroes to draw a random hero in gacha and update UserHeroes table
  model.getRandomCharacterAndStoreInHeroes(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

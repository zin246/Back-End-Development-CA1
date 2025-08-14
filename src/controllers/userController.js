////////// SECTION A //////////

const model = require("../models/userModel.js");

//////////////////////////////////////////////////////////////
///////////////////////////// 1 //////////////////////////////
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// checking if req.username is in user, returns 409
module.exports.selectUserByUsername = (req, res, next) => {
  const data = {
    username: req.body.username,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error selectUserByUsername");
      res.status(500).json(error);
    } else if (results.length >= 1) {
      res.status(409).send("Error: Username is already in use");
      return;
    }
    next();
  };

  // model.selectUsername to check if username already exists
  model.selectUsername(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// creating user after checking if username is available
module.exports.createNewUser = (req, res, next) => {
  /// if request body is missing username return 400
  if (req.body.username == undefined) {
    res.status(400).send("Error: username is undefined");
    return;
  }

  const data = {
    username: req.body.username,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewUser:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json(results[2][0]);
    }
  };
  model.insertSingle(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
///////////////////////////// 2 //////////////////////////////
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// get all users
module.exports.readAllUsers = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllUsers:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };
  // model.selectAll to select everything from user table
  model.selectAll(callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
///////////////////////////// 3 //////////////////////////////
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// updating user information after identifying user by user id
module.exports.updateUserById = (req, res, next) => {
  if (req.body.username == undefined || req.body.skillpoints == undefined) {
    res.status(400).json({
      message: "Error: username / skillpoints is undefined",
    });
    return;
  }

  const data = {
    user_id: req.params.user_id,
    username: req.body.username,
    skillpoints: req.body.skillpoints,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else res.status(200).send(data);
    }
  };
  // model to update
  model.updateById(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

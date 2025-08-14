////////// SECTION A //////////

const model = require("../models/fitnessChallengeModel.js");

//////////////////////////////////////////////////////////////
///////////////////////////// 4 //////////////////////////////
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// creating new challenge by taking in challenge, creator_id and skillpoints
module.exports.createNewChallenge = (req, res, next) => {
  if (
    req.body.challenge == undefined ||
    req.body.user_id == undefined ||
    req.body.skillpoints == undefined
  ) {
    // 400 bad request if missing challenge, user_id or skillpoints
    res
      .status(400)
      .send("Error: challenge / user_id / skillpoints is undefined");
    return;
  }

  const data = {
    challenge: req.body.challenge,
    creator_id: req.body.user_id,
    skillpoints: req.body.skillpoints,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewChallenge:", error);
      res.status(500).json(error);
    } else {
      // created successfully
      res.status(201).json(results[1][0]);
    }
  };
  model.insertSingle(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
///////////////////////////// 5 //////////////////////////////
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// get all fitness challenges
module.exports.readAllChallenges = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllChallenges:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };
  // model.selectAll to select everything from fitnesschallenge table
  model.selectAll(callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
///////////////////////////// 6 //////////////////////////////
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if challenge_id exists
module.exports.checkChallengeId = (req, res, next) => {
  data = {
    challenge_id: req.params.challenge_id,
  };

  const callback = (error, results, fields) => {
    if (results.length == 0) {
      res.status(404).json({
        message: "challenge_id not found.", // returns 404 not found if challenge_id not found
      });
      return;
    }
    next();
  };

  model.selectChallengeId(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if creator_id is the same as user_id
module.exports.checkCreatorId = (req, res, next) => {
  data = {
    challenge_id: req.params.challenge_id,
    creator_id: req.body.user_id,
  };

  const callback = (error, results, fields) => {
    if (results.length == 0) {
      res.status(403).json({
        message:
          "user_id is not the same as the creator_id for this challenge.", // returns 403
      });
      return;
    }
    next();
  };

  model.selectCreatorId(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// updating data after error handling
module.exports.updateChallengeByChallengeId = (req, res, next) => {
  // if one piece of info is missing, return 400
  if (
    req.body.user_id == undefined ||
    req.body.challenge == undefined ||
    req.body.skillpoints == undefined
  ) {
    return res.status(400).json({
      message: "Error: user_id / challenge / skillpoints are undefined",
    });
  }

  const data = {
    challenge_id: req.params.challenge_id,
    challenge: req.body.challenge,
    creator_id: req.body.user_id,
    skillpoints: req.body.skillpoints,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateChallengeByChallengeId", error);
      res.status(500).json(error);
    } else if (results[0].affectedRows == 0) {
      res.status(404).json({
        error: "failed to update challenge.",
      });
    } else res.status(200).send(results[1][0]);
  };

  // model.updateById to UPDATE FitnessChallenge
  model.updateById(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
///////////////////////////// 7 //////////////////////////////
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
module.exports.deleteChallengeByChallengeId = (req, res, next) => {
  const data = {
    challenge_id: req.params.challenge_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteChallengeByChallengeId:", error);
      res.status(500).json(error);
    } else res.status(204).send(); // 204 when successfully deleted
  };

  model.deleteByChallengeId(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
///////////////////////////// 8 //////////////////////////////
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// check if user_id exists
module.exports.checkUserId = (req, res, next) => {
  const data = {
    user_id: req.body.user_id,
  };

  const callback = (error, results, fields) => {
    if (results.length == 0) {
      res.status(404).json({
        message: "user_id not found.", // returns 404 not found if user_id not found
      });
      return;
    }
    next();
  };

  model.selectUserId(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// executed after both user_id and challenge_id are confirmed to exist to create completion record
module.exports.createCompletionRecordByChallengeId = (req, res, next) => {
  if (req.body.creation_date == undefined) {
    res.status(400).send("Error: creation_date is undefined"); // 400 bad request if creation_date is missing
    return;
  }

  const data = {
    challenge_id: req.params.challenge_id,
    user_id: req.body.user_id,
    completed: req.body.completed,
    creation_date: req.body.creation_date,
    notes: req.body.notes,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createCompletionRecordByChallengeId:", error);
      res.status(500).json(error);
    } else {
      // modifying results such that output will be the same as that seen in the CA1 Brief for completed and creation_date
      results[1][0].completed = Boolean(req.body.completed);
      results[1][0].creation_date = new Date(req.body.creation_date)
        .toISOString()
        .split("T")[0];
      // send results after modifying
      res.status(201).json(results[1][0]); // 201 for successful creation and show response
    }
    next();
  };

  // model.insertSingleCompletionRecord to insert new record into table
  model.insertSingleCompletionRecord(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// award skillpoints after completing a challenge
// +5 skillpoints if completed == 'false', else + the amount of skillpoints of the challenge if completed == 'true'
module.exports.awardSkillpoints = (req, res, next) => {
  const data = {
    completed: req.body.completed,
    user_id: req.body.user_id,
    challenge_id: req.params.challenge_id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error awardSkillpoints:", error);
      res.status(500).json(error);
    }
    next();
  };

  model.awardSkillpointsByChallengeId(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
///////////////////////////// 9 //////////////////////////////
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
module.exports.readParticipantsByChallengeId = (req, res, next) => {
  const data = {
    challenge_id: req.params.challenge_id,
  };

  const callback = (error, results, fields) => {
    if (results.length == 0) {
      res.status(404).json({
        message: "This challenge does not have any user attempts.",
      });
    } else {
      results = results.map((a) => {
        a.completed = Boolean(a.completed);
        a.creation_date = new Date(a.creation_date).toISOString().split("T")[0];
        return a;
      });
      res.status(200).json(results);
    }
  };

  // model.selectParticipantsByChallengeId to select all particioants in challenge record
  model.selectParticipantsByChallengeId(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

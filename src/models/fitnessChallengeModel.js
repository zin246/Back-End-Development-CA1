////////// SECTION A //////////
// Parts 4 to 9

const pool = require("../services/db");

//////////////////////////////////////////////////////////////
// insertSingle
//////////////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
  const SQLSTATMENT = `
          INSERT INTO FitnessChallenge (challenge, creator_id, skillpoints)
          VALUES (?, ?, ?);
          SELECT * FROM FitnessChallenge
          WHERE challenge_id = LAST_INSERT_ID();
          `;
  const VALUES = [data.challenge, data.creator_id, data.skillpoints];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// selectAll
//////////////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
  const SQLSTATMENT = `
    SELECT * FROM FitnessChallenge;
    `;
  pool.query(SQLSTATMENT, callback);
};

//////////////////////////////////////////////////////////////
// selectChallengeId
//////////////////////////////////////////////////////////////
module.exports.selectChallengeId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM FitnessChallenge
    WHERE challenge_id = ?;
  `;

  const VALUES = [data.challenge_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// selectCreatorId
//////////////////////////////////////////////////////////////
module.exports.selectCreatorId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM FitnessChallenge
    WHERE challenge_id = ? AND creator_id = ?;
    `;

  const VALUES = [data.challenge_id, data.creator_id];
  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// updateById
//////////////////////////////////////////////////////////////
module.exports.updateById = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE FitnessChallenge 
    SET challenge = ?, skillpoints = ?, creator_id = ?
    WHERE challenge_id = ?;

    SELECT * FROM FitnessChallenge 
    WHERE challenge_id = ?;
    `;

  const VALUES = [
    data.challenge,
    data.skillpoints,
    data.creator_id,
    data.challenge_id,
    data.challenge_id,
  ];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// deleteByChallengeId
//////////////////////////////////////////////////////////////
module.exports.deleteByChallengeId = (data, callback) => {
  const SQLSTATMENT = `
      DELETE FROM FitnessChallenge WHERE challenge_id = ?;
      DELETE FROM UserCompletion WHERE challenge_id = ?;
      `;
  const VALUES = [data.challenge_id, data.challenge_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// selectUserId
//////////////////////////////////////////////////////////////
module.exports.selectUserId = (data, callback) => {
  const SQLSTATMENT = `
            SELECT * FROM User
            WHERE user_id = ?; `;
  const VALUES = [data.user_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// insertSingleCompletionRecord
//////////////////////////////////////////////////////////////
module.exports.insertSingleCompletionRecord = (data, callback) => {
  const SQLSTATMENT = `
        INSERT INTO UserCompletion (challenge_id, user_id, completed, creation_date, notes)
        VALUES (?, ?, ?, ?, ?);
    
        SELECT * FROM UserCompletion
        WHERE complete_id = LAST_INSERT_ID();
        `;

  const VALUES = [
    data.challenge_id,
    data.user_id,
    data.completed,
    data.creation_date,
    data.notes,
  ];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// awardSkillpointsByChallengeId
//////////////////////////////////////////////////////////////
module.exports.awardSkillpointsByChallengeId = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE User 
    SET skillpoints = skillpoints + (
      CASE 
        -- if completed = true, select skillpoints from challenge to add, else add 5
        WHEN ? = TRUE THEN ( SELECT skillpoints FROM FitnessChallenge WHERE challenge_id = ? )
        ELSE 5
      END
    )
    WHERE user_id = ?;
`;
  const VALUES = [data.completed, data.challenge_id, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
// selectParticipantsByChallengeId
//////////////////////////////////////////////////////////////
module.exports.selectParticipantsByChallengeId = (data, callback) => {
  const SQLSTATMENT = `
    SELECT user_id, completed, creation_date, notes FROM UserCompletion
    WHERE challenge_id = ?; 
    `;

  const VALUES = [data.challenge_id];

  pool.query(SQLSTATMENT, VALUES, callback);
};

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

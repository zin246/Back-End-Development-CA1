////////// SECTION B //////////

// levelController.js, levelModel.js, levelRoutes.js is for managing levels and maps in the PvE aspect

const model = require("../models/levelModel.js");

//////////////////////////////////////////////////////////////
// 1 - get all maps
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
module.exports.readAllMaps = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllMaps:", error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };

  // model.getAllMaps to select all maps in the Map table
  model.getAllMaps(callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// 2 - get all levels inside a map by map_id
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
// read all levels in maps, if no result, not valid map,
// map will always have levels so if no result is definitely coz of wrong map
module.exports.readAllLevelsInMap = (req, res, next) => {
  const data = {
    map_id: req.params.map_id,
  };

  const callback = (error, results, fields) => {
    if (results.length == 0) {
      res.status(404).json({
        message: "Map not found",
      });
    } else res.status(200).json(results);
  };

  // model.getAllLevelsInMap to select all levels in chosen map
  model.getAllLevelsInMap(data, callback);
};
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
//////////////////////////// DONE! ///////////////////////////
//////////////////////////////////////////////////////////////

const pool = require("../services/db");

const SQLSTATEMENT = `

-- -------------------
-- Section A's tables
-- -------------------
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS FitnessChallenge;

-- -------------------
-- Section B's tables
-- -------------------
DROP TABLE IF EXISTS UserCompletion;
DROP TABLE IF EXISTS CharacterPool;
DROP TABLE IF EXISTS WeaponShop; 
DROP TABLE IF EXISTS UserInventory;
DROP TABLE IF EXISTS UserHeroes;
DROP TABLE IF EXISTS UserLineupHeroes;
DROP TABLE IF EXISTS UserLineup;
DROP TABLE IF EXISTS Levels; 
DROP TABLE IF EXISTS Map; 
DROP TABLE IF EXISTS PvPHistory;

-- ----------------------------
-- Creating section A's tables
-- ----------------------------

CREATE TABLE User (
user_id INT AUTO_INCREMENT PRIMARY KEY,
username TEXT,
skillpoints INT
);

CREATE TABLE FitnessChallenge (
challenge_id INT AUTO_INCREMENT PRIMARY KEY,
creator_id INT NOT NULL,
challenge TEXT NOT NULL,
skillpoints INT NOT NULL
);

CREATE TABLE UserCompletion (
complete_id INT AUTO_INCREMENT PRIMARY KEY,
challenge_id INT NOT NULL,
user_id INT NOT NULL,
completed BOOL NOT NULL,
creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
notes TEXT
);

-- ----------------------------
-- Creating section B's tables
-- ---------------------------- 

-- CharacterPool table stores the characters to be drawn randomly by user 
CREATE TABLE CharacterPool (
character_id INT AUTO_INCREMENT PRIMARY KEY,
character_name TEXT, 
power INT NOT NULL,
weapon_type TEXT,
class INT
);

-- WeaponShop table stores weapons to be bought by user
CREATE TABLE WeaponShop (
weapon_id INT AUTO_INCREMENT PRIMARY KEY, 
weapon_name TEXT NOT NULL, 
power INT NOT NULL, 
weapon_type TEXT NOT NULL, 
class INT NOT NULL, 
cost INT NOT NULL
);

-- UserInventory table stores weapons bought / obtained by user 
CREATE TABLE UserInventory (
owner_id INT NOT NULL,
inventory_id INT AUTO_INCREMENT PRIMARY KEY,
weapon_id INT NOT NULL,
weapon_name TEXT NOT NULL, 
weapon_rank INT NOT NULL,
class INT NOT NULL,
bought_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
power INT NOT NULL, 
weapon_type TEXT NOT NULL
);

-- UserHeroes table stores the heroes that the user owns
CREATE TABLE UserHeroes (
owner_id INT NOT NULL, 
hero_id INT AUTO_INCREMENT PRIMARY KEY,
character_id INT NOT NULL,
class INT NOT NULL,
character_name TEXT NOT NULL, 
character_nickname TEXT NOT NULL, 
weapon_type TEXT NOT NULL,
weapon_equipped INT NOT NULL,
total_power INT NOT NULL
);

-- UserLineup to set lineups for a user
CREATE TABLE UserLineup (
owner_id INT NOT NULL,
lineup_id INT AUTO_INCREMENT PRIMARY KEY,
lineup_battle_power INT NOT NULL
);

-- UserLineupHeroes table to store owned heroes into UserLineup to be used for battle
CREATE TABLE UserLineupHeroes (
fighter_id INT AUTO_INCREMENT PRIMARY KEY, 
owner_id INT NOT NULL,
hero_id INT NOT NULL,
character_nickname TEXT NOT NULL, 
total_power INT NOT NULL
);

-- Map table to store levels for each map where users challenge and get skillpoints
CREATE TABLE Map (
map_id INT AUTO_INCREMENT PRIMARY KEY,
map_name TEXT NOT NULL, 
levels INT NOT NULL
);

-- Levels table to store details fo each level inside each map 
CREATE TABLE Levels (
map_name TEXT NOT NULL,
map_id INT NOT NULL,
level TEXT NOT NULL,
enemy_1_power INT NOT NULL, 
enemy_2_power INT NOT NULL, 
enemy_3_power INT NOT NULL,
enemy_total_power INT NOT NULL,
skillpoints_reward INT NOT NULL, 
level_cleared BOOL NOT NULL
);

-- --------------------------------------
-- Inserting required data for Section A
-- --------------------------------------

INSERT INTO FitnessChallenge (challenge_id, creator_id, 
challenge, skillpoints) VALUES
(1, 1, 'Complete 2.4km within 15 minutes', 50),
(2, 1, 'Cycle around the island for at least 50km', 100),
(3, 2, 'Complete a full marathon (42.2km)', 200),
(4, 2, 'Hold a plank for 5 mins', 50),
(5, 2, 'Perform 100 push-ups in one session', 75);

-- --------------------------------------
-- Inserting required data for Section B
-- --------------------------------------

INSERT INTO CharacterPool (character_name, power, weapon_type, 
class) VALUES
('Twilight Sparkle', 1000, 'Sword', 1),
('Applejack', 900, 'Spear', 2),
('Fluttershy', 900, 'Spear', 2),
('Rarity', 850, 'Claymore', 3),
('Pinkie Pie', 850, 'Sword', 3),
('Rainbow Dash', 850, 'Claymore', 3),
('Spike', 800, 'Axe', 4), 
('Sunny Starscout', 800, 'Spear', 4),
('Izzy Moonbow', 800, 'Axe', 4), 
('Pipp Petals', 800, 'Sword', 4),
('Hitch Trailblazer', 800, 'Sword', 4),
('Zipp Storm', 800, 'Axe', 4);

INSERT INTO WeaponShop (weapon_name, power, weapon_type, 
class, cost) VALUES 
('Skypiercer', 500, 'Sword', 3, 300),
('Blade Of Despair', 750, 'Sword', 2, 800),
('Blade Of The Ruined King', 1000, 'Sword', 1, 1500),
('Excaliber', 500, 'Claymore', 3, 300),
('Murasame', 750, 'Claymore', 2, 800),
('Blackcliff Slasher', 1000, 'Claymore', 1, 1500),
('War Axe', 500, 'Axe', 3, 300),
('Dragon Slayer', 750, 'Axe', 2, 800), 
('Zanpakuto', 1000, 'Axe', 1, 1500), 
('Skyward Spine', 500, 'Spear', 3, 300), 
('Staff Of Homa', 750, 'Spear', 2, 800),
('Calamity Queller', 1000, 'Spear', 1, 1500),
('Broomstick', 2000, 'Sword', 0, 5000), 
('Fly Swatter', 2000, 'Claymore', 0, 5000),
('Guitar', 2000, 'Axe', 0, 5000),
('Toothpick', 2000, 'Spear', 0, 5000);

INSERT INTO Map (map_name, levels) VALUES
('Bind', 4),
('Haven', 5), 
('Icebox', 5), 
('Ascent', 5),
('Fracture', 5);

INSERT INTO Levels (map_name, map_id, level, enemy_1_power, enemy_2_power, enemy_3_power, 
enemy_total_power, skillpoints_reward, level_cleared) VALUES
('Bind', 1, '1-1', 50, 50, 50, 150, 20, FALSE), 
('Bind', 1, '1-2', 60, 60, 60, 180, 20, FALSE),
('Bind', 1, '1-3', 70, 70, 70, 210, 20, FALSE), 
('Bind', 1, '1-4', 80, 80, 80, 240, 30, FALSE), 
('Haven', 2, '2-1', 100, 100, 100, 300, 40, FALSE), 
('Haven', 2, '2-2', 110, 110, 110, 330, 40, FALSE),
('Haven', 2, '2-3', 120, 120, 120, 360, 40, FALSE), 
('Haven', 2, '2-4', 130, 130, 130, 390, 40, FALSE), 
('Haven', 2, '2-5', 150, 150, 150, 450, 60, FALSE), 
('Icebox', 3, '3-1', 200, 200, 200, 600, 50, FALSE), 
('Icebox', 3, '3-2', 250, 250, 250, 750, 50, FALSE), 
('Icebox', 3, '3-3', 300, 300, 300, 900, 50, FALSE), 
('Icebox', 3, '3-4', 350, 350, 350, 1050, 80, FALSE), 
('Icebox', 3, '3-5', 500, 500, 500, 1500, 100, FALSE),  
('Ascent', 4, '4-1', 600, 600, 600, 1800, 150, FALSE), 
('Ascent', 4, '4-2', 700, 700, 700, 2100, 150, FALSE),
('Ascent', 4, '4-3', 800, 800, 800, 2400, 150, FALSE),  
('Ascent', 4, '4-4', 900, 900, 900, 2700, 150, FALSE), 
('Ascent', 4, '4-5', 1000, 1000, 1000, 3000, 300, FALSE),
('Fracture', 5, '5-1', 1200, 1200, 1200, 3600, 500, FALSE), 
('Fracture', 5, '5-2', 1500, 1500, 1500, 4500, 600, FALSE), 
('Fracture', 5, '5-3', 1800, 1800, 1800, 5400, 700, FALSE), 
('Fracture', 5, '5-4', 2100, 2100, 2100, 6300, 800, FALSE), 
('Fracture', 5, '5-5', 3000, 3000, 3000, 9000, 1500, FALSE);
`;

////////////////////////////////////////////////////
// RUN SQL STATEMENTS
////////////////////////////////////////////////////
pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});

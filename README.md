## This AY202425 BED CA1 project was done by :

Name : Tan Eu Zin,
Class : DAAA1B03,
Admin No. : 2415927

## Details of CA1 Project :

- There are a total of 9 endpoints for Section A.
- There are a total of 21 endpoints for Section B.
- Total number of endpoints for section A and section B combined : 30.

# How to run the app :

- Open a terminal in Visual Studio Code.
- Inside terminal, type 'npm run init_tables' to run all the SQL tables to ensure required data to run the is available.
- Inside terminal, type 'npm run dev' to run the app.

# Prerequisites and Depencies required :

1. Node.js to be installed on the computer.
2. MySQL2.
3. Nodemon.
4. Node.
5. Express.
6. .env file with details from your SQL workbench.

These can be done by opening up a terminal in Visual Studio Code, and typing :
'npm init' ,
'npm install dotenv mysql2 nodemon node express' ,
which downloads all the necessary prerequisites and depencies required.

Node.js has to be downloaded separately.

To setup .env file, create a file in your root directory and name it '.env',
then enter your details from your SQL workbench in this format below :
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=

# Additional Information : Purpose of each files :

1. user files are for managing the user. (3 endpoints)

2. fitnessChallenge files are for managing fitness challenges where users complete to gain skillpoints. (6 endpoints)

3. character files are for managing the gacha system where users spend 2000 skillpoints to draw a random character from the character pool, there are multiple classes : 1, 2, 3, the lower the class, the higher the starting power of these characters. These characters are stored in userHeroes, which is each user's storage for characters drawn. (3 endpoints)

4. weaponShop files are for managing weapon shop where users buy weapons using their skillpoints and store them in their userInventory, each user has their own userInventory. (3 endpoints)

5. userHeroes files are for managing heroes owned by each user. There are 3 goblins, each of different weapon types given to the user as starting heroes. Each hero can be equipped with a weapon in userInventory if and only if the weapon_type of the hero and the weapon matches, doing so will increase the hero's power. (5 endpoints)

6. userInventory files are for managing the weapons owned by each user, no weapons will be provided as a start to each user, weapons can only be bought from the weapon shop using skillpoints. If there are two same weapons of the same rank, they can be merged into one weapon of higher rank, each rank increase will increase the weapon's power. (3 endpoints)

7. userLineup files are for managing user lineups for battle. Each lineup allows users to set a maximum of 3 heroes, and their combined power will be used in combat.(3 endpoints)

8. level files are for managing the PvE aspect, where users can battle levels set for them to earn skillpoints, each level can only be attempted once, success in doing so will grant skillpoints, levels will increase in difficulty as power of enemies will gradually get higher. There are also multiple maps, each consisting of multiple levels for users to challenge. (2 endpoints)

9. battle files are for managing combat. Combat for PvE and PvP is done here. In the PvP aspect, users can challenge other users by fighting other user's lineups. If user wins, skillpoints will be obtained. (2 endpoints)

## Tips for progression :

1. Skillpoints can be earned in five different ways : fitness challenges, fighting levels, fighting other users, deleting weapons in userInventory and deleting heroes in userHeroes.

2. To get a higher power, it is reccommended that lineups are always set with 3 heros inside (maximum limit), and always ensure that they are equipped with weapons.

3. Starter goblins can only get you so far, in order to go even further, you need to draw more characters which are much more stronger than the goblins in order to progress far into the game.

## Inspiration for game :

- Drawn inspiration from 'My Little Pony' for the character gacha system.
- Drawn inspiration from 'Mobile Legends', 'Anime', 'Genshin Impact' and 'League Of Legends' for weapons in the weapon shop.
- Drawn inspiration from maps in 'Valorant' for the maps in PvE aspect.

## Special thanks to :

- BED lecturer Mr Louis Seah for answering any questions that come to mind when working on the project and aid with debugging.
- Benjamin for help with debugging whenever an unsolvable error shows up.
- Shen Lei for help with debugging whenever an unsolvable error shows up.
- Swam for help with debugging whenever an unsolvable error shows up.
- Jovan Heng for help with idea generation and debugging whenever an unsolvable error shows up.
- Xavier Lee for help with idea generation and debugging whenever an unsolvable error shows up.
- Myself for sleeping 4 hours everynight the week before submission working on this assignment.


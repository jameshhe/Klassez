const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

//mysql connection
var connection = mysql.createConnection({
  host: 'foogle-db',
  port: '3306',
  user: 'user',
  password: 'password',
  database: 'foogle'
});

//set up some configs for express.
const config = {
  name: 'foogle-app',
  port: 8000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(
  // {
  //   origin: '*'
  // }
));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err) {
    logger.error("Cannot connect to DB!");
    logger.error(err.stack);
  }
  else
    logger.info("Connected to the DB!");
});


app.get('/', (req, res) => {
  res.status(200).send('Go to localhost:3000.');
})

//Login
app.get('/login', (req, res) => {
  console.log("gother")
  const emailAddress = req.query.emailAddress;
  const password = req.query.password;
  connection.query(`SELECT * FROM users WHERE emailAddress = ? AND password = ?`, [emailAddress, password], (err, result) => {
    if (err) logger.error(err.stack)
    res.end(JSON.stringify(result));
  })
})


//Register
app.post('/register', (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var emailAddress = req.body.emailAddress;
  var username = req.body.username;
  var password = req.body.password;

  connection.query('INSERT INTO users (firstName,lastName,emailAddress,username,password) VALUES (?,?,?,?,?)', [firstName, lastName, emailAddress, username, password], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

//swithch position from 338
//swithch position from 338
app.get('/product/', (req, res) => {
  let search = req.body.search
  connection.query('SELECT * FROM foods', (err, result) => {
    if (err) logger.error(err.stack)
    res.end(JSON.stringify(result));
  })
})

app.get('/product/search/:search', (req, res) => {
  let search = req.params.search
  connection.query("SELECT * FROM foods WHERE foodName LIKE '%?%'", [search], (err, result) => {
    if (err) logger.error(err.stack)
    res.end(JSON.stringify({
      result,
      msg: '000' + search
    }));
  })
})


//Profile
app.put('/:username', (req, res) => {
  var userId = req.body.userId;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var emailAddress = req.body.emailAddress;
  var username = req.body.username;
  var password = req.body.password;

  connection.query('UPDATE users firstName = ?, lastName = ?, emailAddress = ?, username = ?, password = ? WHERE userId = ?', [firstName, lastName, emailAddress, username, password, userId], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.get('/:username', (req, res) => {
  var userId = req.query.userId;

  connection.query(`SELECT * FROM users WHERE userId = ${userId}`, (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.delete('/:username', (req, res) => {
  var userId = req.query.userId;

  connection.query(`DELETE FROM users WHERE userId = ?`, [userId], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })

})


//savedFoods
app.get('/:username/saves', (req, res) => {
  var userId = req.query.userId;

  connection.query(`SELECT f.foodName FROM savedFoods sf INNER JOIN foods f ON sf.foodId = f.foodId WHERE userId = ${userId}`, (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.post('/product/saves', (req, res) => {
  var userId = req.body.userId;
  var foodName = req.body.foodName.replace('/+/g', ' ');
  console.log(foodName)

  connection.query(`INSERT INTO savedFoods (userId, foodId) VALUES (?,(SELECT foodId FROM foods WHERE foodName = ?))`, [userId, foodName], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.delete('/product/saves', (req, res) => {
  var userId = req.query.userId;
  var foodName = req.query.foodName.replace('/+/g', ' ');;

  connection.query(`DELETE FROM savedFoods WHERE userId = ? AND foodId = (SELECT foodId FROM foods WHERE foodName = ?)`, [userId, foodName], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})


//likedFoods
app.get('/:username/likes', (req, res) => {
  var userId = req.query.userId;

  connection.query(`SELECT f.foodName FROM likedFoods lf INNER JOIN foods f ON lf.foodId = f.foodId WHERE userId = ${userId}`, (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.post('/product/likes', (req, res) => {
  var userId = req.body.userId;
  var foodName = req.body.foodName.replace('/+/g', ' ');;

  connection.query(`INSERT INTO likedFoods (userId, foodId) VALUES (? ,(SELECT foodId FROM foods WHERE foodName = ?))`, [userId, foodName], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.delete('/product/likes', (req, res) => {
  var userId = req.query.userId;
  var foodName = req.query.foodName.replace('/+/g', ' ');;

  connection.query(`DELETE FROM likedFoods WHERE userId = ? AND foodId = (SELECT foodId FROM foods WHERE foodName = ?)`, [userId, foodName], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})


//dislikedFoods
app.get('/:username/dislikes', (req, res) => {
  var userId = req.query.userId;

  connection.query(`SELECT f.foodName FROM dislikedFoods df INNER JOIN foods f ON df.foodId = f.foodId WHERE userId = ${userId}`, (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.post('/product/dislikes', (req, res) => {
  var userId = req.body.userId;
  var foodName = req.body.foodName.replace('/+/g', ' ');


  connection.query(`INSERT INTO dislikedFoods (userId, foodId) VALUES (? ,(SELECT foodId FROM foods WHERE foodName = ?))`, [userId, foodName], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.delete('/product/dislikes', (req, res) => {
  var userId = req.query.userId;
  var foodName = req.query.foodName.replace('/+/g', ' ');;

  connection.query(`DELETE FROM dislikedFoods WHERE userId = ? AND foodId = (SELECT foodId FROM foods WHERE foodName = ?)`, [userId, foodName], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})


//Recipes
app.get('/:username/recipes', (req, res) => {
  var userId = req.query.userId;

  connection.query(`SELECT recipeName FROM recipes WHERE userId = ${userId}`, (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.get('/:username/recipes/:recipeName', (req, res) => {
  var userId = req.query.userId;
  var recipeName = req.params.recipeName;

  connection.query(`SELECT * FROM ingredients WHERE recipeId = (SELECT recipeId FROM recipes WHERE recipeName = ? AND userId = ?)`, [recipeName, userId], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.post('/:username/recipes', (req, res) => {
  var userId = req.body.userId;
  var recipeName = req.body.recipeName;

  connection.query(`INSERT INTO recipes (recipeName, userId) VALUES (?,?)`, [recipeName, userId], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.post('/:username/recipes/:recipeName', (req, res) => {
  var userId = req.body.userId;
  var recipeName = req.body.recipeName;
  var ingredient = req.body.ingredient;
  var numberOfServings = req.body.amount;

  connection.query(`INSERT INTO ingredients (ingredient, numberOfServings, recipeId) VALUES (?,?,(SELECT recipeId FROM recipes WHERE recipeName = ? AND userId = ?))`, [ingredient, numberOfServings, recipeName, userId], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.delete('/:username/recipes', (req, res) => {
  var userId = req.query.userId;
  var recipeName = req.query.recipeName;

  connection.query(`DELETE FROM recipes WHERE recipeName = ? AND userId = ?`, [recipeName, userId], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.delete('/:username/recipes/:recipeName', (req, res) => {
  var userId = req.query.userId;
  var ingredient = req.query.ingredient;
  var recipeName = req.params.recipeName;

  connection.query(`DELETE FROM ingredients WHERE ingredient = ? AND recipeId = (SELECT recipeId FROM recipes WHERE recipeName = ? AND userId = ?)`, [ingredient, recipeName, userId], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})



// Product Requests

app.get('/product/:foodName', (req, res) => {
  var foodName = req.params.foodName.replace('/+/g', ' ');

  connection.query('SELECT * FROM foods WHERE foodName = ?', [foodName], (err, result) => {
    if (err) logger.error(err.stack)
    res.end(JSON.stringify(result));
  })
})

app.post('/product/add', (req, res) => {
  var foodName = req.body.foodName;
  var servingPortion = req.body.servingPortion;
  var foodGroupId = req.body.foodGroupId;
  var totalCalories = req.body.totalCalories;
  var totalFat = req.body.totalFat;
  var transFat = req.body.transFat;
  var saturatedFat = req.body.saturatedFat;
  var cholesterol = req.body.cholesterol;
  var sodium = req.body.sodium;
  var totalCarbohydrate = req.body.totalCarbohydrate;
  var sugars = req.body.sugars;
  var protein = req.body.protein;

  connection.query('INSERT INTO foods (foodName,servingPortion,foodGroupId,totalCalories,totalFat,transFat,saturatedFat,cholesterol,sodium,totalCarbohydrate,sugars,protein) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [foodName, servingPortion, foodGroupId, totalCalories, totalFat, transFat, saturatedFat, cholesterol, sodium, totalCarbohydrate, sugars, protein], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.get('/product/groups/get', (req,res) => {
  connection.query('SELECT * FROM foodGroups',(err,result,fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.delete('/product/:foodName', (req, res) => {
  var foodName = req.query.foodName;

  connection.query(`DELETE FROM foods WHERE foodName = ?`, [foodName], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.put('/product/:foodId', (req, res) => {
  var foodId = req.body.foodId;
  var foodName = req.body.foodName;
  var servingPortion = req.body.servingPortion;
  var foodGroupId = req.body.foodGroupId;
  var totalCalories = req.body.totalCalories;
  var totalFat = req.body.totalFat;
  var transFat = req.body.transFat;
  var saturatedFat = req.body.saturatedFat;
  var cholesterol = req.body.cholesterol;
  var sodium = req.body.sodium;
  var totalCarbohydrate = req.body.totalCarbohydrate;
  var sugars = req.body.sugars;
  var protein = req.body.protein;

  connection.query('UPDATE foods SET foodName = ?, servingPortion = ?, foodGroupId = ?, totalCalories = ?, totalFat = ?, transFat = ?, saturatedFat = ?, cholesterol = ?, sodium = ?, totalCarbohydrate = ?, sugars = ?, protein = ? WHERE foodId = ?', [foodName, servingPortion, foodGroupId, totalCalories, totalFat, transFat, saturatedFat, cholesterol, sodium, totalCarbohydrate, sugars, protein, foodId],(err,result,fields) => {
    if(err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})

app.get('/products/get', (req,res) => {
  connection.query('SELECT foodName FROM foods', (err, result) => {
    if(err) logger.error(err.stack)
    res.end(JSON.stringify(result));
  })
})


//search by foodGroup
app.get('/search/group', (req, res) => {
  var foodGroup = req.query.foodGroup;

  connection.query('SELECT foodName FROM foods WHERE foodGroupId = ?', foodGroup, (err, result) => {
    if(err) logger.error(err.stack)
    res.end(JSON.stringify(result));
  })
})

//search by nutritional value
app.get('/search/nutrition', (req, res) => {
  var fieldName = req.query.fieldName;
  var lowerLimit = req.query.lowerLimit;
  var upperLimit = req.query.upperLimit;

  connection.query(`SELECT foodName FROM foods WHERE ${fieldName} >= ? AND ${fieldName} <= ?`, [lowerLimit, upperLimit], (err, result) => {
    if(err) logger.error(err.stack)
    res.end(JSON.stringify(result));
  })
})


//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
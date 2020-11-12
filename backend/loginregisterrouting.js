// ***
// NEEDS CONFIGURATION CODE FROM server.js 
// SEE/REVISE ROUTES/PATHS THAT THEY ARE CORRECT
// ***

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

//Using port 8080
app.get('/', (req, res) => {
  res.status(200).send('Go to localhost:8080.');
})

//Login
app.get('/login', (req, res) => {	//verify path matches
  const username = req.query.username;
  const password = req.query.password;
  
  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
    if (err) logger.error(err.stack)
    res.end(JSON.stringify(result));
  })
})


//Register user
app.post('/register', (req, res) => {	//verify path matches
  var id = req.body.id;
  var type = req.body.type;		//Users declare account type at register?
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  connection.query('INSERT INTO users (username,password,type,email,id) VALUES (?,?,?,?,?)', [username, password, type, email, id], (err, result, fields) => {
    if (err) logger.error(err.stack);
    res.end(JSON.stringify(result));
  })
})
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const sequelize = require('./utils/database');
const auth = require('./utils/auth');
const variables = require('./middleware/variables');
const loginRouters = require('./routes/login');
const { PORT } = require('./config/index');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(variables);
// app.use(express.urlencoded({
//   extended: true
// }));
auth(app);
app.use('/login', loginRouters);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

async function start() {
  try {
    await sequelize.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

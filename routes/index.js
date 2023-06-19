const express = require('express');
const path = require('path');
const oracledb = require('oracledb');

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Oracle DB connection configuration
const dbConfig = {
  user: 'COMP214_m23_er_83',
  password: 'password',
  connectString: '199.212.26.208:1521',
};

// Authenticate user function
async function authenticateUser(username, password) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      'SELECT username FROM users WHERE username = :username AND password = :password',
      [username, password]
    );
    return result.rows.length === 1;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return false;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
}

// Define routes
app.get('/', (req, res) => {
  res.render('index', { css: 'css/styles.css' });
});

app.get('/about', (req, res) => {
  res.render('about', { css: 'css/styles.css' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { css: 'css/styles.css' });
});

app.get('/services', (req, res) => {
  res.render('services', { css: 'css/styles.css' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { css: 'css/styles.css' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const isAuthenticated = await authenticateUser(username, password);
  if (isAuthenticated) {
    res.redirect('/business-contacts');
  } else {
    res.redirect('/login');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

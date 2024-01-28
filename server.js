const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware to parse JSON
app.use(bodyParser.json());

// Route to insert data
app.post('/api/insert', async (req, res) => {
  try {
    const entries = req.body;

    const values = entries.map(entry => [entry.name, entry.email, entry.address]);
    const sql = 'INSERT INTO entries (name, email, address) VALUES ?';

    connection.query(sql, [values], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Entries inserted successfully');
        res.status(201).json({ message: 'Entries inserted successfully' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
/*****   squelize ******/
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

// Create Sequelize instance
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define model
const Entry = sequelize.define('Entry', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Middleware to parse JSON
app.use(bodyParser.json());

// Route to insert data
app.post('/api/insert', async (req, res) => {
  try {
    const entries = req.body;

    // Insert entries
    await Entry.bulkCreate(entries);

    console.log('Entries inserted successfully');
    res.status(201).json({ message: 'Entries inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });

/*******/
User.bulkCreate([
  { username: 'barfooz', isAdmin: true },
  { username: 'foo', isAdmin: true },
  { username: 'bar', isAdmin: false }
]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
  return User.findAll();
}).then(users => {
  console.log(users) // ... in order to get the array of user objects
})

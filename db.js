const mysql = require('mysql');

const pool = mysql.createPool({
	host: "localhost",
	user: process.env.PWUSER,
	password: process.env.PWPASS,
	database: "interview"
});

module.exports = pool;

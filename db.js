const mysql = require('mysql');

const pool = mysql.createPool({
	host: "localhost",
	user: "mccantsr",
	password: process.env.PWPASS,
	database: "interview"
});

module.exports = pool;

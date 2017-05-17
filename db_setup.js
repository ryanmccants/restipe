var db = require('./db');

db.getConnection( (err, conn) => {
  if (err) throw err;
  var sql = "CREATE TABLE IF NOT EXISTS resources" +
		"(id INT AUTO_INCREMENT PRIMARY KEY," +
		"ip VARCHAR(255)," +
		"port VARCHAR(255)," +
		"timestamp TIMESTAMP)";
  conn.query(sql, (error, result) => {
    conn.release();
    if (error) throw error;
    console.log("Table created");
    db.end((e) => {
      if (e) throw e
    });
  });
});

const db = require('./db');

db.getConnection( (err, conn) => {
  if (err) throw err;
  var sql = "INSERT INTO resources (ip, port) VALUES ?";
  var values = [
    ['127.0.0.1', 3000],
    ['localhost', 3333]
  ];
  conn.query(sql, [values], (error, result) => {
    conn.release();
    if (error) throw error;
    console.log(result.affectedRows + " records created");
    db.end((e) => {
      if (e) throw e
    });
  });
});

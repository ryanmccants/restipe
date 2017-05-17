var express = require('express');
var router = express.Router();
var db = require('../db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.getConnection( (err, conn) => {
    if (err) throw err;
    conn.query("SELECT * FROM resources", (error, results) => {
      conn.release();
      if (error) throw error;
      res.json(results);
    });
  });
});

router.post('/', function(req, res, next) {
  if (!req.body) return res.json({message: "No body"});
  resource = req.body;
  db.getConnection( (err, conn) => {
    if (err) throw err;
    sql = "INSERT INTO resources SET ?";
    conn.query(sql, resource, (error, results) => {
      conn.release();
      if (error) throw error;
      res.json({message: 'Resource added', id: results.insertId});
    });
  });
});

router.get('/:id', function(req, res, next) {
  db.getConnection( (err, conn) => {
    if (err) throw err;
    sql = "SELECT * FROM resources WHERE id=?"
    conn.query( sql, req.params.id, (error, results) => {
      conn.release();
      if (error) throw error;
      res.json(results)
    });
  });
});

router.put('/:id', function(req, res, next) {
  if (!req.body) return res.json({message: "No body"});
  resource = req.body;
  db.getConnection( (err, conn) => {
    if (err) throw err;
    sql = "UPDATE resources SET ip = ?, port = ? WHERE id = ?";
    conn.query(sql, [resource.ip, resource.port, req.params.id], (error, results) => {
      conn.release();
      if (error) throw error;
      res.json({message: 'Resource updated', Affected: results.affectedRows});
    });
  });
});

router.delete('/:id', function(req, res, next) {
  if (!req.body) return res.json({message: "No body"});
  resource = req.body;
  db.getConnection( (err, conn) => {
    if (err) throw err;
    sql = "DELETE FROM resources WHERE id = ?";
    conn.query(sql, req.params.id, (error, results) => {
      conn.release();
      if (error) throw error;
      res.json({message: 'Resource deleted', Affected: results.affectedRows});
    });
  });
});


module.exports = router;

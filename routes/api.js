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
  if (!req.body.ip || !req.body.port) {
    return res.json({message: "Json payload required with ip and port keys"})
  };
  resource = {};
  resource.ip = req.body.ip;
  resource.port = req.body.port;
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
  resource = {};
  if (req.body.ip) resource.ip = req.body.ip;
  if (req.body.port) resource.port = req.body.port;
  keys = Object.keys(resource);
  if (keys.length === 0) {
    return res.json({message: "Json payload contains no updateable keys"})
  }
  vals = Object.values(resource).concat([req.params.id])
  db.getConnection( (err, conn) => {
    if (err) throw err;
    update_cols = keys.map(key => key + " = ?").join(', ');
    sql = "UPDATE resources SET " + update_cols + " WHERE id = ?";
    conn.query(sql, vals, (error, results) => {
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

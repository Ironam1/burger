const connection = require("../config/connection.js");

//We need some helper functions for mySQL

function printQuestionMarks(num) {
  let arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function objToSql(ob) {
  let arr = [];

  for (var key in ob) {
    let value = ob[key];
    // make sure no hidden values are captured
    if (Object.hasOwnProperty.call(ob, key)) {
      // add quotes around multiple word strings
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
        arr.push(key + "=" + value);
      }
    }
    return arr.toString();
  }
}

let orm = {
  // select all burgers
  selectAll: function(tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    let queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  updateOne: function(table, condition, cb) {
    // console.log("orm " + condition);
    var queryString = "UPDATE " + table;
    queryString += " SET devoured = 1 ";
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function(err, res) {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },
  deleteOne: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;

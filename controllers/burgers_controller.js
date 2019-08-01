const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    let hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  // console.log("POST")
  burger.insertOne(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    function(result) {
      // console.log(result);
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  console.log("condition: ", condition);
  console.log(req.body);
  burger.updateOne(
    {
      devoured: req.body.data
    },
    condition,
    function(result) {
      if (result.changedRows == 0) {
        // if the function did not work
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;
  console.log("condition", condition);

  burger.deleteOne(condition, function(result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;

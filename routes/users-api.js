/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");
const userApiQueries = require("../db/queries/users-api");

// homepage
router.get("/:id", async(req, res) => {
  // do a query to SELECT name based on id
  let user = [];
  try {
    user = user.concat(await userQueries.getUsers(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // do another query  to Read all restaurants
  let restaurants = [];
  try {
    restaurants = restaurants.concat(
      await userApiQueries.getRestaurants(req.params.id)
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // do a query to SELECT last 3 completed orders
  let orderHistory = [];
  try {
    orderHistory = orderHistory.concat(
      await userApiQueries.getUserOrders(req.params.id)
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  res.render("homepage", {
    user: user[0],
    restaurants,
    orderHistory,
  });
});

router.get("/restaurants/:id", (req, res) => {
  res.render("users.ejs");
});

module.exports = router;

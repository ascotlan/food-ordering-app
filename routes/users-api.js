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
const noCache = require("../middleware/noCache");

//****homepage route handler******//
router.get("/:id", noCache, async(req, res) => {
  //check for auth cookie
  if (!req.session.user_id) {
    return res.redirect("/");
  }

  // do a query to SELECT name based on id
  let user = [];
  try {
    user = user.concat(await userQueries.getUsers(req.session.user_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // do another query  to Read all restaurants
  let restaurants = [];
  try {
    restaurants = restaurants.concat(await userApiQueries.getRestaurants());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // do a query to SELECT last 3 completed orders
  let orderHistory = [];
  try {
    orderHistory = orderHistory.concat(
      await userApiQueries.getUserOrders(req.session.user_id)
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

// Menu page route handler
router.get("/restaurants/:id", noCache, async(req, res) => {
  //check for auth cookie
  if (!req.session.user_id) {
    return res.redirect("/");
  }

  // do a query to get all menu items for a restaurant
  let items = [];
  try {
    items = items.concat(await userApiQueries.getAllMenuItems(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // do a query to SELECT name based on id
  let user = [];
  try {
    user = user.concat(await userQueries.getUsers(req.session.user_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  //ensure cart is not undefined
  if (!req.session.cart) {
    req.session.cart = [];
  }

  res.render("menu-page.ejs", {
    user: user[0],
    items,
    cart: req.session.cart,
    restaurant_id: req.params.id,
  });
});

module.exports = router;

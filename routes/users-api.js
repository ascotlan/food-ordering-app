/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

// homepage
router.get("/:id", (req, res) => {
  // do a query to SELECT name, restaurant_admin, last 3 orders,
  // do another query  to Read all restaurants
  let restaturant;
  let orderHistory;
  // userQueries
  //     .getRestaurants()
  //     .then((data) => {
  //        restaurant = data;
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });

  // userQueries
  //     .getOrderHistory()
  //     .then((data) => {
  //        orderHistory = data;
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });

  res.render("homepage", {
    user: { name: "Antonio", admin: false },
    restaurant: {
      name: "KFC",
      city: "Waterloo",
      street: "Kfc Avenue",
      street_number: "123",
      phone_number: "555-555-5555",
      logo_url,
      thumbnail_url: "",
    },
  });
});

// router.get("/", (req, res) => {
//   userQueries
//     .getUsers()
//     .then((users) => {
//       res.json({ users });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

module.exports = router;

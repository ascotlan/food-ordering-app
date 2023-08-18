/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

// login
router.get("/login/:id", (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  //query user table for user type
  //userQueries
  //     .getUser(req.params.id)
  //     .then((user) => {
  //       //makes redirects
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });

  const queryResult = { user: { restaurant_id: 1, restaturant_admin: false } };

  // mock result
  if (req.params.id === "3") {
    queryResult.user.restaturant_admin = true;
  }

  //determine user type
  if (queryResult.user.restaturant_admin) {
    res.redirect(
      `/api/widgets/orders/${queryResult.user.restaurant_id}/restaurants`
    );
  } else {
    // send the user somewhere
    res.redirect(`/api/users/${req.params.id}`);
  }
});

// logout
router.post("/logout", (req, res) => {
  // using encrypted cookies
  req.session.user_id = null;
  res.redirect("/");
});

module.exports = router;

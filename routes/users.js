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
router.get("/login/:id", async(req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  let userType = [];
  // query user table for user type
  try {
    userType = userType.concat(await userQueries.getUserType(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  //determine user type
  if (userType[0].restaurant_admin) {
    res.redirect(
      `/api/widgets/orders/${userType[0].restaurant_id}/restaurants`
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

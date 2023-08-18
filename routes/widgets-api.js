/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/orders/:id/restaurants", (req, res) => {
  // do a query to SELECT all open orders using id

  const openOrders = { orders: "..." };

  res.render("admin-portal.ejs", {
    user: { admin: true },
    openOrders,
  });
});

// router.get("/", (req, res) => {
//   const query = `SELECT * FROM widgets`;
//   console.log(query);
//   db.query(query)
//     .then((data) => {
//       const widgets = data.rows;
//       res.json({ widgets });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

module.exports = router;

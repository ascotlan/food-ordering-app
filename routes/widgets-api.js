/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const noCache = require("../middleware/noCache");
const userQueries = require("../db/queries/users");

// checkout cart handler
router.post("/order_items", (req, res) => {
  //check for auth cookie
  if (!req.session.user_id) {
    return res.redirect("/");
  }
  const id = req.body.item_id;
  const name = req.body.item_name;
  const price = req.body.item_price;
  const restaurantId = req.body.restaurant_id;

  let count = 0;

  req.session.cart.forEach((item, i) => {
    if (item.id === id) {
      req.session.cart[i].quantity += 1;
      count++;
    }
  });

  if (count === 0) {
    const orderData = {
      id,
      name,
      price: parseFloat(price),
      quantity: 1,
    };

    req.session.cart.push(orderData);
  }

  res.redirect(`/api/users/restaurants/${restaurantId}`);
});

// Route handler for order confirmation page
router.get("/orders", noCache, async (req, res) => {
  //check for auth cookie
  if (!req.session.user_id) {
    return res.redirect("/");
  }

  let user = [];
  try {
    user = user.concat(await userQueries.getUsers(req.session.user_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  res.render("order-confirmation", {
    user: user[0],
  });
});

// Route handler to remove item from cart
router.get("/order_items/:id/delete", (req, res) => {
  //check for auth cookie
  if (!req.session.user_id) {
    return res.redirect("/");
  }

  const itemId = req.params.id;
  const restaurantId = req.query.id;

  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].id === itemId) {
      req.session.cart.splice(i, 1);
    }
  }
  res.redirect(`/api/users/restaurants/${restaurantId}`);
});

//Admin portal page route handler
router.get("/orders/:id/restaurants", noCache, (req, res) => {
  //check for auth cookie
  if (!req.session.user_id) {
    return res.redirect("/");
  }

  // do a query to SELECT all open orders using id

  const openOrders = { orders: "..." };

  res.render("admin-portal.ejs", {
    user: { admin: true },
    openOrders,
  });
});

module.exports = router;

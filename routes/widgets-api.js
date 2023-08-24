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
const userApiQueries = require("../db/queries/users-api");
const widgetApiQueries = require("../db/queries/widgets-api");
const { sendAdminNotification, sendOrderEta } = require("../sms/sms");

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

  //query restarurants table by id
  const restaurant_id = req.query.id;
  let restaurant = [];

  try {
    restaurant = restaurant.concat(
      await userApiQueries.getRestaurantInfo(restaurant_id)
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // query user table for user type
  let user = [];
  try {
    user = user.concat(await userQueries.getUsers(req.session.user_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // ensure cart is not undefined
  if (!req.session.cart) {
    req.session.cart = [];
  }

  res.render("order-confirmation", {
    user: user[0],
    cart: req.session.cart,
    restaurant: restaurant[0],
  });
});

// Add new confirmed order to database
router.post("/orders", async (req, res) => {
  //check for auth cookie
  if (!req.session.user_id) {
    return res.redirect("/");
  }

  // query the order table and insert the new order
  let order = [];

  try {
    order = order.concat(
      await widgetApiQueries.createOrder({
        user_id: req.session.user_id,
        restaurant_id: req.body.restaurant_id,
      })
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // query the order_items table and insert each order item
  for (let item of req.session.cart) {
    try {
      await widgetApiQueries.addNewItems(order[0].id, item.id, item.quantity);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // query db for required contact infoto send the SMS text to the restaurant admin
  let contact = [];

  try {
    contact = contact.concat(
      await widgetApiQueries.newOrderContactInfo(
        req.session.user_id,
        req.body.restaurant_id,
        order[0].id
      )
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  //***send order summary sms text to restaurant admin***
  sendAdminNotification(req.session.cart, {
  restaurantAdminPhone: contact[0].admin_phone_number,
  orderNumber: order[0].id,
  customerPhone: contact[0].phone_number,
  customerName: contact[0].name,
 });

  //empty cart
  req.session.cart = [];

  // redirect to confirmation page with modal based on order.id
  res.redirect(`/api/users/${req.session.user_id}`);
});

// Route handler to remove item from cart
router.post("/order_items/:id/delete", (req, res) => {
  //check for auth cookie
  if (!req.session.user_id) {
    return res.redirect("/");
  }

  const itemId = req.params.id;
  const restaurantId = req.body.id;

  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].id === itemId) {
      req.session.cart.splice(i, 1);
    }
  }
  res.redirect(`/api/users/restaurants/${restaurantId}`);
});

//Admin portal page route handler
router.get("/orders/:id/restaurants", noCache, async (req, res) => {
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

  // do a query to SELECT all open orders using id

  let openOrders = [];
  try {
    openOrders = openOrders.concat(
      await widgetApiQueries.getOpenOrdersByRestaurantAdminId(
        req.session.user_id
      )
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // get all restaurant info by restaurant id
  let restaurant = [];
  try {
    restaurant = restaurant.concat(
      await userApiQueries.getRestaurantInfo(req.params.id)
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  let orderItems = [];
  for (let order of openOrders) {
    try {
      orderItems = orderItems.concat(
        await widgetApiQueries.getOrderItems(order.order_number)
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  res.render("admin-portal.ejs", {
    user: user[0],
    restaurant: restaurant[0],
    openOrders,
    orderItems,
  });
});

// Complete the order by updating status to complete
router.post("/orders/:id/order_status", async (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/");
  }

  try {
    await widgetApiQueries.completeOrder(req.params.id);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  res.redirect(`/api/widgets/orders/${req.body.restaurant_id}/restaurants`);
});

// Update the order with an ETA
router.post("/orders/:id/eta", async (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/");
  }

  let eta = [];
  try {
    eta = eta.concat(
      await widgetApiQueries.updateOrderEta(req.params.id, req.body.eta) 
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // Send SMS text to customer
   sendOrderEta({
  restaurant:req.body.restaurant_name,
  eta: eta[0].eta
  })

  res.redirect(`/api/widgets/orders/${req.body.restaurant_id}/restaurants`);
});

module.exports = router;

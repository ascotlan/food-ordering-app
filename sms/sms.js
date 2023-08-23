const { Twilio } = require("twilio");

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

function generateMessage(cart, contact) {
  let str = "";
  str += `\nNew order number: ${contact.orderNumber}\n`;
  str += "========\n";
  for (let item of cart) {
    str += `${item.quantity} x ${item.name} @ $${item.price / 100}\n`;
  }
  str += "========\n";
  str += `Customer name: ${contact.customerName}\n`;
  str += `Customer phone: ${contact.customerPhone}`;
  return [str, contact.adminPhone];
}

// Function to send order notification to admin
function sendAdminNotification(cart, contact) {
  const [message, phone] = generateMessage(cart, contact);
  client.messages
    .create({
      body: message,
      to: process.env.TWILIO_CUSTOMER, // Admin's phone number contact.restaurantAdminPhone
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
    })
    .then((message) =>
      console.log("Order notification sent to admin:", message.sid)
    )
    .catch((error) =>
      console.error("Error sending order notification to admin:", error.message)
    );
}

// Function to send order ETA notification to user
function sendOrderEta(orderInfo) {
  client.messages
    .create({
      body: `Thank you for using OmniEats. Your order from ${orderInfo.restaurant} will be ready for pick up in approximately ${orderInfo.eta} minutes.`,
      to: process.env.TWILIO_CUSTOMER, // User's phone number contact.customerPhone
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
    })
    .then((message) =>
      console.log("Order completion notification sent to user:", message.sid)
    )
    .catch((error) =>
      console.error(
        "Error sending order completion notification to user:",
        error.message
      )
    );
}

module.exports = { sendAdminNotification, sendOrderEta };

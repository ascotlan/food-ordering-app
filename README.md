# OmniEats Application Project

Welcome to the OmniEats Application Project! This collaborative effort brings together the skills and dedication of Antonio, Maria, Neriman, and Gift. OmniEats is more than just a food ordering platform – it's a transformative experience that redefines how you engage with restaurants.

## Project Structure

Our project harmoniously combines frontend and backend excellence. The frontend showcases expertise in HTML, CSS, Javascript and some jQuery, resulting in an intuitive and engaging user interface. The backend employs the power of Node.js and a robust PostgreSQL database for dynamic logic and seamless data management.

## Summary Of OmniEat Application

**Landing Page:**

- Users can access the landing page.
- Information about OmniEats' role as an intermediary for restaurants is displayed.

**Menu Selection:**

- Users can view the menu items.
- Menu items can be selected in varying quantities, each with its respective price.
- Subtotal of quantities with costs is displayed.
- Users can easily remove items from their selections.

**Checkout and Order Submission:**

- Users can proceed to checkout with their selections.
- Orders can be submitted for pick-up, and they are pre-paid.

**Order Status Tracking:**

- Users can track their order status on the OmniEats website post-submission.
- Estimated wait times for order fulfillment are provided.

**Restaurant Portal Login:**

- Registered restaurant users can log in to their accounts.
- The restaurant user portal offers an overview of pending and in-progress orders, including order dates and an input element for updating estimated order readiness times.

**Order Notification for Restaurants:**

- Restaurants receive SMS notifications from OmniEats upon new order placements.
- This feature facilitates prompt updates of order ETA's within the restaurant admin portal.

**ETA Notifications for Users:**

- Users receive SMS notifications from OmniEats containing estimated order pickup times.
- Notifications are delivered even when users are logged out of their accounts.

## Screenshots

### Landing page

Hero Section
![Hero Section]()
Meals Section
![Meals Section]()
Testimonials Section
![Testimonials Section ]()
Business partner section
![Business partner section]()

### Customer Homepage

![Customer Homepage]()

### Menu Page

![Menu page]()

### Order Confimation page

![Order confirmation page]()

### Restaurant Admin portal

![Restaurant admin page]()

### SMS Texts

Shows the order summary text the restaurant admin would receive and the order ETA text the customer would receive

![Sms sent to customer](https://github.com/ascotlan/food-ordering-app/assets/105958169/9a75535b-706a-4630-b58f-b0b34ffd132c)

## Getting Started

1. Create the `.env` file using `.env.example` as a reference: `cp .env.example .env`
2. Update the `.env` file with your local database information:
   - username: `labber`
   - password: `labber`
   - database: `midterm`
3. Install dependencies: `npm install`
4. Rebuild binaries for Sass: `npm rebuild node-sass`
5. Reset the database: `npm run db:reset` (Note: This will reset data)
6. Run the server: `npm run local`
   - Nodemon is used, so restarting the server is usually unnecessary
7. Visit `http://localhost:8080/`

## Warnings & Tips

- Avoid direct edits to `layout.css` since it's auto-generated from `layout.scss`.
- Organize routes into separate resource-based files (e.g., `users.js` and `widgets.js`).
- Split database schema (table definitions) and seeds (inserts) into separate files.
- Utilize helper functions for SQL queries and data cleanup from the database.
- Use `npm run db:reset` to apply changes to the database schema or seeds. Note that this command will reset existing data.

## Dependencies

- Node 14.x or above
- NPM 5.x or above
- PG 8.5.0
- Twilio: 4.15.0
- Express: 4.17.1
- Sass: 1.35.1
- Morgan: 1.9.1
- Ejs: 2.6.2
- Dotenv: 2.0.0
- Cookie-session : 2.0.0
- chalk: 2.4.2

For more information, feel free to contact our team members: Antonio, Maria, Neriman, and Gift.

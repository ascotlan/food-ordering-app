LHL Node Skeleton
=========

## Project Setup

The following steps are only for _one_ of the group members to perform.

1. Create your own copy of this repo using the `Use This Template` button, ideally using the name of your project. The repo should be marked Public
2. Verify that the skeleton code now shows up in your repo on GitHub, you should be automatically redirected
3. Clone your copy of the repo to your dev machine
4. Add your team members as collaborators to the project so that they can push to this repo
5. Let your team members know the repo URL so that they use the same repo (they should _not_ create a copy/fork of this repo since that will add additional workflow complexity to the project)

## Screenshot
[Landing page](https://github.com/ascotlan/food-ordering-app/assets/105958169/faea7c50-559b-4bc7-a0d6-5c7bc8ae55f4)
![Testimonials ](https://github.com/ascotlan/food-ordering-app/assets/105958169/df2a848c-7ff4-4cef-9b85-50be8cb9a9af)
![Meal page](https://github.com/ascotlan/food-ordering-app/assets/105958169/18db78d4-c9d9-4c7b-b9f6-a39202c4a9dc)
![order history](https://github.com/ascotlan/food-ordering-app/assets/105958169/8be8f848-fee6-40a2-a9ed-73e900d8a732)
![footer](https://github.com/ascotlan/food-ordering-app/assets/105958169/d40bc0dc-99af-4fbb-a096-1ad798601e52)
![Become A Business Partner](https://github.com/ascotlan/food-ordering-app/assets/105958169/9b00514c-d551-489c-9162-da71ef8612a7)
![Restaurant admin page](https://github.com/ascotlan/food-ordering-app/assets/105958169/6125a08b-1a1f-44b5-9e05-0cbf7027ada5)
![order confirmation page](https://github.com/ascotlan/food-ordering-app/assets/105958169/d5fc1d3b-0cb1-48f0-b84a-6d44ec2aa7d6)
![checkout page](https://github.com/ascotlan/food-ordering-app/assets/105958169/69b89836-39ad-4768-bdd4-9ff5b19abe25)
![sms notification sent to admin](https://github.com/ascotlan/food-ordering-app/assets/105958169/76ee3008-d110-45dd-a411-c9f24a252ef6)
![Sms sent to customer](https://github.com/ascotlan/food-ordering-app/assets/105958169/9a75535b-706a-4630-b58f-b0b34ffd132c)


## Getting Starting
1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`.
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`.
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples. 
- Use helper functions to run your SQL queries and clean up any data coming back from the database. See `db/queries` for pre-populated examples.
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 
  - It runs through each of the files, in order, and executes them against the database. 
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

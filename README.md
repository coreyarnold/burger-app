# Burger App

- Full-Stack application.
- Uses an Express API to serve our data from a Mongo database.
- Consumes our API with a separate front-end built with React.
- Has multiple relationships and CRUD functionality.

# To start this app:

1. create a `.env` file in the root of this project and put in the relevant API keys. These Keys are from Mapbox (www.mapbox.com) and ReactFilestack (https://www.npmjs.com/package/filestack-react)

sample `.env` file content:

```
MAPBOX_TOKEN={YOUR KEY}
imageKEY={YOUR KEY}

```

2. initialise mongodb
   use instructions here: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition

commands:

```
   xcode-select --install
   brew tap mongodb/brew
   brew install mongodb-community@4.4
   brew services start mongodb-community@4.4
```

3. Open up this project in terminal and install the packages with `npm i`
4. Open a tab and start the backend with `npm run serve:backend`
5. Open a second tab and start the backend with `npm run serve:frontend`
6. Open a third tab and seed the project with data by running `node db/seeds.js`

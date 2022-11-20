# KoranezaFarms Ecommerce

## Description

KoranezaFarms store enable three main different flows or implementations:

1. Buyers browse the store categories, products and brands
2. Sellers or Merchants manage their own brand component
3. Admins manage and control the entire store components 


* features:
  * Node provides the backend environment for this application
  * Express middleware is used to handle requests, routes
  * Mongoose schemas to model the application data
  * React for displaying UI components
  * Redux to manage application's state
  * Redux Thunk middleware to handle asynchronous redux actions


## Database Seed

* The seed command will create an admin user in the database
* The email and password are passed with the command as arguments
* Like below command, replace brackets with email and password. 
* For more information, see code [here](server/utils/seed.js)

```
npm run seed:db [email-***@****.com] [password-******] // This is just an example.
```

<!-- ## Demo

This application is deployed on Heroku. Please check it out :smile: [here](https://mern-store-80202.herokuapp.com/).

See admin dashboard [demo](https://mernstore-bucket.s3.us-east-2.amazonaws.com/admin.mp4) -->

## Install

Some basic Git commands are:

```
$ git clone https://github.com/mucyo-coder/KoranezaFarms.git
$ cd project
$ yarn install
```

## Setup

```
 Create .env file that include:

  * PORT=8000
  * MONGO_URI
  * JWT_SECRET
  * CLOUDINARY_API_KEY
  * CLOUDINARY_CLOUD_NAME
  * CLOUDINARY_API_SECRET
  * BASE_CLIENT_URL
  * BASE_SERVER_URL
```

## Heroku Deployment

```
> Create a Procfile in the root directory of your application with the following command **web: npm run start:production**
```

## Start development

```
$ npm run dev
```

## Simple build for production

```
$ npm run build
```

## Run build for production

```
$ npm start
```


## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

- [Webpack](https://webpack.js.org/)


### Code Formatter (Not compulsory)

- Add a `.vscode` directory
- Create a file `settings.json` inside `.vscode`
- Install Rome - Code formatter in VSCode
- Add the following snippet:  

```json

    {
      "editor.formatOnSave": true,
      "rome.singleQuote": true,
      "rome.arrowParens": "avoid",
      "rome.jsxSingleQuote": true,
      "rome.trailingComma": "none",
      "javascript.preferences.quoteStyle": "single",
    }

```


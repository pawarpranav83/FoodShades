<h1 align="center">Welcome to FoodShades 🍻</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Food Ordering Application

## Project Description

For Customers

- Users can create their account in our database and sign in.
- Once the user is successfully signed in, they will be redirected to the Homepage.
- The user can see all the restaurant currently available.
- The home page also contains a search bar to search for a particular restaurant by its name.
- The user can also sort the restaurants depending on various Categories like Chinese, Burgers, etc or according to the delivery time, Veg Only, Rating.
- The user can order from only one specific restaurant.
- Also, the user can view their order history in the Past Orders Page.
- Also, the user can view their personal details, and can also update them.
- Also, the user can change their current password.
- On the Restaurant Page, the user can search for a particular dish using the search bar.
- Once ordered the user can see the order details.
- Users can also rate the order.

For Restaurant Owners

- Restaurant Owners can login using the Restaurant Name and its corresponding password.
- The owner can update their current dish name, price, description, dish image, its category.
- The owner can also add new dishes on its current restaurant page.

# Screen shots

<img src="public/Screenshot/SignIn.png"></img>
<img src="publicScreenshot/logIn.png"></img>
<img src="public/Screenshot/RestaurantOwnerAuth.png"></img>
<img src="public/Screenshot/indexpage.png"></img>
<img src="public/Screenshot/Homepage.png"></img>
<img src="public/Screenshot/HomepageRestaurant.png"></img>
<img src="public/Screenshot/RestaurantPage.png"></img>
<img src="public/Screenshot/AccountDetails.png"></img>
<img src="public/Screenshot/ChangePassword.png"></img>
<img src="public/Screenshot/PastOrders.png"></img>
<img src="public/Screenshot/orderdetails.png"></img>
<img src="public/Screenshot/AddDishModal.png"></img>
<img src="public/Screenshot/EditDishModal.png"></img>

### ✨ [Deployed site](https://foodshades.onrender.com/)

# Features Implemented

## Features

### FrontEnd

1. Landing page:

- The landing page contains the overview of the website about how we intend the users to use this website.

2. Sign in and sign up page :

- All the checks have been made on the frontend side for email and password. For example, we have defined the password pattern that the user must enter while signing up.

3. Home Page :

- Once the user is signed in, a user id is generated, saved in Local Storage, which helps maintain session activity. This user id is verified every time the user visits any page.
  A Sliding Banner is implemented, using JS and CSS.
  Once logged in, the browser would prompt for the users location, which will be displayed in the Navigation Bar.
  It also includes a Search Bar used to search for various restaurants.
  Once the restaurant is finalized by the user, they are transfered to that particular restaurant's page.

4. Restaurant Page :

- Restaurant Page contains various details regarding that restaurat, like delivery time, location, rating, restaurant type and the offers available at the moment. Below the restaurant banner, the user can view various dishes, and add them to the cart, on the right. After finalising the dishes the user can place the order and view its details on the Order Details Page.

5. Order Details Page :

- User can view the current order, all the dish details, along with the Bill Details. And there is also an option for rating the order, which then gets added to the restaurant's overall rating.

6. Past Order Page :

- User can view their accounts past order history, with the Total Bill and the exact date and time of the order, the restaurant's name.

7. Account Page :

- The account details of the user can be viewed and updated. The user can also change their current password, using the old password.

8. Restaurant Owner page :

- The restaurant owner can edit their existing dish, by using the Edit Dish Button, then a modal window would pop up, which contains the dish information, that can be edited - dish name, image link, price, catergory, and description.
- Now the onwer can also add new dish using the Add Dish Button, and all the above details must be filled.

### Back-End

- View Routes

```
/
/login
/signup
/loginRestaurant
/overview
/pastOrders/:userId
/restaurant/:slug
/me
/orderPlaced/:id
/restaurantOwner/:restaurantId
/orderDel/:orderId
/resAuth
/orderDetails
/pastOrders
```

- API Routes

```
/api/v1/restaurants
/api/v1/restaurants/:restaurantId/reviews
/api/v1/restaurants/:id
/api/v1/restaurants/:restId/:dishId

/api/v1/users/signup
/api/v1/users/login
/api/v1/users/logout
/api/v1/users/forgotPassword
/api/v1/users/resetPassword/:token
/api/v1/users/me
/api/v1/users/updatePassword
/api/v1/users/updateMe
/api/v1/users
/api/v1/users/:id

/api/v1/reviews
/api/v1/reviews/:id

/api/v1/orders
/api/v1/orders/:id
/api/v1/orders/checkout-session/:orderId
```

# Technologies/Libraries/Packages Used

| Packages        | README                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------ |
| bcrypt          | To store hashed password in database                                                             |
| dotenv          | To keep db connection string, client id, client secret key safe                                  |
| nodemon         | To run application in dev mode                                                                   |
| pug             | To Embed JavaScript code in a template that is then used to generate HTML                        |
| cookie-parser   | To store or access session (JWT token) data                                                      |
| jsonwebtoken    | To authenticate requests                                                                         |
| helmet          | Help secure Express/Connect apps with various HTTP headers                                       |
| hpp             | Express middleware to protect against HTTP Parameter Pollution attacks                           |
| mongoose        | Mongoose MongoDB ODM                                                                             |
| stripe          | For handling payments                                                                            |
| nodemailer      | For sending e-mail from your Node.js applications                                                |
| slugify         | Slugifies a String                                                                               |


## Local Setup

Execute node app.js in terminal after cloning the project

Note that database connection string & secret keys are in env file which are not uploaded on github

### Built With

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40" style="max-width:100%;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40" style="max-width:100%;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40" style="max-width:100%;"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40" style="max-width:100%;"><img src="https://github.com/pawarpranav83/FoodShades/assets/101933072/56258a20-e719-4ea6-b52d-3056c4fe415a" alt="mongodb" width="40" height="40" style="max-width:100%;"><a href="https://expressjs.com" target="_blank"> <img src="https://github.com/pawarpranav83/FoodShades/assets/101933072/fd461508-597a-486e-b036-c1fe9e00a6aa" alt="express" height="40"/> </a>


## Contact

### Pranav Panwar (2021IMT-074)

- Github: [@pawarpranav83](https://github.com/pawarpranav83)
- LinkedIn: [@pranav-pawar](https://www.linkedin.com/in/pranav-pawar-b54954242/)
- Gmail: [mail](mailto:pawar.pranav83@gmail.com)
- Instagram: [@pranav.pawar\_](https://www.instagram.com/pranav.pawar_/)

## Show your support

Give a ⭐️ to this project if you liked it

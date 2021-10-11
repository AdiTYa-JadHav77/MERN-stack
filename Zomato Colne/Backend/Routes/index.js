const express = require("express");

const route = express.Router();

const locationController = require("../Controllers/locations");
const mealTypeController = require("../Controllers/Mealtype");
const restaurantController = require('../Controllers/restaurants');
const menuController = require('../Controllers/menuitems');
const paymentController = require('../Controllers/PaytmGateway');
const userController = require('../Controllers/user');
const orders =require('../Controllers/order');
const contactUs = require('../Controllers/contactUs');
const aboutUs = require('../Controllers/aboutUs');



route.get('/location',locationController.getLocation);
route.get('/mealtype',mealTypeController.getMealtype);
route.get('/restaurants/:locationId',restaurantController.getRestaurantsByLocations);
route.post('/filter',restaurantController.filteredRestaurants);
route.get('/restaurant/:resId',restaurantController.getRestaurantDetailsById);
route.get('/menuitems/:resId',menuController.getMenuItemsByRestaurent);
route.post('/payment',paymentController.payment);
route.post('/callback', paymentController.callback);
route.post('/login',userController.login);
route.post('/signup',userController.signUp);
route.post('/orders',orders.myOrder);
route.post('/contactUs',contactUs.contactUS);
route.post('/addRestaurant',restaurantController.addRestaurant);
route.post('/:resId',restaurantController.Review);
route.get('/previousOrders/:email',orders.previousOrders);
route.get('/aboutUs',aboutUs.about);



module.exports=route;
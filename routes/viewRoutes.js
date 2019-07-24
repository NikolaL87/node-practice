const express = require('express');
const views = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', views.getOverview);
router.get('/tour/:slug', views.getTour);
router.get('/login', views.getLoginForm);

module.exports = router;

const express = require('express');
const views = require('../controllers/viewsController');

const router = express.Router();

router.get('/', views.getOverview);
router.get('/tour/:slug', views.getTour);
router.get('/login', views.getLoginForm);

module.exports = router;

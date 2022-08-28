const middleware = require('@blocklet/sdk/lib/middlewares');
const express = require('express');
const appController = require('../app/platform-api');

const router = express.Router();

router.use('/', middleware.user(), express.Router().get('/tsx', appController.getTxList));

module.exports = router;

var express = require('express');
var router = express.Router();
var gitController = require('../controllers/gitController.js');

/*
 * POST
 */
router.post('/pipeline/:chan_id/:role', gitController.sendDiscordPipeline);
router.post('/mergerequest/:chan_id/:role', gitController.sendDiscordMergeRequest);
router.get('/docker/test/:image', gitController.dockerTest);


module.exports = router;

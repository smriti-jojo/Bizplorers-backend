const express = require('express');
const router = express.Router();
const { sendInvite, getAllInvites } = require('../controllers/inviteController');

router.post('/send-invite', sendInvite);
router.get('/admin/invites', getAllInvites);

module.exports = router;

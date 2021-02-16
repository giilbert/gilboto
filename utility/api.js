const express = require('express');
const { getMessagesSent } = require('./messages');
/**
 * @type { express.Router }
 */
const router = new express.Router();

router.get('/api/messages', (_, res) => {
  res.json({
    messages: getMessagesSent(),
  });
});

module.exports = router;

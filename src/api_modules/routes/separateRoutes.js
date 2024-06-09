const express = require('express');
const router = express.Router();
const { makePayment, captureAuthorizedPayment } = require('../controllers/payments/separatePaymentsController');

router.post('/authorize', makePayment);
router.post('/capture', captureAuthorizedPayment);

module.exports = router;

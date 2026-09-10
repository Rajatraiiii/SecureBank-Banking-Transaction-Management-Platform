const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const accountController = require('../controllers/account.controller');
const router = express.Router();

/**
 * - POST /api/accounts/deposit
 * - create a new account
 * - Protected Route
 */

router.post("/", authMiddleware.authMiddleware, accountController.createAccountController);

/**
 * GET /api/accounts/
 *
 */

router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountController);


/**
 * GET /api/accounts/balance
 */


router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceController);



module.exports = router;


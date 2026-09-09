const { Router}= require('express');

const authMiddleware = require('../middleware/auth.middleware');

const transactionController = require('../controllers/transaction.controller');
const transactionRoutes = Router();

/**
 * POST /api/transactions
 * create a new transaction
 * Protected Route
 */

transactionRoutes.post("/", authMiddleware.authMiddleware, transactionController.createTransaction);

transactionRoutes.post("/system/initial-funds", authMiddleware.authSystemMiddleware, transactionController.createInitialFundsTransaction);
transactionRoutes.post("/system/intial-funds", authMiddleware.authSystemMiddleware, transactionController.createInitialFundsTransaction);

module.exports = transactionRoutes;


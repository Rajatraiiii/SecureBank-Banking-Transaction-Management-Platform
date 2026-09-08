const transactionModel = require('../models/transaction.model');
const ledgerModel = require('../models/ledger.model');
const accountModel = require('../models/account.model');
const emailService = require('../services/email.service');
const mongoose = require('mongoose');

// *
// * 10 steps to create a transaction
// * 1. Validate request body
// * 2. Check if fromAccount and toAccount exist
// * 3. Validate idempotency key
// * 4. Check account status and balance
// * 5. Create a new transaction with status PENDING
// * 6. Create ledger entries for both accounts
// * 7. Update account balances
// * 8. Update transaction status to COMPLETED
// * 9. Send email notifications to both users
// * 10. Return the transaction details
// * /
async function createTransaction(req, res) {
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
            status: "failed"
        });
    }
    const fromuserAccount = await accountModel.findById(fromAccount).populate('userId')
    const touserAccount = await accountModel.findById(toAccount).populate('userId')

    if(!fromuserAccount || !touserAccount){
        return res.status(400).json({
            success: false,
            message: "Invalid from or to account",
            status: "failed"
        });
    }

    /**
     * Validate idempotency key
     * If the idempotency key already exists, return the existing transaction
     */
    const existingTransaction = await transactionModel.findOne({ idempotencyKey: idempotencyKey });
    if (existingTransaction) {
        if(existingTransaction.status === 'COMPLETED'){
            return res.status(200).json({
                success: true,
                message: "Transaction already completed",
                transaction: existingTransaction,
                status: "success"
            });
        }else if(existingTransaction.status === 'PENDING'){
            return res.status(200).json({
                success: true,
                message: "Transaction is still pending",
                transaction: existingTransaction,
                status: "success"
            });
        }else{
            return res.status(200).json({
                success: true,
                message: "Transaction has failed",
                transaction: existingTransaction,
                status: "failed"
            });
        }
        if(existingTransaction.status === 'REVERSED') {
            return res.status(200).json({
                success: true,
                message: "Transaction has been reversed",
                transaction: existingTransaction,
                status: "failed"
            });
        }
    }

    /**
     *. Check account status and balance
     */
    if (fromuserAccount.status !== 'ACTIVE') {
        return res.status(400).json({
            success: false,
            message: "From account is not active",
            status: "failed"
        });
    }

    if (touserAccount.status !== 'ACTIVE') {
        return res.status(400).json({
            success: false,
            message: "To account is not active",
            status: "failed"
        });
    }

    /**
     * 4. Derive sender balance from ledger
     */

    const balance = await fromuserAccount.getBalance()

    if(balance < amount){
        return res.status(400).json({
            success: false,
            message: `Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}`,
            status: "failed"
        })
    }

    /**
     * 5. Create a new transaction 
     */

    const session = await mongoose.startSession();
    session.startTransaction();
    const transaction = new transactionModel({
        fromAccount,
        toAccount,
        amount,
        idempotencyKey,
        status: "PENDING"
    });
    await transaction.save({ session });

    const debitLedgerEntry = await ledgerModel.create([{
        account: fromAccount,
        type: "DEBIT",
        amount: amount,
        transaction: transaction._id
    }], { session });
    
    const creditLedgerEntry = await ledgerModel.create([{
        account: toAccount,
        type: "CREDIT",
        amount: amount,
        transaction: transaction._id
    }], { session });

    transaction.status = "COMPLETED";
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    /**
     * 9. Send email notifications to both users
     */
    

    await emailService.sendTransactionEmail(req.user.email, req.user.name, amount, touserAccount.userId.email, touserAccount.userId.name);

    return res.status(201).json({
        success: true,
        message: "Transaction completed successfully",
        transaction: transaction,
        status: "success"
    });











    
}

module.exports = {
    createTransaction
}


const accountModel = require('../models/account.model');

async function createAccountController(req,res){
    const user = req.user;
    const account = await accountModel.create({
        userId:user._id

    })

    res.status(201).json({
        account
    })

}

async function getUserAccountController(req,res){
    const accounts = await accountModel.find({ userId: req.user._id });

    res.status(200).json({
        accounts
    });
}

async function getAccountBalanceController(req,res){
    const { accountId } = req.params;

    if (!accountId) {
        return res.status(400).json({
            success: false,
            message: "Account ID is required"
        });
    }

    const account = await accountModel.findById(accountId);

    if (!account) {
        return res.status(404).json({
            success: false,
            message: "Account not found"
        });
    }

    if (account.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "This account does not belong to the authenticated user"
        });
    }

    const balance = await account.getBalance();

    return res.status(200).json({
        success: true,
        accountId: account._id,
        balance: balance
    });
}

module.exports = {
    createAccountController,
    getUserAccountController,
    getAccountBalanceController
}

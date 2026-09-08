const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    account:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "Account is required for creating a ledger entry"],
        index: true,
        immutable: true
    },
    amount:{
        type: Number,
        required: [true, "Amount is required for creating a ledger entry"],
        min: [1, "Amount must be greater than 0"],
        immutable: true
    },
    transaction:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: [true, "Transaction is required for creating a ledger entry"],
        index: true,
        immutable: true
    },
    type:{
        type: String,
        enum:{
            values:['CREDIT','DEBIT'],
            message: 'Type can be either CREDIT or DEBIT',
        },
        required: [true, "Type is required for creating a ledger entry"],
        immutable: true
        }
})

function preventLedgerModification(next){
    throw new Error('Ledger entries are immutable and cannot be modified or deleted');
}



ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('deleteOne', preventLedgerModification);
ledgerSchema.pre('remove', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);
ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);



const ledgerModel = mongoose.model('Ledger', ledgerSchema);
module.exports = ledgerModel;

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "From Account is required"],
        index: true
    },
    toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "To Account is required"],
        index: true
    },
    status:{
        type: String,
        enum:{
            values:['PENDING','COMPLETED','FAILED','REVERSED'],
            message: 'Status can be either PENDING, COMPLETED, FAILED or REVERSED',

        },
        default:'PENDING'
    },
    amount:{
        type: Number,
        required: [true, "Amount is required for creating a transaction"],
        min: [1, "Amount must be greater than 0"]

    },
    idempotencyKey:{
        type: String,
        required: [true, "Idempotency Key is required for creating a transaction"],
        unique: [true, "Idempotency Key must be unique for each transaction"],
        index:true
    }
},{ timestamps: true

})

const transactionModel = mongoose.model('Transaction', transactionSchema);
module.exports = transactionModel;






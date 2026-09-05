const moongose = require('mongoose');
function connectDB(){
    moongose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Database connected successfully');
    })
    .catch((err)=>{
        console.log('Error connecting to database', err);
        process.exit(1);
    })
}

module.exports = connectDB;
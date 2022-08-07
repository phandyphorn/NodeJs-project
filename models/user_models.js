require('dotenv').config();
const mongoose = require('mongoose');

// connect to mongodb server
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true });


//check if connection is successfull
const db = mongoose.connection;
db.on("error", console.error.bind(console,
    db.once("open", function() {
        console.log("Connected successfully");
    })
));
// schema of users 

const users_schema = new mongoose.Schema({
        username: {
            type: String

        },
        email: {
            type: String
        },
        password: {
            type: String
           
        }
    })
    //  create collection 
const users_models = mongoose.model('users', users_schema);
module.exports.users_models = users_models;

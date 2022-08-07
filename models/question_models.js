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
// schema of questions 
const questions_schema = new mongoose.Schema({
        question: {
            type: String
        },
        answers: [{ answer: { type: String, required: true }, correct_answer: { type: Boolean, required: true, default: false } },
            { answer: { type: String, required: true }, correct_answer: { type: Boolean, required: true, default: false } },
            { answer: { type: String, required: true }, correct_answer: { type: Boolean, required: true, default: false } },
            { answer: { type: String, required: true }, correct_answer: { type: Boolean, required: true, default: false } }
        ],
        score: {
            type: Number,
            required: true
        }
    })
    // login schema
const login_schema = new mongoose.Schema({
        email: { type: String },
        password: { type: String }

    })
    //  create collection 
const questions_models = mongoose.model('add_questions', questions_schema);
module.exports.questions_models = questions_models;
const login_models = mongoose.model('logins', login_schema);
module.exports.login_models = login_models;



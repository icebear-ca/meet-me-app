const mongoose = require('mongoose');
const connection = "mongodb+srv://kamzTester:kamzTester123@cluster0.a3ifp7t.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));

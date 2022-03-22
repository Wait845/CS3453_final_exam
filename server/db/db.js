// ORM MongoDB Connectivity
const mongoose = require('mongoose');

//Set up default mongoose connection
console.debug(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect("mongodb+srv://vogel:123456@cluster0.7htef.mongodb.net/", {useNewUrlParser: true, useUnifiedTopology: true, dbName:"myFirstDatabase"});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
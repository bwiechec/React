const mongoose = require('mongoose');
const url = "mongodb+srv://mongo1:PQLGE5N2Mnqy3LU@cluster0.pz92h.mongodb.net/weekly_notes?retryWrites=true&w=majority";

console.log(url);

mongoose.connect(url);


const conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = conn;
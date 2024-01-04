const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const mongoDB = "mongodb://127.0.0.1/contact_list1"; 
// var db;
main().catch(err => console.log(err));

async function main() {
   await mongoose.connect(mongoDB);
  console.log(' db is connected');
}

// module.exports=db;
const mongoose = require("mongoose");
const configureDB = () => {
    mongoose

        .connect("mongodb+srv://devTest:Thejas1234@devpodium.pxfcq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        .then(() => {
            console.log("connected to dataBase");
        })
        .catch((err) => {
            console.log("err in connecting", err);
        });
};
module.exports = configureDB;
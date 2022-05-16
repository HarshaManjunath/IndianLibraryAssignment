"use strict";
module.exports = function (app) {
    var lib = require("../controller/addCtrls");
    app.route("/addLibrary").post(lib.addLibrary);
    app.route("/fetchLibrary").get(lib.fetchLibrary);
    app.route("/updateLibrary").put(lib.updateLibrary);
    app.route("/deleteLibrary").delete(lib.deleteLibrary);
    app.route("/listLibrary").get(lib.listLibrary);
    app.route("/listBookByid").get(lib.listBookByid)
};

const addLibrary = require("../model/addLibrary");
var moment = require("moment");

exports.addLibrary = async (req, res, next) => {
    try {
        const addlibrary = new addLibrary({
            name: req.query.name,
            published: req.query.published,
            author: req.query.author,
            domain: req.query.domain,
            isAvailable:
                moment(req.query.availabilityDate).format("yyyy/mm/dd") <
                    moment(Date.now()).format("yyyy/mm/dd")
                    ? false
                    : true,
            //from particular date the book is avail
            availabilityDate: req.query.availabilityDate,
        });
        addlibrary.save();
        res.status(200).json({ status: "Success", data: addlibrary });
    } catch (err) {
        console.log(err);
    }
};
exports.fetchLibrary = async (req, res, next) => {
    try {
        var istrue = [];
        const data = [];
        // console.log(req.query.name)
        if (
            req.query.name === undefined &&
            req.query.author === undefined &&
            req.query.published === undefined
        ) {
            res.status(200).json({
                status: "Failed",
                data: "Please send name/author/published year",
            });
        } else if (req.query.name === undefined && req.query.author === undefined) {
            istrue = await addLibrary.find({
                published: req.query.published,
            });
        } else if (
            req.query.name === undefined &&
            req.query.published === undefined
        ) {
            istrue = await addLibrary.find({
                author: req.query.author,
            });
        } else if (
            req.query.author === undefined &&
            req.query.published === undefined
        ) {
            istrue = await addLibrary.find({
                name: req.query.name,
            });
        }

        for (let i = 0; i < istrue.length; i++) {
            data.push({
                name: istrue[i].name,
                published: istrue[i].published,
                author: istrue[i].author,
                domain: istrue[i].domain,
                isAvailable: istrue[i].isAvailable,
            });
        }
        res.status(200).json({ status: "Success", data: data });
    } catch (err) {
        console.log(err);
    }
};
exports.updateLibrary = async (req, res, next) => {
    try {
        const istrue = await addLibrary.updateOne(
            {
                _id: req.query._id,
            },
            {
                $set: {
                    availabilityDate: req.query.availabilityDate,
                    isAvailable:
                        moment(req.query.availabilityDate).format("yyyy/mm/dd") <
                            moment(Date.now()).format("yyyy/mm/dd")
                            ? false
                            : true,
                    name: req.query.name,
                    published: req.query.published,
                    author: req.query.author,
                    domain: req.query.domain,

                },
            }
        );
        res.status(200).json({ status: "success", data: istrue });
    } catch (err) {
        console.log(err);
    }
};
exports.deleteLibrary = async (req, res, next) => {
    try {
        const istrue = await addLibrary.deleteOne({ _id: req.query.id });
        res.status(200).json({ status: "Deleted successfully" });
    } catch (err) {
        console.log(err);
    }
};
exports.listLibrary = async (req, res, next) => {
    try {
        var data = [];
        const istrue = await addLibrary.find({});
        if (istrue.length === 0) {
            res.status(200).json({ status: "Failed", data: "No data found" });
        }
        for (let i = 0; i < istrue.length; i++) {
            data.push({
                name: istrue[i].name,
                published: istrue[i].published,
                author: istrue[i].author,
                domain: istrue[i].domain,
                isAvailable: istrue[i].isAvailable,
                availabilityDate: istrue[i].availabilityDate,
                _id: istrue[i]._id,
            });
        }
        res.status(200).json({ status: "Success", data: data });
    } catch (err) {
        console.log(err);
    }
};
exports.listBookByid = async (req, res, next) => {
    try {
        var data = [];
        const istrue = await addLibrary.find({ _id: req.query.book_id });
        if (istrue.length === 0) {
            res.status(200).json({ status: "Failed", data: "No data found" });
        }
        for (let i = 0; i < istrue.length; i++) {
            data.push({
                name: istrue[i].name,
                published: istrue[i].published,
                author: istrue[i].author,
                domain: istrue[i].domain,
                isAvailable: istrue[i].isAvailable,
                availabilityDate: istrue[i].availabilityDate,
                _id: istrue[i]._id,
            });
        }
        res.status(200).json({ status: "Success", data: data });
    } catch (err) {
        console.log(err);
    }
};

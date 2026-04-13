const mongose = require("mongoose");

const menuSchema = new mongose.Schema({
    name : {
        type : String,
    },

    description: {
        type : String,
    },

    price : {
        type : Number,
    },

    photo : {
        type : String,
    },
})

const Menu = mongose.model("Menu", menuSchema);
module.exports = Menu;
import { Schema, model } from "mongoose";

const companySchema = Schema({
    name: {
        type: String,
        required: true
    },
    impact :{
        type: String,
        required: true
    },
    trayectory: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Company", companySchema)
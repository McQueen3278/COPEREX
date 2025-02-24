import { Schema, model } from "mongoose";

const userSchema = Schema({
    username: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE","USER_ROLE"],
        default: "USER_ROLE"
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

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)

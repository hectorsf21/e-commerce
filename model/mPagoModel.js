import mongoose from "mongoose";

const mPagoModel = new mongoose.Schema({
    name_banco:{
        type:String
    },
    field_custom:{
        type:Array
    },
})

export default mongoose.models.metodoPago || mongoose.model('metodoPago', mPagoModel )
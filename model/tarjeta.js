import mongoose from "mongoose";

const tarjetaModel = new mongoose.Schema({
    tarjeta_credito:{
        type:Boolean,
        default: false,
    },
})

export default mongoose.models.tarjetaCredito || mongoose.model('tarjetaCredito', tarjetaModel)
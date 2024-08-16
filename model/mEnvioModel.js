import mongoose from "mongoose";

const mEnvioModel = new mongoose.Schema({
    envio_name:{
        type:String
    },
})

export default mongoose.models.metodoEnvio || mongoose.model('metodoEnvio', mEnvioModel)
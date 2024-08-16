import mongoose from "mongoose";

const ordersModel = new mongoose.Schema({
    client_name:{
        type:String
    },
    client_email:{
        type:String
    },
    client_mobile:{
        type:String
    },
    banco_pago:{
        type:String
    },
    tarjeta_pago:{
        type:String
    },
    client_transaccion:{
        type:String
    },
    empresa_envio:{
        type:String
    },
    direccion_envio:{
        type:String
    },
    ciudad_envio:{
        type:String
    },
    persona_recibe:{
        type:String
    },
    identificacion_recibe:{
        type:String
    },
    telefono_recibe:{
        type:String 
    },
    monto_pago:{
        type:String 
    },
    car:{
        type:Array
    }

})

export default mongoose.models.ordenes || mongoose.model('ordenes', ordersModel )
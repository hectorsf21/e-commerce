import mongoose from "mongoose";

const productShema = new mongoose.Schema({
    product_name:{
        type:String
    },
    product_description:{
        type:String
    },
    product_category:{
        type:String
    },
    propiedades:{
        type:Object
    },
    product_price:{
        type:String
    },
    product_photo:{
        type:Array
    }
})

export default mongoose.models.product || mongoose.model('product', productShema)
const mongoose=require('mongoose')
const validator=require('validator')

const productSchema=new mongoose.Schema({
    pname:{
        type:String,
        required:true,
        trim:true 
    },
    sid:{
        type:Number,
        required:true
    },
    pdescription:{
        type:String,
        trim:true,
        default:'No description available for this product'
    },
    pprice:{
        type:Number,
        required:true

    },
   // pcolor:[String],
    pcategory:{
        type:String,
        required:true,
        trim:true
    }


})

const Product=mongoose.model('Product',productSchema)


module.exports=Product
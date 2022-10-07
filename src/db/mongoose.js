const mongoose=require('mongoose')

const dbUrl=
"mongodb+srv://root:root@cluster0.cdvgjm6.mongodb.net/ecommerce?retryWrites=true&w=majority"

const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(dbUrl,connectionParams)
.then(()=>{
    console.log("Connected to the DB")
})
.catch((e)=>{
    console.log("Error:",e)
})

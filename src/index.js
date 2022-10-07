require('../src/db/mongoose')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const Product=require('../src/models/product')


const express=require('express')
const app=express()


const port=3000
const productRoute=require('../src/routers/product')
app.use(express.json())


// Extended: https://swagger.io/specification/#infoObject

const swaggerOptions = {
    swaggerDefinition: {
      openapi:"3.0.0",  
      info: {
        version: "1.0.0",
        title: "Product API",
        description: "Product API Information",
        contact: {
          name: "Amazing Developer"
        },
        servers: ["http://localhost:3000"]
      }
    },
    // ['.routes/*.js']
    apis: ["./routers/product.js"]
  };
  

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(productRoute)


app.listen(port,(req,res)=>{
    console.log('Running...')
})





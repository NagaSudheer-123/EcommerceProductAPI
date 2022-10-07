
const express=require('express')
const Product=require('../models/product')
const router=new express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *      productSchema:
 *       type: object
 *       required:
 *         - name
 *         - sid
 *         - category
 *         - price
 * 
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         pname:
 *           type: string
 *           description: The name of the product
 *      
 *         sid:
 *           type: number
 *           description: the product seller
 *         pcategory:
 *           type: string
 *           description: The category of the product 
 *         pprice:
 *           type: number
 *           description: The price of the product
 *         pdescription:
 *           type: string
 *           description: The description of the product
 *       example:
 *         sid: 1000
 *         pdescription: This is a brand new product
 *         pname: Lenovo Thinkpad
 *         pprice: 99999
 *         pcategory: Electronics 
 *         
 * 
 */

 /**
  * @swagger
  * tags:
  *   name: Products
  *   description: The Ecommerrce Product API
  */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/productSchema'
 *                 
 */

router.get('/products',async (req,res)=>{

    try{
        const products=await Product.find({}) 
        res.status(200).send(products)
    }
    catch(e){
        res.status(400).send(e)

    }
})


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product was found
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productSchema'
 *       404:
 *         description: The product was not found
 */




router.get('/products/:id',async (req,res)=>{
 
    const _id=req.params.id
    try{
       
        const product=await Product.findById(_id)

        if(!product){
            return res.status(404).send()
        }

        res.status(200).send(product)

    }
    catch(e){
        res.status(500).send(e)

    }


})


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productSchema'
 *     responses:
 *       201:
 *         description: The Product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productSchema'
 *       500:
 *         description: Some server error
 */

router.post('/products',async (req,res)=>{
    
    const prod=new Product(req.body)

    try{
        await prod.save()
        res.status(201).send(prod)

    }catch(e){
        res.status(400).send(e)
    }

    
})



/**
 * @swagger
 * /products/{id}:
 *  patch:
 *    summary: Update the product by the id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/productSchema'
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/productSchema'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Some error happened
 */


router.patch('/products/:id',async (req,res)=>{
    const _id=req.params.id

    const updates= Object.keys(req.body)
    const allowedUpdates=['pname','pdescription','sid','pprice','pcategory']

    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates'})
    }

    try{

        const product=await Product.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        if(!product){
            return res.status(404).send()
        }
        res.send(product)

    }
    catch(e){
        res.status(400).send(e)
    }
})


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 * 
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */


router.delete('/products/:id',async (req,res)=>{
    const _id=req.params.id

    try{
        const product=await Product.findByIdAndDelete(_id)

        if(!product){
            return res.status(404).send()
        }
        res.status(200).send("Record was deleted")
    }
    catch(e){
        res.status(500).send(e)
    }
  

})


module.exports=router
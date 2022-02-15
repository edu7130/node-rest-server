const path = require('path')
const fs   = require('fs')
const https = require('https');

const { response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { uploadFile: uploadFileHelper } = require('../helpers');
const { User, Product } = require("../models");
const { Http2ServerRequest } = require('http2');


const uploadFile = async (req, res = response) => {
    try{
        console.log('UPLOADING FILE');
        const name = await uploadFileHelper(req.files,[ 'png', 'jpg', 'jpeg', 'gif'],'png')
        res.json({ name })
    }
    catch(error){
        res.status(400).json({error})
    }
    
}

const uploadImage = async (req, res = response) => {
    const { collection, id } = req.params

    let model;

    console.log('Subiendo archivo');
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            break;
        case 'products':
            model = await Product.findById(id)
            break;
        default:
            return res.status(500).json({
                msg: 'Function not implemented yet'
            });
    }

    if(model.img){
        const imagePath = path.join(__dirname, '../uploads', collection, model.img)
        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath)
        } 
    }

    const name = await uploadFileHelper(req.files,[ 'png', 'jpg', 'jpeg', 'gif'],collection)

    model.img = name
    await model.save()

    res.json(model)
}

const getImage = async (req, res = response) => {
    const { collection, id } = req.params

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            break;
        case 'products':
            model = await Product.findById(id)
            break;
        default:
            return res.status(500).json({
                msg: 'Function not implemented yet'
            });
    }
    if(model.img){
        const imagePath = path.join(__dirname, '../uploads', collection, model.img)
        if(fs.existsSync(imagePath)){
            return res.sendFile(imagePath)
        } 
    }
    const placeholderPath = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(placeholderPath)
}


/*
 * CLOUDNARY
 */

const uploadImageCloudinary = async (req, res = response) => {
    const { collection, id } = req.params

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            break;
        case 'products':
            model = await Product.findById(id)
            break;
        default:
            return res.status(500).json({
                msg: 'Function not implemented yet'
            });
    }

    if(model.img){
        const imgSplitted = model.img.split('/')
        const [ public_name ] = imgSplitted[imgSplitted.length - 1].split('.')
        await cloudinary.uploader.destroy(public_name)
    }

    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    model.img = secure_url
    await model.save()

    res.json(model)
}

const getImageCloudinary = async (req, res = response) => {
    const { collection, id } = req.params

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            break;
        case 'products':
            model = await Product.findById(id)
            break;
        default:
            return res.status(500).json({
                msg: 'Function not implemented yet'
            });
    }
    if(model.img){
        
        //return res.sendFile(file_reader.path)
    }
    const placeholderPath = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(placeholderPath)
}




module.exports = {
    uploadFile,
    uploadImage,
    uploadImageCloudinary,
    getImage,
    getImageCloudinary
}
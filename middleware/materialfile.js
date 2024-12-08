/*
const path = require('path');
const fs = require('fs');
const fileStorage = require('../models/file(ud)');

const downloadMiddleware = (req, res, next) => {
  const { filename } = req.body;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }

    // Proceed with download
    res.download(filePath, filename, async  (err) => {
      if (err) {
        res.status(500).send('Error downloading the file');
      } else{
        let filestore = new fileStorage({
            path:filePath
        });
        filestore= await filestore.save();
        req.filesdetail = filestore;
        next();
      }
    });
  });
};
*/

const path= require('path');
const uploadHandler = require('./help/filehelp');
const fileStorage = require('../models/file(ud)');
const multer = require('multer');
const Material = require('../models/material');
const Submition = require('../models/submit');

const uploadMiddleware = async (req,res,next) =>{
  console.log('inside');
  uploadHandler(req,res,async function(err){
    if(err instanceof multer.MulterError){
      if(err.code == 'LIMIT_FILE_SIZE'){
        return res.json({msg:"error1"});
      }
      return res.json({msg:err.code});
    }
    
    else{
      console.log(req.filepath);
      let filestore = new fileStorage({
        path:req.filepath
      });
      filestore= await filestore.save();
      req.filesdetail = filestore;
      next();
    }
  });
}

const downloadMiddleware = async (req,res,next) =>{
  const matid = req.params.id;
  if(!matid) return res.status(401).json({msg:"id required"});
  try {
    const matdetail = await Material.findById(matid);
    const filesdetail = await fileStorage.findById(matdetail.fileid);
    req.filesdetail = filesdetail;
    next();
  } catch (e) {

  }
}

const downloadMiddlewaresubmit = async (req,res,next) =>{
  const submitid = req.params.id;
  if(!submitid) return res.status(401).json({msg:"id required"});
  try {
    const submition = await Submition.findById(submitid);
    const filesdetail = await fileStorage.findById(submition.fileid);
    req.filesdetail = filesdetail;
    next();
  } catch (e) {

  }
}
module.exports = {uploadMiddleware,downloadMiddleware,downloadMiddlewaresubmit};

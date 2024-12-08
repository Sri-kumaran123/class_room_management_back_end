const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    const uploadDir = path.resolve(process.cwd(), './public/images');
    req.uploadDir = uploadDir; // Save the directory path in the request object if needed
    cb(null, uploadDir);
  },
  // Set the uploaded file's name
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedFileName = `${timestamp}-${file.originalname}`;
    req.filepath = path.resolve(req.uploadDir, sanitizedFileName);
    console.log(req.filepath); // Store the full path in req.filepath
    cb(null, sanitizedFileName);
  },
});

// Allow all file types
const fileFilter = (req, file, cb) => {
  cb(null, true); // Accept any file type
};

// Initialize upload middleware
const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter, 
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit (adjust as needed)
});
let uploadHandler = upload.single('file');
module.exports = uploadHandler;

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/image-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  },
}).single('image');

// Upload endpoint
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      return res.status(400).json({ message: err });
    }

    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imagePath = req.file.path;

    // Run Python script for OCR
    exec(`python ocr_script.py ${imagePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing Python script:', stderr);
        return res.status(500).json({ error: 'Error extracting text' });
      }

      const result = JSON.parse(stdout);
      const extractedText = result.text;

      console.log('Extracted text:', extractedText);
      
      // Store the extracted text in MongoDB
      const newImage = new Image({
        filename: req.file.filename,
        text: extractedText,
        mrzData: null,  // Handle MRZ if needed
      });

      newImage.save()
        .then(() => res.json({ message: 'Image uploaded and text extracted', newImage }))
        .catch(err => {
          console.error('Error saving to database:', err);
          res.status(500).json({ error: 'Error saving to database' });
        });
    });
  });
});

// Define your Image schema and other endpoints (GET, DELETE) here

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

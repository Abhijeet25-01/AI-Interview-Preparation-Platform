const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const app = express();
const PORT = 5000;

app.use(cors());

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
  });
});

// Upload + Extract PDF Text
app.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const filePath = req.file.path;

    const pdfBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(pdfBuffer);

    res.json({
      message: "Resume uploaded successfully",
      originalName: req.file.originalname,
      fileName: req.file.filename,
      size: req.file.size,
      extractedText: pdfData.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to process PDF",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const calculateATS = require("./services/atsService");

const cse = require("./data/departments/cse");
const mechanical = require("./data/departments/mechanical");
const civil = require("./data/departments/civil");
const electrical = require("./data/departments/electrical");
const extc = require("./data/departments/extc");
const production = require("./data/departments/production");
const chemical = require("./data/departments/chemical");
const biomedical = require("./data/departments/biomedical");

const departments = {
  cse,
  mechanical,
  civil,
  electrical,
  extc,
  production,
  chemical,
  biomedical,
};

const app = express();
const PORT = 5000;

app.use(cors());

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

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
  });
});

app.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const { department, role } = req.body;

    if (!department || !role) {
      return res.status(400).json({
        message: "Department and role are required",
      });
    }

    const selectedDepartment = departments[department];

    if (!selectedDepartment) {
      return res.status(400).json({
        message: "Invalid department",
      });
    }

    const roleSkills = selectedDepartment.roles[role];

    if (!roleSkills) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const filePath = req.file.path;

    const pdfBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(pdfBuffer);

    const atsResult = calculateATS(
      pdfData.text,
      roleSkills
    );

    res.json({
      message: "Resume analyzed successfully",
      originalName: req.file.originalname,
      fileName: req.file.filename,
      size: req.file.size,
      extractedText: pdfData.text,

      department,
      role,

      atsScore: atsResult.atsScore,
      matchedSkills: atsResult.matchedSkills,
      missingSkills: atsResult.missingSkills,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to process resume",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
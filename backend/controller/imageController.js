const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const multer=require("multer")
async function convertImage(req, res) {
  const inputPath = req.file.path;
  const targetFormat = req.body.format;
  const outputDir = path.join(__dirname, "../converted");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const outputPath = path.join(outputDir, `${Date.now()}.${targetFormat}`);
  try {
    await sharp(inputPath)
      .toFormat(targetFormat)
      .toFile(outputPath);

    // Optionally, send the converted file or its URL

    res.json({ message: "Conversion successful", file: `/converted/${path.basename(outputPath)}` });
    console.log("conversion successful",  `/converted/${path.basename(outputPath)}` );
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Conversion failed");
  }
}

module.exports = convertImage ;
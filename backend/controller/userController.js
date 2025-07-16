const { PrismaClient } = require("../generated/prisma");
const Prisma = new PrismaClient();

async function getURL(req, res, next) {
    console.log("=== CONTROLLER START ===");
    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);
    console.log("Body type:", typeof req.body);
    
    const { imgURL, videoURL } = req.body;
    console.log("Extracted imgURL:", imgURL);
    console.log("Extracted videoURL:", videoURL);
    
    if (!imgURL && !videoURL) {
        console.log("ERROR: No URLs provided");
        return res.status(400).json({ error: "imgURL or videoURL required" });
    }
    
    try {
        console.log("Attempting to create database record...");
        console.log("Data to insert:", { imgURL, videoURL });
        
        const upload = await Prisma.user.create({
            data: {
                imgURL,
                videoURL,
            },
        });
        
        console.log("SUCCESS: Database record created:", upload);
        console.log("=== CONTROLLER END SUCCESS ===");
        res.json(upload);
    } catch (error) {
        console.log("ERROR: Database operation failed");
        console.log("Error details:", error);
        console.log("Error code:", error.code);
        console.log("Error message:", error.message);
        console.log("=== CONTROLLER END ERROR ===");
        
        res.status(500).json({
            error: "Failed to save URLs",
            details: error.message // Add error details for debugging
        });
    }
}

module.exports = getURL;
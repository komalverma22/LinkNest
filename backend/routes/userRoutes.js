const express=require("express")
const router=express.Router();
const getURL=require("../controller/userController")
const convertImage = require("../controller/imageController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/upload",getURL);
// router.post("/convert",convertImage)
router.post("/convert", upload.single("file"), convertImage);
module.exports=router;
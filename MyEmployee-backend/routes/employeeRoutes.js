const express=require("express");
const multer= require("multer");



//const upload = multer({ dest: 'uploads/' })

  //=====================================================
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../MyEmployee-frontend/employee_frontend_vite/public/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null,uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage });
  //=====================================================

const router=express.Router();
const {getEmployee, getEmployeeById, createEmployee, updateEmployee, deleteEmployee}=require("../controllers/employeeController.js");
const validateToken = require("../middleware/validateTokenHandler.js");


router.use(validateToken);

router.route("/").get(getEmployee)

router.route("/").post(upload.single("image"),createEmployee)

router.route("/:id").put(upload.single("image"),updateEmployee)

router.route("/:id").delete(deleteEmployee)

router.route("/:id").get(getEmployeeById)
module.exports=router;
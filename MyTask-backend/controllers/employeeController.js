const asyncHandler=require("express-async-handler");
const Employee=require("../models/employeeModel.js");
//const multer =require("multer");

//@desc Get all employee
//@route GET /api/employees
//@access private

const getEmployee=asyncHandler(async(req,res)=>{
    const employee=await Employee.find();
    res.status(200).json(employee)
})

//@desc Get employee by Id
//@route GET /api/employee/1
//@access private
const getEmployeeById=asyncHandler(async(req,res)=>{
   const employee= await Employee.findById(req.params.id);
    if(!employee){
        res.status(404);
        throw new Error("Employee not found");
    }
    res.status(200).json(employee)
})

//==========================================================================

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null,uniqueSuffix+file.originalname)
//     }
//   })
  
//   const upload = multer({ storage: storage });

//===========================================================================

//@desc Create employee
//@route POST /api/employee
//@access private

const createEmployee=  async(req,res)=>{

   

     const {id, name, email, mobileNo, designation, gender, course}=req.body;
    //  if(!id || !name || !email || !mobileNo || !designation || !gender || !course){
    //     res.status(400);
    //     throw new Error("All fields are mandatory");
    // }
    
    
     // Check if an image file was uploaded
    // if (!req.file) {
    //     res.status(400);
    //     throw new Error("Image is required");
    // }

    const imageName=req.file.filename;

    try{
        
        const employee= await Employee.create({
            id,
            name, //name:req.body.name
            email,//email:req.body.email
            mobileNo,
            designation,
            gender,
            course,
            image:imageName
             
         })
        res.status(201).json({ message:`The details for ${employee.name} is successfully saved` })

    }catch(err){
        res.json({status :error});
    }
    //res.status(201).json({ employee:"Its again running" })
}


//@desc Update employee
//@route PUT /api/employee/1
//@access private
const updateEmployee = async(req,res)=>{
    console.log(req.params.id)
    const employee = await Employee.findById(req.params.id);
    if(!employee){
        res.status(404);
        throw new Error("Employee not found, what to do");
    }
    
    const updatedEmployee= await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json({ message:`The details for ${updatedEmployee.name} is successfully updated` })
}

//@desc Delete employee
//@route DELETE /api/employee/1
//@access private
const deleteEmployee=asyncHandler(async(req,res)=>{
    const employee= await Employee.findById(req.params.id);
    if(!employee){
        res.status(404);
        throw new Error("Contact not found");
    }

    await Employee.deleteOne({_id:req.params.id});
    res.status(200).json({message:`Employee deleted with ID ${req.params.id}`});
})

module.exports={getEmployee,getEmployeeById,createEmployee,updateEmployee,deleteEmployee}

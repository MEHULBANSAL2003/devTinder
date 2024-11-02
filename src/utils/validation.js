const validator=require("validator");


const validateSignUpData=(req)=>{

    const {firstName,lastName,emailId,password}=req.body;

     if(!firstName||!lastName){
        throw new Error("Name is not valid!");
     }
     
     if(firstName.length<4||firstName.length>50){
        throw new Error("First Name should contain 4-50 characters")
     }

     if(!validator.isEmail(emailId)){
        throw new Error("enter the valid email address")
     }

     if(!validator.isStrongPassword(password)){
        throw new Error("enter the strong password");
     }
        
}

const validateLoginData=(req)=>{

   if(!validator.isEmail(req.body.emailId)){
      throw new Error("enter the valid email address")
   }

}

const validateProfileEditData=(req)=>{

   
   const allowedEditFeilds=["firstName","lastName","photoUrl","age","about","gender","skills"];

   const isEditAllowed= Object.keys(req.body).every(field=>allowedEditFeilds.includes(field));

  
   return isEditAllowed;

}

const validateEditPassword=(req)=>{
   if(!req.body.password){
      throw new Error("please enter the password");
   }
   
   const {password}=req.body;

   if(!validator.isStrongPassword(password)){
      throw new Error("enter the strong password");
   } 


}

module.exports={validateSignUpData,validateLoginData,validateProfileEditData,validateEditPassword};
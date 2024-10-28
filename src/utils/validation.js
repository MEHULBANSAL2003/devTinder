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

module.exports={validateSignUpData,validateLoginData};
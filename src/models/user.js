const mongoose=require("mongoose");

const {Schema}=mongoose;


const userSchema= new Schema({

    firstName:{
        type: String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,

    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
        
    },
    gender:{
          type:String,
          // validate method will be called only when the new document is created
          // on updating existing document it does not check for the validations
          validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
          }
    },
    photoUrl:{
        type:String,
        default:"https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-4382.jpg",
    },
    about:{
        type:String,
        default: "This is the default description of the user"
    },
    skills:{
        type:[String],
    },





},{timestamps:true});


const User=mongoose.model("User",userSchema);


module.exports=User;
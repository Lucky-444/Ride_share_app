const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name : {
      type : String , 
      required : true , 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role:{
      type : String,
      enum : ['driver', 'passenger'],
    },
    location : {
      type : {
        type : String,
        enum : ['point'],
        default : "point"
      },
      coordinates : {
        type : [Number],
        default : [0 , 0],
      }
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true },
);

//This is a Pre Save Middleware That runs Before a document is saved to the DB 
userSchema.pre('save' , async function(next){
  //checking password feild is already Modified Or not
  if(!this.isModified('password')){
    return next();
  }

  this.password = await bcrypt.hash(password , 10);
  next();
})



// userSchema.statics.hashPassword = async function (password) {
//   return await bcrypt.hash(password, 10);
// };

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

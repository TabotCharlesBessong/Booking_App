
import {ObjectId, Schema} from 'mongoose'

interface UserDocument {
  name:string
  email:string
  password:string
  verified:boolean
  // having the url and public id because we will store our images on cloud, so as not to use to much space from MongoDB. So the image will be accessed with the url and recongnised by the publicId which will be unique
  avatar?: {url:string;publicId:string} 
  // tokens are strings because tokens will be added everytime a user logs in, though they will be cleared when a user logs out, a user can still login from multiple devices therefore having many tokens
  tokens:string[]
  bookings:ObjectId[]
}

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar:{
    type:Object,
    url:String,
    publicId:String
  },
  verified:{
    type:Boolean,
    default:false
  },
  bookings:[
    {
      type:Schema.Types.ObjectId,
      ref:"Booking"
    }
  ]
});
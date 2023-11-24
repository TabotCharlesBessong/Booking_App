import { isValidObjectId } from "mongoose";
import * as yup from "yup"

export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing")
    .min(3, "Name is too short!")
    .max(20, "Name is too long!"),
  email: yup.string().email("Invalid email").required("Email is missing"),
  password: yup
    .string()
    .trim()
    .required("Password is missing")
    .min(8, "password is too short!")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password is too simple!"
    ),
});

export const EmailValidationSchema = yup.object().shape({
  token:yup.string().trim().required("A valid token is required"),
  userId:yup.string().transform(function (value) {
    if(this.isType(value) && isValidObjectId(value)){
      return value
    }else {
      return ""
    }
  }).required("Invalid User id")
})
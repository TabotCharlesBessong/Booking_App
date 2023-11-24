
const {env} = process as {env:{[key:string]:string}}


export const {
  MONGO_URI,
  MAILTRAP_USER,
  MAILTRAP_PASS,
  VERIFICATION_MAIL,
  PASSWORD_RESET_LINK,
  VERIFICATION_EMAIL,
  SIGN_IN_URL
} = env;
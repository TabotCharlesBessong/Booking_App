import path from "path";
import { generateMailTransporter } from "./mail";
import { generateTemplate } from "./template";
import { Profile } from "../../types";

const VERIFICATION_EMAIL = process.env.VERIFICATION_EMAIL as string

export const sendVerificationEmail = async (
  token: string,
  profile: Profile
) => {
  const transport = generateMailTransporter();
  const { name, email, userId } = profile;
  const welcomeMessage = `Hi ${name}, welcome to BookingApp! There are so much thing that we do for verified users. Use the link below to verify your account.`;

  transport.sendMail({
    to:email,
    from:VERIFICATION_EMAIL,
    subject:"Welcome Message",
    html: generateTemplate({
      title:"Welcome to our app",
      message:welcomeMessage,
      logo:"cid:logo",
      banner:"cid:welcome",
      link:"#",
      btnTitle:"verify"
    }),
    attachments:[
      {
        filename:"logo.png",
        path:path.join(__dirname,"../mail/logo.png"),
        cid:"logo"
      },
      {
        filename:"welcome.png",
        path:path.join(__dirname,"../mail/welcome.png"),
        cid:"welcome"
      }
    ]
  })
};

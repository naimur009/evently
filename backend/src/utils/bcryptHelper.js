import bcrypt from "bcryptjs";

export const encodePassword = async (password)=>{
    return await bcrypt.hash(password, 10);
}

export const decodePassword = async (userPassword, dbPassword)=>{
    return await bcrypt.compare(userPassword, dbPassword)
}
import { loginServices, logoutServices, signUpServices, singleTicketService, userTicketServices, verifyUserServices } from "../services/userServices.js";


export const signUpController = async(req, res) =>{
    const result = await signUpServices(req, res);
    return res.status(200).json(result);
}

export const verifyUserController = async(req, res) =>{
    const result = await verifyUserServices(req, res);
    return res.status(200).json(result);
}

export const loginController = async(req, res) =>{
    const result = await loginServices(req, res);
    return res.status(200).json(result);
}

export const userTicketController = async (req, res) =>{
    const result = await userTicketServices(req, res);
    return res.status(200).json(result);
}

export const singleTicketController = async (req, res) =>{
    const result = await singleTicketService(req, res);
    return res.status(200).json(result);
}


export const logoutController = (req, res) =>{
    const result = logoutServices(req, res);
    return res.status(200).json(result);
}



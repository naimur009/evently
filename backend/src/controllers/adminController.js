import { createCouponServices, createEventServices, deleteCouponServices, deleteEventServices, deleteUserServices, salesReportServices, singleUserDetailsServices, updateEventServices, updateUserDetailsServices, userDetailsServices } from "../services/adminServices.js";

export const createEventController = async(req, res) =>{
    const result = await createEventServices(req);
    return res.status(200).json(result);
}

export const updateEventController = async(req, res) =>{
    const result = await updateEventServices(req);
    return res.status(200).json(result);
}

export const deleteEventController = async(req, res) =>{
    const result = await deleteEventServices(req);
    return res.status(200).json(result);
}

export const salesReportController = async(req, res) =>{
    const result = await salesReportServices(req);
    return res.status(200).json(result);
}

export const createCouponController = async(req, res) =>{
    const result = await createCouponServices(req);
    return res.status(200).json(result);
}

export const deleteCouponController = async(req, res) =>{
    const result = await deleteCouponServices(req);
    return res.status(200).json(result);
}

export const userDetailsController = async(req, res) =>{
    const result = await userDetailsServices(req);
    return res.status(200).json(result);
}

export const singleUserDetailsController = async(req, res) =>{
    const result = await singleUserDetailsServices(req);
    return res.status(200).json(result);
}


export const updateUserDetailsController = async(req, res) =>{
    const result = await updateUserDetailsServices(req);
    return res.status(200).json(result);
}

export const deleteUserController = async(req, res) =>{
    const result = await deleteUserServices(req);
    return res.status(200).json(result);
}
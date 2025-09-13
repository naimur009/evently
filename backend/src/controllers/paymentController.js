import { couponServices, paymentCancelService, paymentFailedService, paymentService, paymentSuccessService } from "../services/paymentService.js";

export const paymentController = async(req, res) =>{
    const result = await paymentService(req, res);
    return res.status(200).json(result);
}


export const paymentSuccessController = async(req, res) =>{
    const result = await paymentSuccessService(req, res);
    if(result.status == "success"){
        res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
        return
    }
    return res.status(200).json(result);
}


export const paymentFailedController = async(req, res) =>{
    const result = await paymentFailedService(req, res);
    if(result.status == "success"){
        res.redirect(`${process.env.FRONTEND_URL}/payment-error`);
        return
    }
    return res.status(200).json(result);
}

export const paymentCancelController = async(req, res) =>{
    const result = await paymentCancelService(req, res);
    if(result.status == "success"){
        res.redirect(`${process.env.FRONTEND_URL}/payment-cancel`);
        return
    }
    return res.status(200).json(result);
}

export const couponController = async(req, res) =>{
    const result = await couponServices(req, res);
    return res.status(200).json(result);
}

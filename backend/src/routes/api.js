import express from "express";
import { allEvents, categoryController, singleEvents } from "../controllers/eventsController.js";
import { authVerification } from '../middlewares/authMiddleware.js';
import { loginController, logoutController, signUpController, singleTicketController, userTicketController, verifyUserController } from "../controllers/userController.js";
import { ticketAvaiablityCheck } from "../middlewares/ticketMiddleware.js";
import { couponController, paymentCancelController, paymentController, paymentFailedController, paymentSuccessController } from "../controllers/paymentController.js";
import { authorization } from "../middlewares/rolesMiddleware.js";
import { createCouponController, createEventController, deleteCouponController, deleteEventController, deleteUserController, salesReportController, singleUserDetailsController, updateEventController, updateUserDetailsController, userDetailsController } from "../controllers/adminController.js";

const router = express.Router();



// public api
router.get('/events/', allEvents)
router.get('/events/:eventID', singleEvents)
router.get('/category', categoryController)



// privet api
// user
router.post("/signup", signUpController);
router.get("/verifyuser/:email/:otp", verifyUserController);
router.post("/login", loginController);
router.post("/logout", authVerification, logoutController);
router.get("/myticket", authVerification, userTicketController);
router.get("/myticket/:ticketID", authVerification,singleTicketController);


// ticket
router.post("/ticket/purchase", authVerification, ticketAvaiablityCheck, paymentController);


// payment api
router.post("/success/:tran_id", paymentSuccessController);
router.post("/fail/:tran_id", paymentFailedController);
router.post("/cancel/:tran_id", paymentCancelController);


// admin api
router.post("/event/create", authVerification, authorization(["admin"]), createEventController);
router.put("/event/:eventID", authVerification, authorization(["admin"]), updateEventController);
router.delete("/event/:eventID", authVerification, authorization(["admin"]), deleteEventController);
router.get("/sales-report/:eventID", authVerification, authorization(["admin"]), salesReportController);

// user details
router.get("/users", authVerification, authorization(["admin"]), userDetailsController);
router.get("/users/:userID", authVerification, authorization(["admin"]), singleUserDetailsController)
router.put("/users/:userID", authVerification, authorization(["admin"]), updateUserDetailsController)
router.delete("/users/:userID", authVerification, authorization(["admin"]), deleteUserController)



// coupon
router.get("/coupon/:couponCode/:eventID", couponController)
router.post("/coupon/create", authVerification, authorization(["admin"]), createCouponController);
router.delete("/coupon/:couponID", authVerification, authorization(["admin"]), deleteCouponController);


export default router;
import api from "./axios"


export const isValidCoupon = async (couponCode, eventID) => {
    try {
        const response = await api.get(`/coupon/${couponCode}/${eventID}`)
        
        if (response.data.status == "success") {
            return {
                status: true,
                discount: response?.data.discount
            }
        }
        return {
            status: false,
        }
        
    } catch (error) {
        return {
                status: false,
                message: error.message
            }
    }
}
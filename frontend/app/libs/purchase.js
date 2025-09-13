
import api from "./axios"

export const purchaseFunction = async (eventID, coupon_apply, coupon_code) => {

  try {
    const response = await api.post(
      "/ticket/purchase",
      {
        eventID, coupon_apply, coupon_code
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )
    
    return response.data
  } catch (error) {  
    return {
      status: "failed",
      message:error.response.data.message
    }
  }

}
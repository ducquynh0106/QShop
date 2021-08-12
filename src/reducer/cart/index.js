import {CartTypes} from '../../action/cart'
import initialState from './initial-state'

export default (state = initialState, action)=>{
    switch(action.type){
        case CartTypes.getShopRequest:
            return state
                    .set("error",null)
                    .set("isLoadingCart",false)
        case CartTypes.getCartSuccess:
            return state
                    .set("error",null)
                    .set("isLoadingCart",true)
                    .set("cart",action.cart)
        case  CartTypes.getCartFail:
            return state
                    .set("error",action.error) 
                    .set("isLoadingCart",false)
        case CartTypes.placeOrderRequest:
            return state
                .set("error",null)
                .set("isLoadingPlaceOrder",false)
        case CartTypes.placeOrderSuccess:
            return state
                .set("error",null)
                .set("isLoadingPlaceOrder",true)
        case CartTypes.placeOrderFail:
            return state
                .set("error",action.error) 
                .set("isLoadingPlaceOrder",true)
        default:
            return state;
    }
};
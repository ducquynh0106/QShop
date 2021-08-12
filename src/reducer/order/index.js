import {OrderTypes} from '../../action/order'
import initialState from './initial-state'

export default (state = initialState, action)=>{
    switch(action.type){
        case  OrderTypes.AddProduct:
            return state
                .set("orderNow",[action.Product, ...state.orderNow]) 
        case  OrderTypes.AddProductOrder:
            return state
                .set("orderProduct",[action.ProductOrder, ...state.orderProduct]) 
        case OrderTypes.changeField:
            return state.set(action.key, action.value);
        case OrderTypes.placeOrderNowRequest:
            return state
                .set("error",null)
                .set("isLoadingPlaceOrderNow",false)
        case OrderTypes.placeOrderNowSuccess:
            return state
                .set("error",null)
                .set("isLoadingPlaceOrderNow",true)
        case OrderTypes.placeOrderNowFail:
            return state
                .set("error",action.error) 
                .set("isLoadingPlaceOrderNow",true)     
        case OrderTypes.getOrderNowSuccess:
            return state
                    .set("error",null)
                    .set("isLoadingOrderNow",true)
                    .set("getOrderNow",action.orderNow)
        case  OrderTypes.getOrderNowFail:
            return state
                    .set("error",action.error) 
                    .set("isLoadingOrderNow",false)
        case OrderTypes.getMyOrderCusSuccess:
            return state
                    .set("error",null)
                    .set("isLoadingMyOrder_Cus",true)
                    .set("MyOrder_Cus",action.MyOrder_Cus)
        case  OrderTypes.getMyOrderCusFail:
            return state
                    .set("error",action.error) 
                    .set("isLoadingMyOrder_Cus",false)
        case OrderTypes.getMyOrderSuccess:
            return state
                    .set("error",null)
                    .set("isLoadingMyOrder",true)
                    .set("myorder",action.myorder)
        case  OrderTypes.getMyOrderFail:
            return state
                    .set("error",action.error) 
                    .set("isLoadingMyOrder",false)
        default:
            return state;
    }
};
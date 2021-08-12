
export const OrderTypes={
    AddProduct:"AddProduct",
    changeField:"changeField",
    placeOrderNowRequest:"placeOrderNowRequest",
    placeOrderNowSuccess:"placeOrderNowSuccess",
    placeOrderNowFail:"placeOrderNowFail",
    getOrderNowRequest:"getOrderNowRequest",
    getOrderNowSuccess:"getOrderNowSuccess",
    getOrderNowFail:"getOrderNowFail",
    getMyOrderCusRequest:"getMyOrderCusRequest",
    getMyOrderCusSuccess:"getMyOrderCusSuccess",
    getMyOrderCusFail:"getMyOrderCusFail",
    AddProductOrder:"AddProductOrder",
    Confirm_Store:"Confirm_Store",
    Confirm_Cus:"Confirm_Cus",
    getMyOrderRequest:"getMyOrderRequest",
    getMyOrderSuccess:"getMyOrderSuccess",
    getMyOrderFail:"getMyOrderFail",
    DeleteOrder:"DeleteOrder",
}

const AddProduct=(Product)=>{
    return{
        type:OrderTypes.AddProduct,
        Product
    }
}
const changeField=(key,value)=>{
    return{
        type:OrderTypes.changeField,
        key,
        value
    }
}
const PlaceOrderNow=(OrderNow,NameCustomer,PhoneNumber,Address,dateString)=>{
    return{
        type:OrderTypes.placeOrderNowRequest,
        OrderNow,
        NameCustomer,
        PhoneNumber,
        Address,
        dateString
    }
}
const getOrderNow=()=>{
    return{
        type:OrderTypes.getOrderNowRequest
    }
}

const AddProductOrder=(ProductOrder)=>{
    return{
        type:OrderTypes.AddProductOrder,
        ProductOrder
    }
}
const Confirm_Store=(orderNowCus,orderProduct,user,shipping,total)=>{
    return{
        type:OrderTypes.Confirm_Store,
        orderNowCus,
        orderProduct,
        user,
        shipping,
        total
    }
}
const getMyOrderCus=()=>{
    return{
        type:OrderTypes.getMyOrderCusRequest
    }
}
const Confirm_Customer=(myorder_cus)=>{
    return{
        type:OrderTypes.Confirm_Cus,
        myorder_cus
    }
}
const getMyOrder=(user)=>{
    return{
        type:OrderTypes.getMyOrderRequest,
        user
    }
}
const deleteOrder=(UID_Order)=>{
    return{
        type:OrderTypes.DeleteOrder,
        UID_Order
    }
}
export default{
    AddProduct,
    changeField,
    PlaceOrderNow,
    getOrderNow,
    AddProductOrder,
    Confirm_Store,
    getMyOrderCus,
    Confirm_Customer,
    getMyOrder,
    deleteOrder
}
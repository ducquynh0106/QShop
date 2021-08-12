
export const CartTypes={
    getCartRequest:"addToCartRequest",
    getCartSuccess:"addToCartSuccess",
    getCartFail:"addToCartFail",
    plusProduct:"plusProduct",
    minusProduct:"minusProduct",
    placeOrderRequest:"placeOrderRequest",
    placeOrderSuccess:"placeOrderSuccess",
    placeOrderFail:"placeOrderFail",
    resetCart:"resetCart"

}

const getCart=()=>{
    return{
        type:CartTypes.getCartRequest
    }
}

const plus=(UID_Product,UID_Cart)=>{
    return{
        type:CartTypes.plusProduct,
        UID_Product,
        UID_Cart
    }
}

const minus=(UID_Product,UID_Cart)=>{
    return{
        type:CartTypes.minusProduct,
        UID_Product,
        UID_Cart
    }
}
const PlaceOrder=(Cart,NameCustomer,PhoneNumber,Address,dateString)=>{
    return{
        type:CartTypes.placeOrderRequest,
        Cart,
        NameCustomer,
        PhoneNumber,
        Address,
        dateString
    }
}

export default{
    getCart,
    plus,
    minus,
    PlaceOrder
}

export const ProductTypes={
    changeField:"changeField",
    changeFormField:"changeFormField",

    addProductRequest:"addProductRequest",
    addProductSuccess:"addProductSuccess",
    addProductFail:"addProductfail",

    editProductRequest:"editProductRequest",
    editProductSuccess:"editProductSuccess",
    editProductFail:"editProductfail",

    deleteProductRequest:"deleteProductRequest",
    deleteProductSuccess:"deleteProductSuccess",
    deleteProductFail:"deleteProductfail",

    getProductRequest:"getProductRequest",
    getProductSuccess:"getProductSuccess",
    getProductFail:"getProductfail",

    getProductStoreRequest:"getProductStoreRequest",
    getProductStoreSuccess:"getProductStoreSuccess",
    getProductStoreFail:"getProductStorefail",

    addToCartRequest:"addToCartRequest",
    addToCartSuccess:"addToCartSuccess",
    addToCartFail:"addToCartFail",

    resetForm:"resetForm",
}

const changeField=(key,value)=>{
    return{
        type:ProductTypes.changeField,
        key,
        value
    }
}
const changeFormField=(key,value)=>{
    return{
        type:ProductTypes.changeFormField,
        key,
        value
    }
}
const addProduct=(form)=>{
    return{
        type:ProductTypes.addProductRequest,
        form
    }
}
const editProduct=(form)=>{
    return{
        type:ProductTypes.editProductRequest,
        form
    }
}
const deleteProduct=(UID_Product)=>{
    return{
        type:ProductTypes.deleteProductRequest,
        UID_Product
    }
}
const getProduct=()=>{
    return{
        type:ProductTypes.getProductRequest
    }
}
const getProductStore=(UID_Store)=>{
    return{
        type:ProductTypes.getProductStoreRequest,
        UID_Store
    }
}
const addToCart=(product,shopName)=>{
    return{
        type:ProductTypes.addToCartRequest,
        product,
        shopName
    }
}
const resetForm=()=>{
    return{
        type:ProductTypes.resetForm,
    }
}
export default{
    changeField,
    changeFormField,
    addProduct,
    getProduct,
    getProductStore,
    resetForm,
    editProduct,
    deleteProduct,
    addToCart
}
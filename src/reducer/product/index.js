import {ProductTypes} from '../../action/product'
import initialState from './initial-state'

export default ( state = initialState, action)=>{
    switch(action.type){
        case ProductTypes.changeFormField:
            return state.setIn(["productform",action.key],action.value);
        case ProductTypes.changeField:
            return state.set(action.key, action.value);
        case ProductTypes.addProductRequest:
            return state
                    .set("error",null)
                    .set("isLoadingAdd",false)
        case ProductTypes.addProductSuccess:
            return state
                    .set("error",null)
                    .set("isLoadingAdd",true)
        case ProductTypes.addProductFail:
            return state
                    .set("error",action.error) 
                    .set("isLoadingAdd",false)
        case ProductTypes.editProductRequest:
            return state
                    .set("error",null)
                    .set("isLoadingEdit",false)
        case ProductTypes.editProductSuccess:
            return state
                    .set("error",null)
                    .set("isLoadingEdit",true)
        case ProductTypes.editProductFail:
            return state
                    .set("error",action.error) 
                    .set("isLoadingEdit",false)
        case ProductTypes.deleteProductRequest:
            return state
                    .set("error",null)
                    .set("isLoadingDelete",false)
        case ProductTypes.deleteProductSuccess:
            return state
                    .set("error",null)
                    .set("isLoadingDelete",true)
        case ProductTypes.deleteProductFail:
            return state
                    .set("error",action.error) 
                    .set("isLoadingDelete",false)
        case ProductTypes.getProductRequest:
            return state
                    .set("error",null)
                    .set("isLoading",false)
        case ProductTypes.getProductSuccess:
            return state
                    .set("error",null)
                    .set("isLoading",true)
                    .set("product",action.product)
        case ProductTypes.getProductFail:
            return state
                    .set("error",action.error) 
                    .set("isLoading",false)
        case ProductTypes.getProductStoreRequest:
            return state
                    .set("error",null)
                    .set("isLoadingProductStore",false)
        case ProductTypes.getProductStoreSuccess:
            return state
                    .set("error",null)
                    .set("isLoadingProductStore",true)
                    .set("productstore",action.productstore)
        case ProductTypes.getProductStoreFail:
            return state
                    .set("error",action.error) 
                    .set("isLoadingProductStore",false)
        case ProductTypes.resetForm:
            return state.set("productform", initialState.productform);
        case ProductTypes.addToCartRequest:
            return state
                .set("error",null)
                .set("isLoadingAddToCart",false)
        case ProductTypes.addToCartSuccess:
            return state
                .set("error",null)
                .set("isLoadingAddToCart",true)
        case ProductTypes.addToCartFail:
            return state
                .set("error",action.error) 
                .set("isLoadingAddToCart",true)
		default:
			return state;
    }
}
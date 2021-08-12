import {ShopTypes} from '../../action/shop'
import initialState from './initial-state'

export default (state = initialState, action)=>{
    switch(action.type){
        case ShopTypes.getShopRequest:
            return state
                    .set("error",null)
                    .set("isLoadingShop",false)
        case ShopTypes.getShopsSuccess:
            return state
                    .set("error",null)
                    .set("isLoadingShop",true)
                    .set("shop",action.shop)
        case  ShopTypes.getShopFailure:
            return state
                    .set("error",action.error) 
                    .set("isLoadingShop",false)
        default:
            return state;
    }
};
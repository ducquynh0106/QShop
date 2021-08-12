import {all} from 'redux-saga/effects'
import {
    watchloginwithEmail,
    watchregisterwithEmail,
    watchgetUser,
    watchsaveProfile,
} from './auth'
import {
    watchgetCategories,
    watchgetCategory,
} from './categories'
import {
    watchaddProduct,
    watcheditProduct,
    watchdeleteProduct,
    watchgetProduct,
    watchgetProductStore,
    watchaddToCart
} from './product'
import {
    watchgetShop,
} from './shop'
import {
    watchgetCart,
    watchplus,
    watchminus,
    watchPlaceOrder,
    watchResetCart
} from './cart'
import {
    watchPlaceOrderNow,
    watchgetOrderNow,
    watchConfirm_Store,
    watchgetMyOrderCus,
    watchconfirmCus,
    watchgetMyorder,
    watchDeleteOrder
} from './order'
export default function* rootSaga(){
    yield all([
        watchloginwithEmail(),
        watchregisterwithEmail(),
        watchgetUser(),
        watchsaveProfile(),
        watchgetCategories(),
        watchgetCategory(),
        watchaddProduct(),
        watchgetProduct(),
        watchgetProductStore(),
        watcheditProduct(),
        watchdeleteProduct(),
        watchgetShop(),
        watchaddToCart(),
        watchgetCart(),
        watchplus(),
        watchminus(),
        watchPlaceOrder(),
        watchResetCart(),
        watchPlaceOrderNow(),
        watchgetOrderNow(),
        watchConfirm_Store(),
        watchgetMyOrderCus(),
        watchconfirmCus(),
        watchgetMyorder(),
        watchDeleteOrder(),
    ])
} 
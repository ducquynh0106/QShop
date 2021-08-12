import {
    put,
    takeEvery,
} from 'redux-saga/effects'
import {ShopTypes} from '../action/shop'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';
function*getShop(){
    try{
        let listShop=[]
        yield firestore()
            .collection("User")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().Type==="Store"){
                        listShop.push(documentSnapshot.data());
                    }      
                });
              });
        yield put({type:ShopTypes.getShopsSuccess,shop:listShop})
    }
    catch(err){
        yield put({type:ShopTypes.getShopFailure,error:err})
    }  
}


export function* watchgetShop(){
    yield takeEvery(ShopTypes.getShopRequest,getShop)
} 


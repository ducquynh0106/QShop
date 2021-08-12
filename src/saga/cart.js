import {
    put,
    takeEvery,
} from 'redux-saga/effects'
import {CartTypes} from '../action/cart'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';
function*getCart(){
    try{
        let listCart=[]
        yield firestore()
            .collection("Cart")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().UID_Cus===auth().currentUser.uid){
                        listCart.push(documentSnapshot.data());
                    }      
                });
              });
        yield put({type:CartTypes.getCartSuccess,cart:listCart})
    }
    catch(err){
        yield put({type:CartTypes.getCartFail,error:err})
    }  
}

function*plus(action){
    let Product=[]
    yield firestore()
    .collection('Cart')
    .doc(action.UID_Cart)
    .get()
    .then(documentSnapshot=>{
        Product=documentSnapshot.get('Product')
    })
   let selectProduct=Product.findIndex(product=>product.UID_Product===action.UID_Product)
   Product[selectProduct].Quanity=Product[selectProduct].Quanity+1
   yield firestore()
   .collection('Cart')
   .doc(action.UID_Cart)
   .update({
    'Product':Product,
    })
    yield put({type:CartTypes.getCartRequest})
}

function*minus(action){
    let Product=[]
    yield firestore()
    .collection('Cart')
    .doc(action.UID_Cart)
    .get()
    .then(documentSnapshot=>{
        Product=documentSnapshot.get('Product')
    })
   let selectProduct=Product.findIndex(product=>product.UID_Product===action.UID_Product)
   Product[selectProduct].Quanity=Product[selectProduct].Quanity-1
   if (Product[selectProduct].Quanity===0) Product.splice(selectProduct,1)
   console.log(Product)
   if (Product===null||Product.length===0) {
    console.log('delete')
    yield firestore()
    .collection('Cart')
    .doc(action.UID_Cart)
    .delete()
   }
   else (
    yield firestore()
    .collection('Cart')
    .doc(action.UID_Cart)
    .update({
     'Product':Product,
     })
   )
    yield put({type:CartTypes.getCartRequest})
}
function* PlaceOrder(action){
    try{
        let UID_Cus=yield auth().currentUser.uid
        let length=action.Cart.length
        if (length===1){
            yield firestore()
            .collection('Order')
            .add({
                Time:action.dateString,
                Product:action.Cart[0].Product,
                NameCustomer:action.NameCustomer,
                PhoneNumber:action.PhoneNumber,
                Address:action.Address,
                UID_Cus:UID_Cus,
                UID_Store:action.Cart[0].UID_Store,
                UID_Order:action.Cart[0].UID_Cart+'0',
                Name_Store:action.Cart[0].Name_Store
               
            })  
            let UID_Order=""
            yield firestore()
                .collection('Order')
                .get()
                .then(querySnapshot=>{
                    querySnapshot.forEach(documentSnapshot=>{
                        if (documentSnapshot.data().UID_Order===action.Cart[0].UID_Cart+'0'){
                            UID_Order=documentSnapshot.id
                        }
                    })
                }) 
            yield firestore()
            .collection('Order')
            .doc(UID_Order)
            .update({
                'UID_Order':UID_Order,
            })  
        }
        else if (length===2){
            yield firestore()
            .collection('Order')
            .add({
                Time:action.dateString,
                Product:action.Cart[0].Product,
                NameCustomer:action.NameCustomer,
                PhoneNumber:action.PhoneNumber,
                Address:action.Address,
                UID_Cus:UID_Cus,
                UID_Store:action.Cart[0].UID_Store,
                UID_Order:action.Cart[0].UID_Cart,
                Name_Store:action.Cart[0].Name_Store
            })   
            let UID_Order=""
            yield firestore()
                .collection('Order')
                .get()
                .then(querySnapshot=>{
                    querySnapshot.forEach(documentSnapshot=>{
                        if (documentSnapshot.data().UID_Order===action.Cart[0].UID_Cart+'0'){
                            UID_Order=documentSnapshot.id
                        }
                    })
                }) 
            yield firestore()
            .collection('Order')
            .doc(UID_Order)
            .update({
                'UID_Order':UID_Order,
            })  
            yield firestore()
            .collection('Order')
            .add({
                Time:action.dateString,
                Product:action.Cart[1].Product,
                NameCustomer:action.NameCustomer,
                PhoneNumber:action.PhoneNumber,
                Address:action.Address,
                UID_Cus:UID_Cus,
                UID_Store:action.Cart[1].UID_Store,
                UID_Order:action.Cart[1].UID_Cart,
                Name_Store:action.Cart[1].Name_Store
            })   
            let UID_Order1=""
            yield firestore()
                .collection('Order')
                .get()
                .then(querySnapshot=>{
                    querySnapshot.forEach(documentSnapshot=>{
                        if (documentSnapshot.data().UID_Order===action.Cart[1].UID_Cart+'0'){
                            UID_Order1=documentSnapshot.id
                        }
                    })
                }) 
            yield firestore()
            .collection('Order')
            .doc(UID_Order1)
            .update({
                'UID_Order':UID_Order1,
            })  
        }
        else if (length===3){
            yield firestore()
            .collection('Order')
            .add({
                Time:action.dateString,
                Product:action.Cart[0].Product,
                NameCustomer:action.NameCustomer,
                PhoneNumber:action.PhoneNumber,
                Address:action.Address,
                UID_Cus:UID_Cus,
                UID_Store:action.Cart[0].UID_Store,
                UID_Order:action.Cart[o].UID_Cart,
                Name_Store:action.Cart[0].Name_Store
            })   
            let UID_Order=""
            yield firestore()
                .collection('Order')
                .get()
                .then(querySnapshot=>{
                    querySnapshot.forEach(documentSnapshot=>{
                        if (documentSnapshot.data().UID_Order===action.Cart[0].UID_Cart+'0'){
                            UID_Order=documentSnapshot.id
                        }
                    })
                }) 
            yield firestore()
            .collection('Order')
            .doc(UID_Order)
            .update({
                'UID_Order':UID_Order,
            })  
            yield firestore()
            .collection('Order')
            .add({
                Time:action.dateString,
                Product:action.Cart[1].Product,
                NameCustomer:action.NameCustomer,
                PhoneNumber:action.PhoneNumber,
                Address:action.Address,
                UID_Cus:UID_Cus,
                UID_Store:action.Cart[1].UID_Store,
                UID_Order:action.Cart[1].UID_Cart,
                Name_Store:action.Cart[1].Name_Store
            })   
            let UID_Order1=""
            yield firestore()
                .collection('Order')
                .get()
                .then(querySnapshot=>{
                    querySnapshot.forEach(documentSnapshot=>{
                        if (documentSnapshot.data().UID_Order===action.Cart[1].UID_Cart+'0'){
                            UID_Order1=documentSnapshot.id
                        }
                    })
                }) 
            yield firestore()
            .collection('Order')
            .doc(UID_Order1)
            .update({
                'UID_Order':UID_Order1,
            })  
            yield firestore()
            .collection('Order')
            .add({
                Time:action.dateString,
                Product:action.Cart[2].Product,
                NameCustomer:action.NameCustomer,
                PhoneNumber:action.PhoneNumber,
                Address:action.Address,
                UID_Cus:UID_Cus,
                UID_Store:action.Cart[2].UID_Store,
                UID_Order:action.Cart[2].UID_Cart,
                Name_Store:action.Cart[2].Name_Store
            })   
            let UID_Order2=""
            yield firestore()
                .collection('Order')
                .get()
                .then(querySnapshot=>{
                    querySnapshot.forEach(documentSnapshot=>{
                        if (documentSnapshot.data().UID_Order===action.Cart[2].UID_Cart+'0'){
                            UID_Order2=documentSnapshot.id
                        }
                    })
                }) 
            yield firestore()
            .collection('Order')
            .doc(UID_Order2)
            .update({
                'UID_Order':UID_Order2,
            })  
        }
        yield put({type:CartTypes.placeOrderSuccess})  
        yield put({type:CartTypes.resetCart})
    }
    catch(err){
        yield put({type:CartTypes.placeOrderFail, error:err})
    }   
}
function*ResetCart(){
        let listCart=[]
        yield firestore()
            .collection("Cart")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().UID_Cus===auth().currentUser.uid){
                        listCart.push(documentSnapshot.id);
                    }      
                });
              });
        let length=listCart.length
        if (length===1){
            yield firestore()
            .collection('Cart')
            .doc(listCart[0])
            .delete()
        }
        else if (length===2){
            yield firestore()
            .collection('Cart')
            .doc(listCart[0])
            .delete()
            yield firestore()
            .collection('Cart')
            .doc(listCart[1])
            .delete()
            
        }
        else if (length===3){
            yield firestore()
            .collection('Cart')
            .doc(listCart[0])
            .delete()
            yield firestore()
            .collection('Cart')
            .doc(listCart[1])
            .delete()
            yield firestore()
            .collection('Cart')
            .doc(listCart[2])
            .delete()
            
        }
        else if (length===4){
            yield firestore()
            .collection('Cart')
            .doc(listCart[0])
            .delete()
            yield firestore()
            .collection('Cart')
            .doc(listCart[1])
            .delete()
            yield firestore()
            .collection('Cart')
            .doc(listCart[2])
            .delete()
            yield firestore()
            .collection('Cart')
            .doc(listCart[3])
            .delete()
            
        }
}
export function* watchgetCart(){
    yield takeEvery(CartTypes.getCartRequest,getCart)
} 
export function* watchplus(){
    yield takeEvery(CartTypes.plusProduct,plus)
}
export function* watchminus(){
    yield takeEvery(CartTypes.minusProduct,minus)
}
export function* watchPlaceOrder(){
    yield takeEvery(CartTypes.placeOrderRequest,PlaceOrder)
}
export function* watchResetCart(){
    yield takeEvery(CartTypes.resetCart,ResetCart)
}


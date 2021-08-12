import {
    put,
    takeEvery,
} from 'redux-saga/effects'
import {OrderTypes} from '../action/order'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';

function* PlaceOrderNow(action){
    try{
        let UID_Cus=yield auth().currentUser.uid
        yield firestore()
        .collection('Order_Now')
        .add({
            Time:action.dateString,
            Product:action.OrderNow,
            NameCustomer:action.NameCustomer,
            PhoneNumber:action.PhoneNumber,
            Address:action.Address,
            UID_Cus:UID_Cus,
            UID_Order:UID_Cus+'0',
            
        })
        let UID_Order=""
        yield firestore()
            .collection('Order_Now')
            .get()
            .then(querySnapshot=>{
                querySnapshot.forEach(documentSnapshot=>{
                    if (documentSnapshot.data(). UID_Order===UID_Cus+'0'){
                        UID_Order=documentSnapshot.id
                    }
                })
            })
        yield firestore()
            .collection('Order_Now')
            .doc(UID_Order)
            .update({
                'UID_Order':UID_Order,
            })   
        yield put({type:OrderTypes.placeOrderNowSuccess})  
        yield put({type:OrderTypes.getOrderNowRequest})
    }
    catch(err){
        yield put({type:OrderTypes.placeOrderNowFail, error:err})
    }   
}

function*getOrderNow(){
    try{
        let listOrderNow=[]
        yield firestore()
            .collection("Order_Now")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    listOrderNow.push(documentSnapshot.data());      
                });
              });
        yield put({type:OrderTypes.getOrderNowSuccess,orderNow:listOrderNow})
    }
    catch(err){
        yield put({type:OrderTypes.getOrderNowFail,error:err})
    }  
}
function*getMyOrder(action){
    try{
        console.log("orderReq")
        console.log(action.user)
        let listOrder=[]
        if (action.user.Type==="Customer"){
        yield firestore()
            .collection("Order")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().UID_Cus===auth().currentUser.uid){
                        listOrder.push(documentSnapshot.data());
                    }      
                });
              });
        }
        else if (action.user.Type==="Store"){
            yield firestore()
            .collection("Order")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().UID_Store===auth().currentUser.uid){
                        listOrder.push(documentSnapshot.data());
                    }      
                });
              });
        }
        console.log('getOrder')
        console.log(listOrder)
        yield put({type:OrderTypes.getMyOrderSuccess,myorder:listOrder})
    }
    catch(err){
        yield put({type:OrderTypes.getMyOrderFail,error:err})
    }  
}
function* Confirm_Store(action){
    let UID_Store=yield auth().currentUser.uid
    yield firestore()
    .collection('My_order')
    .add({
        NameCustomer:action.orderNowCus.NameCustomer,
        PhoneNumber:action.orderNowCus.PhoneNumber,
        Address:action.orderNowCus.Address,
        Time:action.orderNowCus.Time,
        NameStore:action.user.Name,
        PhoneNumberStore:action.user.Phone_Number,
        AddressStore:action.user.District+' ,'+action.user.Ward+' ,'+action.user.City,
        Shipping:action.shipping,
        UID_Cus:action.orderNowCus.UID_Cus,
        UID_Store:UID_Store,
        UID_OrderNow:action.orderNowCus.UID_Order,
        UID_Order:UID_Store+action.orderNowCus.UID_Order+'0',
        Product:action.orderProduct,  
        Total:action.total
    })
    let UID_Order=""
    yield firestore()
        .collection('My_order')
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach(documentSnapshot=>{
                if (documentSnapshot.data().UID_Order===UID_Store+action.orderNowCus.UID_Order+'0'){
                    UID_Order=documentSnapshot.id
                }
            })
        })
    yield firestore()
        .collection('My_order')
        .doc(UID_Order)
        .update({
            'UID_Order':UID_Order,
        })   
}
function*getMyOrderCus(){
    try{
        let listOrder=[]
        yield firestore()
            .collection("My_order")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().UID_Cus===auth().currentUser.uid){
                        listOrder.push(documentSnapshot.data());
                    }      
                });
              });
            
        yield put({type:OrderTypes.getMyOrderCusSuccess,MyOrder_Cus:listOrder})
    }
    catch(err){
        yield put({type:OrderTypes.getMyOrderCusFail,error:err})
    }  
}

function* Confirm_Cus(action){
    yield firestore()
    .collection('Order')
    .add({
        NameCustomer:action.myorder_cus.NameCustomer,
        PhoneNumber:action.myorder_cus.PhoneNumber,
        Address:action.myorder_cus.Address,
        Time:action.myorder_cus.Time,
        Name_Store:action.myorder_cus.NameStore,
        PhoneNumberStore:action.myorder_cus.PhoneNumberStore,
        Shipping:action.myorder_cus.Shipping,
        UID_Cus:action.myorder_cus.UID_Cus,
        UID_Store:action.myorder_cus.UID_Store,
        UID_Order:action.myorder_cus.UID_Store+action.myorder_cus.UID_Cus+'0',
        Product:action.myorder_cus.Product,  
        Total:action.myorder_cus.Total
    })
    let UID_Order=""
    yield firestore()
        .collection('Order')
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach(documentSnapshot=>{
                if (documentSnapshot.data().UID_Order===action.myorder_cus.UID_Store+action.myorder_cus.UID_Cus+'0'){
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
        .collection('Order_Now')
        .doc(action.myorder_cus.UID_OrderNow)
        .delete()

    let listOrderNow=[]
    yield firestore()
        .collection('My_order')
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach(documentSnapshot=>{
                if (documentSnapshot.data().UID_OrderNow===action.myorder_cus.UID_OrderNow){
                    listOrderNow.push(documentSnapshot.id)
                }
            })
        }) 
    let length=listOrderNow.length
    if  (length===1){
        yield firestore()
            .collection("My_order")
            .doc(listOrderNow[0])
            .delete()
    }
    else if  (length===2){
        yield firestore()
            .collection("My_order")
            .doc(listOrderNow[0])
            .delete()
        yield firestore()
            .collection("My_order")
            .doc(listOrderNow[1])
            .delete()
    }
    else if  (length===3){
        yield firestore()
            .collection("My_order")
            .doc(listOrderNow[0])
            .delete()
        yield firestore()
            .collection("My_order")
            .doc(listOrderNow[1])
            .delete()
        yield firestore()
            .collection("My_order")
            .doc(listOrderNow[2])
            .delete()
    }
}
function*DeleteOrder(action){
    yield firestore()
        .collection("Order")
        .doc(action.UID_Order)
        .delete()
    yield put({type:OrderTypes.getMyOrderRequest})
   
}
export function* watchPlaceOrderNow(){
    yield takeEvery(OrderTypes.placeOrderNowRequest,PlaceOrderNow)
}
export function* watchgetOrderNow(){
    yield takeEvery(OrderTypes.getOrderNowRequest,getOrderNow)
}
export function* watchConfirm_Store(){
    yield takeEvery(OrderTypes.Confirm_Store,Confirm_Store)
}
export function* watchgetMyOrderCus(){
    yield takeEvery(OrderTypes.getMyOrderCusRequest,getMyOrderCus)
}
export function* watchconfirmCus(){
    yield takeEvery(OrderTypes.Confirm_Cus,Confirm_Cus)
}
export function* watchgetMyorder(){
    yield takeEvery(OrderTypes.getMyOrderRequest,getMyOrder)
}
export function* watchDeleteOrder(){
    yield takeEvery(OrderTypes.DeleteOrder,DeleteOrder)
}




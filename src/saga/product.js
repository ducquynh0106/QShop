import {
    put,
    takeEvery,
} from 'redux-saga/effects'
import {ProductTypes} from '../action/product'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';
function*getProduct(){
    try{
        let listProduct=[]
        yield firestore()
            .collection("Product")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    listProduct.push(documentSnapshot.data());
                });
              });
        yield put({type:ProductTypes.getProductSuccess,product:listProduct})
    }
    catch(err){
        yield put({type:ProductTypes.getProductFail,error:err})
    }  
}
function*getProductStore(action){
    try{
        let listProductStore=[]
        yield firestore()
            .collection("Product")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().UID_Store===action.UID_Store){
                        listProductStore.push(documentSnapshot.data());
                    }
                  
                });
              });
        yield put({type:ProductTypes.getProductStoreSuccess,productstore:listProductStore})
    }
    catch(err){
        yield put({type:ProductTypes.getProductStoreFail,error:err})
    }  
}
function* addProduct(action){
    try{
        let UID_Store=yield auth().currentUser.uid
        let Image=action.form.Image
        let filename=Image.substring(Image.lastIndexOf('/')+1)
        yield storage().ref('/ProductImage/'+filename).putFile(Image)
        let uri=yield storage().ref('/ProductImage/'+filename).getDownloadURL()
        yield firestore()
            .collection('Product')
            .add({
                UID_Product:UID_Store+'0',
                UID_Store:UID_Store,
                Image:uri,
                Information:action.form.Information,
                Name_Product:action.form.Name_Product,
                Price:action.form.Price,
                Category:action.form.Category
            })
        let UID_Product=""
        yield firestore()
            .collection('Product')
            .get()
            .then(querySnapshot=>{
                querySnapshot.forEach(documentSnapshot=>{
                    if (documentSnapshot.data().UID_Product===UID_Store+'0'){
                        UID_Product=documentSnapshot.id
                    }
                })
            })
        yield firestore()
            .collection('Product')
            .doc(UID_Product)
            .update({
                'UID_Product':UID_Product,
            })
        yield put({type:ProductTypes.addProductSuccess})
        yield put({type:ProductTypes.resetForm})
        yield put({type:ProductTypes.getProductStoreRequest,UID_Store:UID_Store})
    }
    catch(err){
        yield put({type:ProductTypes.addProductFail, error:err})
    }
   
}
function* editProduct(action){
    try{
        let uri=""
        if (action.form.Image.indexOf('firebasestorage')===-1){
            let Image=action.form.Image
            let filename=Image.substring(Image.lastIndexOf('/')+1)
            yield storage().ref('/ProductImage/'+filename).putFile(Image)
            uri=yield storage().ref('/ProductImage/'+filename).getDownloadURL()
        }
        else {uri=action.form.Image}
        yield firestore()
            .collection('Product')
            .doc(action.form.UID_Product)
            .update({
                'Image':uri,
                'Infomation':action.form.Information,
                'Price':action.form.Price,
                'Name_Product':action.form.Name_Product,

            })
        yield put({type:ProductTypes.editProductSuccess})
        yield put({type:ProductTypes.resetForm})
        yield put({type:ProductTypes.getProductStoreRequest})
    }
    catch(err){
        yield put({type:ProductTypes.editProductFail, error:err})
    }
}
function* deleteProduct(action){
    try{
        yield firestore()
            .collection('Product')
            .doc(action.UID_Product)
            .delete()
        yield put({type:ProductTypes.deleteProductSuccess})
        yield put({type:ProductTypes.resetForm})
        yield put({type:ProductTypes.getProductStoreRequest})
    }
    catch(err){
        yield put({type:ProductTypes.deleteProductFail, error:err})
    }
   
}

function* addToCart(action){
    try{
        let UID_Cus=yield auth().currentUser.uid
        let typeEdit=""
        let UID_Cart=""
        let product=[]
        yield firestore()
            .collection('Cart')
            .get()
            .then(querySnapshot=>{
                querySnapshot.forEach(documentSnapshot=>{
                    if (documentSnapshot.data().UID_Cus===UID_Cus && documentSnapshot.data().UID_Store===action.product.UID_Store){
                     typeEdit="Edit";
                     UID_Cart=documentSnapshot.id
                     product=documentSnapshot.data().Product
                     let exit=product.filter(product => product.UID_Product===action.product.UID_Product)
                     if (exit.length>0) throw "The product already exists in the cart"
                     else { product.push({UID_Product:action.product.UID_Product, Quanity:1})}
                    }
                })
            })
        if (typeEdit===""){
            yield firestore()
            .collection('Cart')
            .add({
                UID_Cart:UID_Cus+'0',
                UID_Store:action.product.UID_Store,
                UID_Cus:UID_Cus,
                Name_Store:action.shopName,
                Product:[{UID_Product:action.product.UID_Product, Quanity:1}]
            })
            yield firestore()
                .collection('Cart')
                .get()
                .then(querySnapshot=>{
                    querySnapshot.forEach(documentSnapshot=>{
                        if (documentSnapshot.data().UID_Cart===UID_Cus+'0'){
                            UID_Cart=documentSnapshot.id
                        }
                    })
                })
            yield firestore()
                .collection('Cart')
                .doc(UID_Cart)
                .update({
                    'UID_Cart':UID_Cart,
                })
        } else {
            yield firestore()
            .collection('Cart')
            .doc(UID_Cart)
            .update({
                'Product':product,
            })
        }
        yield put({type:ProductTypes.addToCartSuccess})      
    }
    catch(err){
        yield put({type:ProductTypes.addToCartFail, error:err})
    }
  
   
}
export function* watchaddProduct(){
    yield takeEvery(ProductTypes.addProductRequest,addProduct)
} 
export function* watcheditProduct(){
    yield takeEvery(ProductTypes.editProductRequest,editProduct)
} 
export function* watchdeleteProduct(){
    yield takeEvery(ProductTypes.deleteProductRequest,deleteProduct)
} 
export function* watchgetProduct(){
    yield takeEvery(ProductTypes.getProductRequest,getProduct)
} 
export function* watchgetProductStore(){
    yield takeEvery(ProductTypes.getProductStoreRequest,getProductStore)
} 
export function* watchaddToCart(){
    yield takeEvery(ProductTypes.addToCartRequest,addToCart)
} 

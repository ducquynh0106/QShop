import {
    put,
    takeEvery,
} from 'redux-saga/effects'
import {CategoriesTypes} from '../action/categories'
import firestore from '@react-native-firebase/firestore'
function* getCategories(){
    try {
            let listCategories=[]
            yield firestore()
                .collection("Categories")
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        listCategories.push(documentSnapshot.data());
                    });
                  });
            yield put({type:CategoriesTypes.getCategoriesSuccess,categories:listCategories})    
    }
    catch(err){
            yield put({type:CategoriesTypes.getCategoriesFailure,error:err})
    }
}
function* getCategory(){
    try {
            let listCategory=[]
            yield firestore()
                .collection("Category")
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        listCategory.push(documentSnapshot.data());
                    });
                  });
            yield put({type:CategoriesTypes.getCategorySuccess,category:listCategory})    
    }
    catch(err){
            yield put({type:CategoriesTypes.getCategoryFailure,error:err})
    }
}
export function* watchgetCategories(){
    yield takeEvery(CategoriesTypes.getCategoriesRequest,getCategories)
} 
export function* watchgetCategory(){
    yield takeEvery(CategoriesTypes.getCategoryRequest,getCategory)
} 

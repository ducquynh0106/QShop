import firebase_auth from '@react-native-firebase/auth'
import firebase_firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import {AuthTypes} from '../action/auth'
import {
    put,
    takeEvery
} from 'redux-saga/effects'

function* loginwithEmail(action){
    try{
        yield firebase_auth().signInWithEmailAndPassword(action.email,action.password)
        yield put({type:AuthTypes.getUserRequest})
        yield put({type:AuthTypes.loginSuccess})
        yield put({type:AuthTypes.resetForm})
    }
    catch(err){
        yield put({type:AuthTypes.loginFail,error:"The email or password is incorrect"})
    } 
}

function* registerwithEmail(action){
    try{
        const res= yield firebase_auth().createUserWithEmailAndPassword(action.form.email,action.form.password)
        if (action.form.type==="Customer") {
            yield firebase_firestore()
            .collection('User')
            .add({
                UID:res.user.uid,
                Name:action.form.username,
                Email:action.form.email,
                Phone_Number:action.form.phone,
                City:action.form.city,
                District:action.form.district,
                Ward:action.form.ward,
                Type:"Customer"
            })
        } 
        else {
            yield firebase_firestore()
            .collection('User')
            .add({
                UID:res.user.uid,
                Name:action.form.username,
                Email:action.form.email,
                Phone_Number:action.form.phone,
                City:action.form.city,
                District:action.form.district,
                Ward:action.form.ward,
                Type:"Store",
                Image:""
            })
        }
        
        yield put({type:AuthTypes.registerSuccess})
        yield put({type:AuthTypes.resetForm})
    }
    catch(err){
        yield put({type:AuthTypes.registerFail,error:"The email is already in use"})
    } 
}

function* getUser(){
    try{
        let user=[]
        yield firebase_firestore()
            .collection("User")
            .get()
            .then(querySnapshot=>{
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().UID===firebase_auth().currentUser.uid){
                        user.push(documentSnapshot.data())
                    }
                });
            });
        yield put({type:AuthTypes.getUserSuccess,user:user[0]})
    }
    catch(err){
        yield put({type:AuthTypes.getUserFail,error:err})
    }
}
function* saveProfile(action){
    try{
        let Image=action.userform.Image
        let filename=Image.substring(Image.lastIndexOf('/')+1)
        yield storage().ref('/UserImage/'+filename).putFile(Image)
        let uri=yield storage().ref('/UserImage/'+filename).getDownloadURL()
        let Id_user=""
        yield firebase_firestore()
            .collection("User")
            .get()
            .then(querySnapshot=>{
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().UID===firebase_auth().currentUser.uid){
                        Id_user=documentSnapshot.id
                    }
                });
            });
        yield firebase_firestore()
            .collection('User')
            .doc(Id_user)
            .update({
                'Image':uri,
                
            })
        yield put({type:AuthTypes.getUserRequest})
        yield put({type:AuthTypes.saveProfileSuccess})
    }
    catch(err){
        yield put({type:AuthTypes.saveProfileFail,error:err})
    }
   
}

export function*watchloginwithEmail(){
    yield takeEvery(AuthTypes.loginRequest,loginwithEmail)
}
export function*watchregisterwithEmail(){
    yield takeEvery(AuthTypes.registerRequest,registerwithEmail)
}
export function*watchgetUser(){
    yield takeEvery(AuthTypes.getUserRequest,getUser)
}
export function*watchsaveProfile(){
    yield takeEvery(AuthTypes.saveProfileRequest,saveProfile)
}

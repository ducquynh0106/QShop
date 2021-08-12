import {AuthTypes} from '../../action/auth'
import initialState from './initial-state'

export default (state = initialState, action)=>{
    switch(action.type){
        case AuthTypes.changeFormField:
            return state.setIn(["form",action.key],action.value);
        case AuthTypes.changeUserFormField:
            return state.setIn(["userform",action.key],action.value);
        case AuthTypes.changeField:
            return state.set(action.key, action.value);
        case AuthTypes.resetForm:
            return state.set("form", initialState.form);
        case AuthTypes.checkEmail:
            return state.setIn(["form","emailError"], action.err);
        case AuthTypes.checkPassword:
            return state.setIn(["form","passwordError"], action.err);    
        case AuthTypes.checkConfirm:
            return state.setIn(["form","confirmError"], action.err);    
        case AuthTypes.checkPhone:
            return state.setIn(["form","phoneError"], action.err);   
        case AuthTypes.loginSuccess:
            return state
                    .set("error",null)
                    .set("logoutState",true)
        case AuthTypes.loginFail:
            return state
                    .set("error",action.error) 
                    .set("logoutState",false)
        case AuthTypes.registerSuccess:
            return state
                    .set("error",null)
                    .set("registerState",true)
        case AuthTypes.registerFail:
            return state
                    .set("error",action.error) 
                    .set("registerState",false)
        case AuthTypes.getUserSuccess:
            return state
                    .set("error",null)
                    .set("user",action.user)
        case AuthTypes.registerFail:
            return state
                    .set("error",action.error)
                    .set("user",null)
        case AuthTypes.saveProfileRequest:
            return state
                    .set("error",null)
                    .set("isLoadingProfile",false)
        case AuthTypes.saveProfileSuccess:
            return state
                    .set("error",null)
                    .set("isLoadingProfile",true)
        case  AuthTypes.saveProfileFail:
            return state
                    .set("error",action.error) 
                    .set("isLoadingProfile",false)
        default:
            return state;
    }
};
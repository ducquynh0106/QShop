export const AuthTypes={
    changeField:"changeField",
    changeFormField:"changeFormField",
    changeUserFormField:"changeUserFormField",
    resetForm:"resetForm",
    checkEmail:"checkEmail",
    checkPassword:"checkPassword",
    checkConfirm:"checkConfirm",
    checkPhone:"checkPhone",
    loginRequest:"loginRequest",
    loginSuccess:"loginSuccess",
    loginFail:"loginFail",
    registerRequest:"registerRequest",
    registerSuccess:"registerSuccess",
    registerFail:"registerFail",
    getUserRequest:"getUserRequest",
    getUserSuccess:"getUserSuccess",
    getUserFail:"getUserFail",
    saveProfileRequest:"saveProfileRequest",
    saveProfileSuccess:"saveProfileSuccess",
    saveProfileFail:"saveProfileFail",
}
const changeField=(key,value)=>{
    return{
        type:AuthTypes.changeField,
        key,
        value
    }
}

const changeFormField=(key,value)=>{
    return{
        type:AuthTypes.changeFormField,
        key,
        value
    }
}
const changeUserFormField=(key,value)=>{
    return{
        type:AuthTypes.changeUserFormField,
        key,
        value
    }
}
const checkEmail=(err)=>{
    return{
        type:AuthTypes.checkEmail,
        err
    }
}

const checkPassword=(err)=>{
    return{
        type:AuthTypes.checkPassword,
        err
    }
}

const checkConfirm=(err)=>{
    return{
        type:AuthTypes.checkConfirm,
        err
    }
}

const checkPhone=(err)=>{
    return{
        type:AuthTypes.checkPhone,
        err
    }
}

const resetForm=()=>{
    return{
        type:AuthTypes.resetForm,
    }
}

const login=(email,password)=>{
    return{
        type:AuthTypes.loginRequest,
        email,
        password
    }
}

const register=(form)=>{
    return{
        type:AuthTypes.registerRequest,
        form
    }
}
const saveProfile=(userform)=>{
    return{
        type:AuthTypes.saveProfileRequest,
        userform
    }
}
export default{
    changeField,
    changeFormField,
    changeUserFormField,
    checkEmail,
    checkPassword,
    checkConfirm,
    checkPhone,
    resetForm,
    login,
    register,
    saveProfile
}
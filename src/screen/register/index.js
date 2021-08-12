import React, {Component} from 'react'
import{
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import styles from './style'
import CustomInput from '../../component/custom-input'
import CustomButton from '../../component/custom-button'
import {Picker} from '@react-native-picker/picker';
import {
    validateEmail,
    validatePassword,
    validatePhone
} from '../../common/util'
import AuthAction from '../../action/auth'
import {
    getField,
    getAuthField
} from '../../selector/auth'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Router} from '../../navigation/route'
import AwesomeAlert from 'react-native-awesome-alerts';

class index extends Component{
    state={
        showAlert:false,
        message:"",
        selectedCityIndex: 0,
        selectedDistrictIndex: 0,
    }
    
    handelCheckEmail=(email)=>{
        if (validateEmail(email)){
            this.props.checkEmail("")
        }
        else {
            this.props.checkEmail("Invalid Email")
        }
    }
    handelCheckPassword=(password)=>{
        if (validatePassword(password)){
            this.props.checkPassword("")
        }
        else {
            this.props.checkPassword("Password has at lest 6 characters")
        }
    }
    handelcheckConfirm=(confirm)=>{
        const {
            checkConfirm,
            password
        }=this.props
        if (password===confirm){
            checkConfirm("")
        }
        else {
            checkConfirm("Not similar to password")
        }
    };
    handelcheckPhone=(phone)=>{
        const {
            checkPhone,
        }=this.props
        if (validatePhone(phone)){
            checkPhone("")
        }
        else {
            checkPhone("Phone Number start with 0 and must be 10 digits ")
        }
    };

    handelRegister=()=>{
        const {
            form,
            username,
            email,
            password,
            confirm,
            phone,
            emailError,
            passwordError,
            confirmError,
            phoneError,
            city,
            district,
            ward,
            type,
            register
        }=this.props
        if (email===""||password===""||confirm===""||username===""||phone===""||city===""||district===""||ward===""||type===""){
            this.setState({
                showAlert:true,
                message:"All field must not be empty  "
            })
        }
        else if (emailError=== "" && passwordError=== "" && confirmError==="" && phoneError===""){
            register(form);
        }
    }

    hideAlert = () => {
        this.props.changeField("error",null)
        this.setState({
          showAlert: false
        });
        if (this.state.message==="You have successfully registered and logged in"){
            this.props.navigation.navigate(Router.Login)
        }
      };

    componentDidMount(){
        const {resetForm}=this.props
        this.props.changeField("error",null)
        resetForm()
    }
    async componentWillReceiveProps(nextProps){
        if (nextProps.registerState === true) {
            this.setState({
                showAlert:true,
                message:"You have successfully registered and logged in"
            })
        }
		if (nextProps.error) {
            this.setState({
                showAlert:true,
                message:nextProps.error
            })
		}
    }
    render(){
        const {
            username,
			password,
			passwordError,
			email,
			emailError,
			confirm,
            confirmError,
            phone,
            phoneError,
            city,
            district,
            ward,
            type,
            changeFormField,
            navigation: {navigate}
        }=this.props
        const DistrictData=[
            {
                "city":"Da Nang",
                "district":[
                    "Quan Hai Chau"
                ]
            },
            {
                "city":"Ho Chi Minh",
                "district":[
                    "Quan 2",
                    "Quan 1",
                    "Quan 3",
                    "Quan 4",
                    "Quan 5",
                    "Quan 6",
                    "Quan 7",
                    "Quan 8",
                    "Quan 9",
                    "Quan 10",
                    "Quan 11",
                    "Quan 12",
                    "Quan Binh Thanh",
                    "Quan Binh Tan",
                    "Quan Vo Gap",
                    "Quan Phu Nhuan",
                    "Quan Thu Duc",
                    "Quan Tan Binh",
                    "Quan Tan Phu"
                ]
            },
        
        ]
        const WardData=[ 
            {
                "district":"Quan 2",
                "ward":[]
            },
            {
            "district":"Quan 1",
            "ward":[
                "Phuong Ben Nghe",
                "Phuong Ben Thanh",
                "Phuong Co Giang",
                "Phuong Cau Kho",
                "Phuong Cau Ong Lanh",
                "Phuong Nguyen Cu  Trinh",
                "Phuong Nguyen Thai Binh",
                "Phuong Pham Ngu Lao",
                "Phuong Tan Dinh",
                "Phuong Dakao"
            ]
            },
     
    ]
        return(
            <View style={styles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                >
                    <Text style={styles.textTitle}>Getting Started</Text>
                    <Text style={styles.text}>Create an account to continue!</Text>
                    <CustomInput
                        label={"Email"}
                        iconName={"email"}
                        value={email}
                        onChangeText={ email=>{
                            this.handelCheckEmail(email)
                            changeFormField("email",email)
                        }}
                        errorText={emailError}
                        keyboardType={"email-address"}
                    />
                    <CustomInput
                        label={"Password"}
                        iconName={"lock-outline"}
                        value={password}
                        onChangeText={password=>{
                            this.handelCheckPassword(password)
                            changeFormField('password',password)
                        }}
                        errorText={passwordError}
                        secureTextEntry
                    />
                    <CustomInput
                        label={"Confirm password"}
                        iconName={"lock-outline"}
                        value={confirm}
                        onChangeText={confirm=>{
                            this.handelcheckConfirm(confirm)
                            changeFormField('confirm',confirm)
                        }}
                        errorText={confirmError}
                        secureTextEntry
                    />
                    <CustomInput
                        label={"Name"}
                        iconName={"person"}
                        value={username}
                        onChangeText={ username=>{
                            changeFormField("username",username)
                        }}
                        errorText={""}
                    />
                    <CustomInput
                        label={"Phone Number"}
                        iconName={"phone-android"}
                        value={phone}
                        onChangeText={ phone=>{
                            this.handelcheckPhone(phone)
                            changeFormField("phone",phone)
                        }}
                        errorText={phoneError}
                    />
                    <View style={styles.picker}>
                        <Text style={[styles.text,{marginTop:16}]}>City</Text>
                        <Picker
                            selectedValue={city}
                            onValueChange={(itemValue, itemIndex) =>{
                                changeFormField("city",itemValue)
                                this.setState({selectedCityIndex:itemIndex})   
                            }}  
                            style={styles.pickerItem}
                        >
                            <Picker.Item label="Da Nang" value="Da Nang" color="white"/>
                            <Picker.Item label="Ho Chi Minh" value="Ho Chi Minh" color="white"/>
                            
                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text style={[styles.text,{marginTop:16}]}>District</Text>
                        <Picker
                            selectedValue={district}
                            onValueChange={(itemValue, itemIndex) =>{   
                                changeFormField("district",itemValue)
                                this.setState({selectedDistrictIndex:itemIndex})
                            }}  
                            style={styles.pickerItem}
                        >
                            {city!="" && DistrictData[this.state.selectedCityIndex].district.map(dis=>{
                                return(
                                    <Picker.Item label={dis} value={dis} color="white"/>                 
                                )
                            })}
                            
                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text style={[styles.text,{marginTop:16}]}>Ward</Text>
                        <Picker
                            selectedValue={ward}
                            onValueChange={(itemValue, itemIndex) =>{
                                changeFormField("ward",itemValue)
                            }}  
                            style={styles.pickerItem}
                        >
                            {district!=="" && WardData[this.state.selectedDistrictIndex].ward.map(war=>{
                                return(
                                    <Picker.Item label={war} value={war} color="white"/>                 
                                )
                            })}
                            
                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text style={[styles.text,{marginTop:16}]}>Type</Text>
                        <Picker
                            selectedValue={type}
                            onValueChange={(itemValue, itemIndex) =>{
                                changeFormField("type",itemValue)
                            }}  
                            style={styles.pickerItem}
                        >
                            <Picker.Item label="Customer" value="Customer" color="white"/>
                            <Picker.Item label="Store" value="Store" color="white"/>
                        </Picker>
                    </View>
                    <View style={styles.insWrapper}> 
                        <Text style={styles.textAccount}>Have an account?</Text>
                        <TouchableOpacity
                            onPress={()=>navigate(Router.Login)}
                        >
                            <Text style={styles.highlight}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomButton
                        textButton={"REGISTER"}
                        onPress={()=>this.handelRegister()}
                    />
                </ScrollView>
                        
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title=""
                    message={this.state.message}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    contentContainerStyle={styles.alert}
                    titleStyle={styles.alertTitle}
                    messageStyle={styles.alertMessage}
                    showConfirmButton={true}
                    confirmText="OK"
                    confirmButtonStyle={styles.alertButton}
                    confirmButtonColor={"rgba(255, 157, 11, 0.79)"}
                    confirmButtonTextStyle={styles.confirmButtonText}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                    />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    email: getField(state, "email"),
    emailError: getField(state, "emailError"),
    password:getField(state,"password"),
    passwordError:getField(state,"passwordError"),  
    username: getField(state, "username"),
	confirm: getField(state, "confirm"),
    confirmError: getField(state, "confirmError"),
    phone: getField(state, "phone"),
    phoneError: getField(state, "phoneError"),
    city:getField(state,"city"),
    district:getField(state,"district"),
    ward:getField(state,"ward"),
    type:getField(state,"type"),
    form:getAuthField(state,"form"),
    error: state.auth.error,
    registerState: state.auth.registerState,
});

const mapDispatchToProps =(dispatch)=> {
    return{
        changeField:bindActionCreators(AuthAction.changeField,dispatch),
        changeFormField:bindActionCreators(AuthAction.changeFormField,dispatch),
        resetForm:bindActionCreators(AuthAction.resetForm,dispatch),
        checkEmail:bindActionCreators(AuthAction.checkEmail,dispatch),
        checkPassword:bindActionCreators(AuthAction.checkPassword,dispatch),
        checkConfirm:bindActionCreators(AuthAction.checkConfirm,dispatch),
        checkPhone:bindActionCreators(AuthAction.checkPhone,dispatch),
        register:bindActionCreators(AuthAction.register,dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(index);

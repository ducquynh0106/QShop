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
import {
    validateEmail,
    validatePassword
} from '../../common/util'
import AuthAction from '../../action/auth'
import {getField} from '../../selector/auth'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Router} from '../../navigation/route'
import AwesomeAlert from 'react-native-awesome-alerts';

class index extends Component{
    state={
        showAlert:false,
        message:"",
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
    handelLogin=()=>{
        const {
            email,
            password,
            emailError,
            passwordError,
            login
        }=this.props
        if (email===""||password===""){
            this.setState({
                showAlert:true,
                message:"Email or password must not be empty  "
            })
        }
        else if (emailError=== "" && passwordError=== ""){
            login(email,password);
        }
    }

    hideAlert = () => {
        this.props.changeField("error",null)
        this.setState({
          showAlert: false
        });
        if (this.state.message==="Login Successfully!!"){
            this.props.navigation.navigate(Router.BottomTabs)
        }
      };

    componentDidMount(){
        const {resetForm}=this.props
        resetForm()
    }
    async componentWillReceiveProps(nextProps){
        if (nextProps.logoutState === true) {
            this.setState({
                showAlert:true,
                message:"Login Successfully!!"
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
            email,
            emailError,
            password,
            passwordError,
            changeFormField,
            navigation: {navigate}
        }=this.props
        return(
            <View style={styles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                >
                    <Text style={styles.textTitle}>Let's Sign You In</Text>
                    <Text style={styles.text}>Welcome back</Text>
                    <CustomInput
                        label={"Email"}
                        iconName={"email"}
                        value={email}
                        onChangeText={email=>{
                            this.handelCheckEmail(email)
                            changeFormField('email',email)
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
                    <View style={styles.insWrapper}> 
                        <Text style={styles.textAccount}>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={()=>navigate(Router.Register)}
                        >
                            <Text style={styles.highlight}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomButton
                        textButton={"SIGN IN"}
                        onPress={()=>this.handelLogin()}
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
    error: state.auth.error,
    logoutState: state.auth.logoutState,
});

const mapDispatchToProps =(dispatch)=> {
    return{
        changeField:bindActionCreators(AuthAction.changeField,dispatch),
        changeFormField:bindActionCreators(AuthAction.changeFormField,dispatch),
        resetForm:bindActionCreators(AuthAction.resetForm,dispatch),
        checkEmail:bindActionCreators(AuthAction.checkEmail,dispatch),
        checkPassword:bindActionCreators(AuthAction.checkPassword,dispatch),
        login:bindActionCreators(AuthAction.login,dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(index);

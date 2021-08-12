import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput
} from 'react-native'
import styles from './style'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getCategoriesField
} from '../../selector/categories'
import {
  getOrderField
} from '../../selector/order'
import OrderAction from '../../action/order'
import {Router} from '../../navigation/route'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProductAction from '../../action/product'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {convertTimeToString} from '../../common/util'
import AwesomeAlert from 'react-native-awesome-alerts';
const format = "yyyy-MM-dd";
class index extends Component{
  state={
    Address:"",
    NameCus:"",
    PhoneNumberCus:"",
    NameProduct:"",
    Quanity:0,
    showAlert:false,
    showmessage:false,
    message:"",
    selectedDate:new Date(),
  }
  AddProduct=()=>{
    this.props.addProduct({NameProduct:this.state.NameProduct,Quanity:this.state.Quanity})
  }
  PlaceOrderNow=()=>{
    const {orderNow}=this.props
    const {selectedDate}=this.state;
    const dateString=convertTimeToString(selectedDate,format)
    if (orderNow!=[]) {this.props.PlaceOrderNow(orderNow,this.state.NameCus,this.state.PhoneNumberCus,this.state.Address,dateString)}
    this.setState({
      showAlert:true,
      message:"You have successfully place order"
    })
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
    if (this.state.message==="You have successfully place order"){
      this.props.navigation.navigate(Router.OrderNow)
  }
  };
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              size={32}
              color={"#FF9D0B"}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Order Now</Text>
        </View>
        <ScrollView
          style={styles.scrollView}>
              <View
              style={styles.viewCategory}>
              <Text style={styles.delivery}>Receiver's Information</Text>
              <View style={styles.direct}>
                <Text  style={styles.directText} >Name: </Text>
                <TextInput
                  value={this.state.NameCus}
                  onChangeText={Name=>this.setState({NameCus:Name})}
                  placeholder={"Name"}
                  placeholderTextColor={"gray"}
                  style={styles.label}
                />
              </View>
              <View  style={styles.direct}>
                <Text style={styles.directText} >Phone Number: </Text>
                <TextInput
                  value={this.state.PhoneNumberCus}
                  onChangeText={PhoneNumberCus=>this.setState({PhoneNumberCus:PhoneNumberCus})}
                  placeholder={"PhoneNumber"}
                  placeholderTextColor={"gray"}
                  style={styles.label}
                  multiline={true}
                />
              </View>  
              <View style={styles.direct}>
                <Text  style={styles.directText} >Address: </Text>
                <TextInput
                  value={this.state.Address}
                  onChangeText={Address=>this.setState({Address:Address})}
                  placeholder={"Address"}
                  placeholderTextColor={"gray"}
                  style={styles.label}
                />
              </View>
            </View>

            <View
              style={styles.viewCategory}>
              <Text style={styles.delivery}>Add Product</Text>
              <View style={styles.customInput}>
                <Text style={styles.label}>Name Product</Text>
                <TextInput
                  value={this.state.NameProduct}
                  onChangeText={Name_Product=>this.setState({NameProduct:Name_Product})}
                  placeholder={"Name"}
                  placeholderTextColor={"gray"}
                  style={styles.label}
                  multiline={true}
                />
              </View>
              <View style={styles.customInput}>
                <Text style={styles.label}>Quanity</Text>
                <TextInput
                  value={this.state.Quanity}
                  onChangeText={Quanity=>this.setState({Quanity:Quanity})}
                  placeholder={"0"}
                  placeholderTextColor={"gray"}
                  style={styles.label}
                  multiline={true}
                  keyboardType = 'numeric'
                />
              </View>
              <TouchableOpacity 
                onPress={()=>this.AddProduct()}
                style={styles.buttonProduct}>
                  <Text style={styles.textCart}>ADD PRODUCT</Text>
              </TouchableOpacity>
            </View>
            <View
              style={styles.viewCategory}>
              <Text style={styles.delivery}>Product</Text>
              {this.props.orderNow!=[]?
                this.props.orderNow.map(product=>{
                  return(
                    <View style={styles.productmap}>
                      <Text style={styles.textProduct}>{product.NameProduct}</Text>
                      <Text style={styles.textProduct}>Quanity: {product.Quanity}</Text>
                    </View>
                  )
                })
              :
              <View> </View>
              }
            </View>
        </ScrollView>
      <TouchableOpacity 
        onPress={()=>this.PlaceOrderNow()}
        style={styles.buttonCart}>
          <Text style={styles.textCart}>PLACE ORDER</Text>
        </TouchableOpacity>
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
  orderNow:getOrderField(state,'orderNow')
});

const mapDispatchToProps =(dispatch)=> {
    return{
     addProduct:bindActionCreators(OrderAction.AddProduct,dispatch),
     changeField:bindActionCreators(OrderAction.changeField,dispatch),
     PlaceOrderNow:bindActionCreators(OrderAction.PlaceOrderNow,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
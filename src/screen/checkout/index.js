import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import styles from './style'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getCartField
} from '../../selector/cart'
import {
  getProductField
} from '../../selector/product'
import ProductAction from '../../action/product'
import CartAction from '../../action/cart'
import {Router} from '../../navigation/route'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import product from '../../action/product'
import cart from '../../action/cart'
import {convertTimeToString} from '../../common/util'
import AwesomeAlert from 'react-native-awesome-alerts';
const format = "yyyy-MM-dd";
class index extends Component{
  state={
    isSelected:false,
    Address:"",
    NameCus:"",
    PhoneNumberCus:"",
    selectedDate:new Date(),
    showAlert:false,
    showmessage:false,
    message:"",
  }

  renderProduct=({productItem})=>{
    const {product}=this.props
    let selectproduct=product.filter(product=>product.UID_Product===productItem.UID_Product)
    let Name=""
    if (selectproduct[0].Name_Product.length>12){
      Name=selectproduct[0].Name_Product.slice(0,12)+'...'
    } else {Name=selectproduct[0].Name_Product}
    return(
    <TouchableOpacity
      style={styles.viewProduct}
      key={selectproduct[0].UID_Product}
      >
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Image
          source={{uri:selectproduct[0].Image}}
          resizeMethod={"resize"}
          style={styles.image}
        />
        <View style={{justifyContent:"center"}}>
          <Text style={styles.categoryName}>{Name}</Text>
          <Text style={styles.price}>Price: <Text>
            {selectproduct[0].Price} VND</Text></Text>
          <View style={styles.viewQuanity}>
            <Text style={styles.categoryName}>Quanity:</Text>
            <View style={styles.textQuanity}>
              <Text>{productItem.Quanity}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    )
  }

  totalCart=()=>{
    const {cart}=this.props
    const {product}=this.props
    let selectproduct
    let sum=0
    if (cart!=null) {
      cart.forEach(store => {
        store.Product.forEach(pro=>{
          selectproduct=product.filter(product=>product.UID_Product===pro.UID_Product)
          sum=selectproduct[0].Price*pro.Quanity+sum
        })
      });
    }
    return sum

  }
  OnPlaceOrder=()=>{
    const {cart}=this.props
    const {selectedDate}=this.state;
    const dateString=convertTimeToString(selectedDate,format)
    let Address
    if (this.state.Address==="") Address="Receive directly at the store"
    else Address=this.state.Address
    if (cart!=null) {this.props.PlaceOrder(cart,this.state.NameCus,this.state.PhoneNumberCus,Address,dateString)}
    
      this.setState({
        showAlert:true,
        message:"You have successfully place order"
    })

  }
  componentWillMount(){
    this.props.getCart();
  }
  componentDidMount(){
    this.props.getCart();
  }
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
    if (this.state.message==="You have successfully place order"){
      this.props.navigation.navigate(Router.Home)
  }
  };
  

  
  render(){ 
    const {cart}=this.props
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
          <Text style={styles.textHeader}>Check Out</Text>
        </View>
        <ScrollView
          style={styles.scrollView}>
            <View
              style={styles.viewCategory}>
              <Text style={styles.delivery}>Information Customer</Text>
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
            </View>
            <View
             style={styles.viewCategory}>
              <Text style={styles.delivery}> Delivery Method</Text>
              <View style={styles.direct}>
                <CheckBox
                  value={!this.state.isSelected}
                  onValueChange={check=>{
                    this.setState({isSelected:!check})
                  }}
                  tintColors={{true: 'green'}}
                />
                <Text  style={styles.directText} >Receive directly at the store</Text>
              </View>
              <View  style={styles.direct}>
                <CheckBox
                  value={this.state.isSelected}
                  onValueChange={check=>this.setState({isSelected:check})}
                  tintColors={{true: 'green'}}
                />
                <TextInput
                  value={this.state.Address}
                  onChangeText={Address=>this.setState({Address:Address})}
                  placeholder={"Address"}
                  placeholderTextColor={"black"}
                  style={styles.label}
                  multiline={true}
                />
              </View>  
            </View>
            {cart!=null&&cart.map(cart=>
              <View
                key={cart.UID_Cart} 
                style={styles.viewCategory}>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.categories}>{cart.Name_Store}</Text>   
                </View>
                {cart.Product.map(productItem=>this.renderProduct({productItem}))}   
              </View>
            )}
        </ScrollView>
        <View style={styles.viewbottom}>
          <Text style={styles.categoryName}>Total:</Text>
          <Text style={styles.price}> {this.totalCart()} VND</Text>
          <TouchableOpacity 
            onPress={()=>this.OnPlaceOrder()}
            style={styles.buttoncheckout}>
            <Text style={styles.textCheckOut}>Place Order</Text>
          </TouchableOpacity>
        </View>
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
  cart:getCartField(state,'cart'),
  product:getProductField(state,"product"),

});

const mapDispatchToProps =(dispatch)=> {
    return{
      getCart:bindActionCreators(CartAction.getCart,dispatch),
      PlaceOrder:bindActionCreators(CartAction.PlaceOrder,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
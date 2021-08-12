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
  getAuthField
} from '../../selector/auth'
import {
  getOrderField
} from '../../selector/order'
import OrderAction from '../../action/order'
import CategoriesAction from '../../action/categories'
import {Router} from '../../navigation/route'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ProductAction from '../../action/product'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AwesomeAlert from 'react-native-awesome-alerts';

class index extends Component{
  state={
    orderNowCus:this.props.route.params.orderNowCus,
    shipping:0,
    showAlert:false,
    showmessage:false,
    message:"",
  } 
  componentWillMount(){
    this.props.getProductStore(this.props.user.UID)
  }
  componentDidMount(){
    this.props.getProductStore(this.props.user.UID)
  }
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
    if (this.state.message==="You have successfully confirm"){
      this.props.navigation.navigate(Router.OrderNow)
  }
  };
  renderProduct=({product})=>{
    return(
    <TouchableOpacity
      style={styles.viewProduct}
      key={product.UID_Product}
      >
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Image
          source={{uri:product.Image}}
          resizeMethod={"resize"}
          style={styles.image}
        />
        <View style={{justifyContent:"center"}}>
          <Text style={styles.categoryName}>{product.NameProduct}</Text>
          <Text style={styles.price}>Price: <Text>
            {product.Price} VND</Text></Text>
          <Text style={styles.categoryName}>Quanity: <Text>
            {product.Quanity}</Text></Text>
        </View>
      </View>
    </TouchableOpacity>
    )
  }
  totalCart=()=>{
    const {orderProduct}=this.props
    let sum=0
    if (orderProduct!=[]) {
      orderProduct.forEach(pro => {
        sum=pro.Price*pro.Quanity+sum
      });
      sum=parseInt(sum)+parseInt(this.state.shipping)
    }
    return sum

  }
  confirm=()=>{
    const {orderProduct}=this.props
    this.props.Confirm_Store(this.state.orderNowCus,orderProduct,this.props.user,this.state.shipping,this.totalCart())
    this.setState({
      showAlert:true,
      message:"You have successfully confirm"
    })
  }
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
            <TouchableOpacity
                style={styles.viewCategory}>
                <Text style={styles.textorder}>Name Customer:    
                  <Text> {this.state.orderNowCus.NameCustomer}</Text>
                </Text>
                <Text style={styles.textorder}>PhoneNumber:    
                  <Text> {this.state.orderNowCus.PhoneNumber}</Text>
                </Text>
                <Text style={styles.textorder}>Address:    
                  <Text> {this.state.orderNowCus.Address}</Text>
                </Text>
                <Text style={styles.textorder}>Time:    
                  <Text> {this.state.orderNowCus.Time}</Text>
                </Text>
            </TouchableOpacity>
            <View
              style={styles.viewCategory}>
              <Text style={styles.delivery}>List Product</Text>
                {
                  this.state.orderNowCus.Product.map(product=>{
                    return(
                      <View style={styles.productmap}>
                        <Text style={styles.textProduct}>{product.NameProduct}</Text>
                        <Text style={styles.textProduct}>Quanity: {product.Quanity}</Text>
                      </View>
                    )
                  })
                }
            </View>
            <View
              style={styles.viewCategory}>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
              <Text style={styles.delivery}>Product Order</Text>
              <TouchableOpacity
               onPress={()=>this.props.navigation.navigate(Router.MyProduct)}
                style={styles.buttonAdd}>
                <Ionicons
                  name="add"
                  size={24}
                  color={"white"}
                />
              </TouchableOpacity>
              </View>
              {this.props.orderProduct!=[]&&this.props.orderProduct.map(product=>this.renderProduct({product}))}
             
            </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <View style={styles.direct}>
          <Text style={styles.categoryName}>Shipping fee:</Text>
          <TextInput
            value={this.state.shipping}
            onChangeText={ship=>this.setState({shipping:ship})}
            placeholder={"0"}
            placeholderTextColor={"gray"}
            style={styles.label}
            keyboardType = 'numeric'
          />
          <Text style={styles.price}>  VND</Text>
        </View>
      <Text style={styles.Total}>Total:
        <Text style={styles.price}> {this.totalCart()} VND</Text>
        </Text>
      </View>
      <View style={styles.bottombutton}>
        <TouchableOpacity
          style={styles.cancelbutton}
          onPress={()=>this.props.navigation.goBack()}>
          <Text style={styles.cancel}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>this.confirm()}
          style={styles.addbutton}>
          <Text  style={styles.add}>CONFIRM</Text>
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
  getOrderNowdata:getOrderField(state,'getOrderNow'),
  user:getAuthField(state,"user"),
  orderProduct:getOrderField(state,'orderProduct')
});

const mapDispatchToProps =(dispatch)=> {
    return{
      changeField:bindActionCreators(OrderAction.changeField,dispatch),
      getOrderNow:bindActionCreators(OrderAction.getOrderNow,dispatch),
      Confirm_Store:bindActionCreators(OrderAction.Confirm_Store,dispatch),
      getProductStore:bindActionCreators(ProductAction.getProductStore,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
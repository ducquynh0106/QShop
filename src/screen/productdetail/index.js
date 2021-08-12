import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import styles from './style'
import {connect} from 'react-redux'
import {
  getShopField
} from '../../selector/shop'
import {
  getProductField
} from '../../selector/product'
import {Router} from '../../navigation/route'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import style from './style'
import ProductAction from '../../action/product'
import { bindActionCreators } from 'redux'
import AwesomeAlert from 'react-native-awesome-alerts';

class index extends Component{
  state={
    product:this.props.route.params.product,
    showAlert:false,
    showmessage:false,
    message:"",
  }
  hideAlert = () => {
    this.setState({
      showAlert: false,
      showmessage:false,
      message:""
    });

  };
  renderShop=()=>{
    const {shop}=this.props
    let selectShop=shop.filter(shop=>shop.UID===this.state.product.UID_Store)
    return(
      <View style={[styles.viewProduct,{flexDirection:"row"}]}>
        <Image
          source={{uri:selectShop[0].Image}}
          resizeMethod={"resize"}
          style={styles.imageShop}
        />
        <View style={styles.viewText}>
          <Text style={styles.textName}>{selectShop[0].Name}</Text>
          <View style={{flexDirection:"row", alignSelf:"center"}}>
            <Ionicons
              name="location-sharp"
              size={24}
              color={"gray"}
            />
            <Text style={styles.location}>TP {selectShop[0].City}</Text>  
          </View>
        </View>
        <TouchableOpacity
        onPress={()=>this.props.navigation.navigate(Router.ShopDetail,{shop:selectShop[0]})}
        style={styles.buttonShop}>
          <Text style={styles.textShop}>View Shop</Text>
        </TouchableOpacity>
      </View>
    )
  }
  addToCart=()=>{
    const {shop}=this.props
    let selectShop=shop.filter(shop=>shop.UID===this.state.product.UID_Store)
    this.props.addToCart(this.state.product,selectShop[0].Name)
  }
  async componentWillReceiveProps(nextProps){
    if (nextProps.isLoadingAddToCart === true) {
      console.log(nextProps.error)
        if (nextProps.error===null&&this.state.showmessage===false){
          this.setState({
            message:"You have successfully add to cart"
          },()=>{
           this.setState({showmessage:true},()=>this.renderAlert()) 
          })
        }
        else if (nextProps.error!=null&&this.state.showmessage===false){
          this.setState({
            message:nextProps.error
          },()=> {
           this.setState({showmessage:true},()=>this.renderAlert())
          })
        }
     
     
    }
  }
  renderAlert(){
      this.setState({showAlert:true})
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
          <Text style={styles.textHeader}>Product Detail</Text>
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate(Router.Search)}>
            <FontAwesome
              name="search" 
              size={20} 
              color={"#FF9D0B"} 
              style={styles.searchIcon}       
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
          onPress={()=>this.props.navigation.navigate(Router.Cart)}>
            <FontAwesome
              name="shopping-cart" 
              size={20} 
              color={"#FF9D0B"} 
              style={styles.shopIcon}       
            />
          </TouchableOpacity> */}
        </View>
        <ScrollView
          style={styles.scrollView}>
            <View style={styles.viewCategory}>
              <Image
                  source={{uri:this.state.product.Image}}
                  resizeMethod={"resize"}
                  style={styles.image}
              />
            </View>
            <View style={styles.viewProduct}>
              <Text style={styles.productName}>{this.state.product.Name_Product}</Text>
              <Text style={styles.price}>Price: {this.state.product.Price} VND</Text>
            </View>
            {this.renderShop()}
            <View style={styles.viewDecription}>
              <Text style={[styles.productName,{alignSelf:"flex-start"}]}>Decription:</Text>
              <Text style={[styles.productName,{alignSelf:"flex-start",fontWeight:"800"}]}>{this.state.product.Information}</Text>
            </View>
        </ScrollView>
        <TouchableOpacity 
        onPress={()=>this.addToCart()}
        style={style.buttonCart}>
          <FontAwesome
              name="shopping-cart" 
              size={25} 
              color={"white"} 
              style={styles.shopIcon}       
            />
          <Text style={styles.textCart}>Add To Cart</Text>
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
  shop:getShopField(state,"shop"),
  error:getProductField(state,"error"),
  isLoadingAddToCart:getProductField(state,"isLoadingAddToCart")
});

const mapDispatchToProps =(dispatch)=> {
    return{
     addToCart:bindActionCreators(ProductAction.addToCart,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
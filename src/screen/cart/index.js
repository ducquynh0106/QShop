import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
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


class index extends Component{
  state={
    isSelected:false,
  }
  EditProduct=(UID_Product,UID_Store,type)=>{
    const {cart}=this.props
    let selectCart=cart.findIndex(cart=>cart.UID_Store===UID_Store)
    if (type==="Plus") {this.props.plus(UID_Product,cart[selectCart].UID_Cart)}
    else if (type==="Minus") {this.props.minus(UID_Product,cart[selectCart].UID_Cart)}
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
            <TouchableOpacity
             onPress={()=>this.EditProduct(productItem.UID_Product,selectproduct[0].UID_Store,"Minus")
                                                 }>
              <AntDesign
                name="minuscircleo"
                size={20}
                style={{marginTop:4, marginLeft:4}}
              />
            </TouchableOpacity>
            <View style={styles.textQuanity}>
              <Text>{productItem.Quanity}</Text>
            </View>
            <TouchableOpacity
              onPress={()=>this.EditProduct(productItem.UID_Product,selectproduct[0].UID_Store,"Plus")}>
              <AntDesign
                name="pluscircleo"
                size={20}
                style={{marginTop:4, marginLeft:4}}
              />
            </TouchableOpacity>
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
  componentWillMount(){
    this.props.getCart();
  }
  componentDidMount(){
    this.props.getCart();
  }

  
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
          <Text style={styles.textHeader}>Shopping Cart</Text>
        </View>
        <ScrollView
          style={styles.scrollView}>
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
            onPress={()=>this.props.navigation.navigate(Router.CheckOut)}
            style={styles.buttoncheckout}>
            <Text style={styles.textCheckOut}>Check Out</Text>
          </TouchableOpacity>
        </View>
        
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
      plus:bindActionCreators(CartAction.plus,dispatch),
      minus:bindActionCreators(CartAction.minus,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import styles from './style'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getProductField
} from '../../selector/product'
import ProductAction from '../../action/product'
import {Router} from '../../navigation/route'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

class index extends Component{
  state={
    shop:this.props.route.params.shop,
  } 
  renderProduct=({product})=>{
    let Name=""
    if (product.Name_Product.length>24){
      Name=product.Name_Product.slice(0,24)+'...'
    } else {Name=product.Name_Product}
    return(
    <TouchableOpacity
    onPress={()=>{
      this.props.navigation.navigate(Router.ProductDetail,{product:product})
    }}
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
          <Text style={styles.categoryName}>{Name}</Text>
          <Text style={styles.price}>Price: <Text>
            {product.Price} VND</Text></Text>
          <View style={{flexDirection:"row", alignSelf:"center"}}>
            <Ionicons
              name="location-sharp"
              size={24}
              color={"gray"}
            />
            <Text style={styles.location}>TP {this.state.shop.City}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    )
  }
  componentWillMount(){
    this.props.getProductStore(this.state.shop.UID)
  }
  componentDidMount(){
    this.props.getProductStore(this.state.shop.UID)
  }
  render(){ 
    const {
      productstore,
    }= this.props
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
          <Text style={styles.textHeader}>Shop</Text>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate(Router.SearchShop,{productstore:productstore})}>
            <FontAwesome
              name="search" 
              size={20} 
              color={"#FF9D0B"} 
              style={styles.searchIcon}       
            />
          </TouchableOpacity>
          <TouchableOpacity>
         
            <FontAwesome
              name="shopping-cart" 
              size={20} 
              color={"#FF9D0B"} 
              style={styles.shopIcon}       
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scrollView}>
          <View style={styles.viewShop}>
            <View style={{flexDirection:"row"}}>
              <Image
                  source={{uri:this.state.shop.Image}}
                  resizeMethod={"resize"}
                  style={styles.imageShop}
                />
              <View style={styles.viewText}>
                <Text style={styles.textName}>{this.state.shop.Name}</Text>
                <View style={{flexDirection:"row"}}>
                    <FontAwesome
                      name="phone" 
                      size={16} 
                      color={"black"} 
                      style={styles.phoneIcon} 
                    />
                  <Text style={styles.textName}> {this.state.shop.Phone_Number}</Text>
                </View>  
                <Text style={styles.textName}>Time: 8:00 - 22:00</Text>
              </View>
            </View>
            <View style={{flexDirection:"row", justifyContent:"center", marginTop:8}}>
                  <Ionicons
                    name="location-sharp"
                    size={24}
                    color={"gray"}
                  />
                  <Text style={styles.location}>{this.state.shop.Ward}, {this.state.shop.District}, {this.state.shop.City}</Text>  
                </View>
          </View>
          <View style={styles.viewCategory}>
            <Text style={styles.categories}>PRODUCT</Text>      
          </View>
          {productstore[0].Image!=="" && productstore.map(product=>this.renderProduct({product}))}
        </ScrollView>
    </View>
    ) 
  }
}

const mapStateToProps = state => ({
  productstore:getProductField(state,"productstore"),
});

const mapDispatchToProps =(dispatch)=> {
    return{
      getProductStore:bindActionCreators(ProductAction.getProductStore,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
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
  getAuthField
} from '../../selector/auth'
import {
  getProductField
} from '../../selector/product'
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

class index extends Component{
  state={
    Quanity:0,
    
  }
  renderProduct=({product})=>{
    let Name=""
    if (product.Name_Product.length>24){
      Name=product.Name_Product.slice(0,24)+'...'
    } else {Name=product.Name_Product}
    return(
    <TouchableOpacity
    onPress={()=>{
     this.props.AddProductOrder({UID_Product:product.UID_Product,Quanity:this.state.Quanity,NameProduct:Name,Image:product.Image,Price:product.Price})
     this.props.navigation.navigate(Router.OrderNow_Store)
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
        </View>
      </View>
    </TouchableOpacity>
    )
  }
  componentWillMount(){
    this.props.getProductStore(this.props.user.UID)
  }
  componentDidMount(){
    this.props.getProductStore(this.props.user.UID)
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
          <Text style={styles.textHeader}>My Product</Text>
        </View>
        <ScrollView>
        <View style={styles.viewCategory}>
            <Text style={styles.categories}>PRODUCT</Text>      
          </View>
          {productstore.map(product=>this.renderProduct({product}))}
        </ScrollView>
        
    </View>
    ) 
  }
}

const mapStateToProps = state => ({
  getOrderNowdata:getOrderField(state,'getOrderNow'),
  productstore:getProductField(state,"productstore"),
  user:getAuthField(state,"user")
});

const mapDispatchToProps =(dispatch)=> {
    return{
      changeField:bindActionCreators(OrderAction.changeField,dispatch),
      getOrderNow:bindActionCreators(OrderAction.getOrderNow,dispatch),
      getProductStore:bindActionCreators(ProductAction.getProductStore,dispatch),
      AddProductOrder:bindActionCreators(OrderAction.AddProductOrder,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
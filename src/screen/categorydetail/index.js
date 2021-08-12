import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import styles from './style'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getCategoriesField
} from '../../selector/categories'
import {
  getProductField
} from '../../selector/product'
import {
  getAuthField
} from '../../selector/auth'
import CategoriesAction from '../../action/categories'
import ProductAction from '../../action/product'
import {Router} from '../../navigation/route'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

class index extends Component{
  state={
    UID_Parent:this.props.route.params.UID_Parent,
  }
  renderCategory=()=>{
    const {
      category,
      changeField
    }=this.props
    let UID_Parent=this.state.UID_Parent
    let filterCategory=category.filter(cat=>cat.UID_Parent===UID_Parent)
    return(
      <FlatList
        horizontal
        data={filterCategory}
        renderItem={({item})=>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>changeField("selectCategory",item.UID_Cat)}
            >
              <Text style={styles.categoryName}>{item.Name}</Text>
          </TouchableOpacity>
        }
        keyExtractor={(item,index)=>item.UID_Cat}
      />
    )
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
      style={[styles.viewCategory,{marginBottom:30, marginTop:8}]}
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
            <Text style={styles.location}>TP {this.props.user.City}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    )
  }
  filterProduct=()=>{
    const {
      product,
      selectCategory
    }=this.props
    let filterproduct=product.filter(product=>product.Category===selectCategory)
    return (filterproduct)
  }
  componentWillMount(){
    this.props.getProduct()
  }
  componenDidMount(){
    this.props.getProduct()
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
          <Text style={styles.textHeader}>Home</Text>
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate(Router.Search)}>
            <FontAwesome
              name="search" 
              size={20} 
              color={"#FF9D0B"} 
              style={styles.searchIcon}       
            />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate(Router.Cart)}>
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
            <View style={styles.viewCategory}>
              <Text style={styles.categories}>CATEGORIES</Text>
              <View style={styles.listCategories}>
                {this.renderCategory()}
              </View>
            </View>
            <View style={[styles.viewCategory,{marginTop:16}]}>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={styles.categories}>PRODUCT</Text>
              </View>
            </View>
            {this.props.selectCategory!=""&&
                this.filterProduct().map(product=>this.renderProduct({product}))}
        </ScrollView>
    </View>
    ) 
  }
}

const mapStateToProps = state => ({
  category:getCategoriesField(state,"category"),
  selectCategory:getCategoriesField(state,"selectCategory"),
  product:getProductField(state,"product"),
  user:getAuthField(state,"user")
});

const mapDispatchToProps =(dispatch)=> {
    return{
      changeField:bindActionCreators(CategoriesAction.changeField,dispatch),
      getProduct:bindActionCreators(ProductAction.getProduct,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
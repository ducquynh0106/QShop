import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native'
import styles from './style'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getCategoriesField
} from '../../selector/categories'
import {
  getShopField
} from '../../selector/shop'
import CategoriesAction from '../../action/categories'
import {Router} from '../../navigation/route'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProductAction from '../../action/product'
console.disableYellowBox = true; 
class index extends Component{

  renderCategory=({category})=>{
    return(
      <TouchableOpacity
        onPress={()=>{
          this.props.changeField("selectCategory","")
          this.props.navigation.navigate(Router.CategoryDetail,{UID_Parent:category.UID_Cat})
        }}
        key={category.UID_Cat}
        style={styles.button}>
        <Image
          source={{uri:category.Image}}
          resizeMethod={"resize"}
          style={styles.image}
        />
      <Text style={styles.categoryName}>{category.Name}</Text>
    </TouchableOpacity>
    )
  }
  renderShop=(shop)=>{
    return(
    <TouchableOpacity
        onPress={()=>{
          this.props.navigation.navigate(Router.ShopDetail,{shop:shop})
        }}
        style={styles.buttonShop}>
          <Image
            source={{uri:shop.Image}}
            resizeMethod={"resize"}
            style={styles.imageShop}
          />
          <Text style={styles.categoryName}>{shop.Name}</Text>
          <View style={{flexDirection:"row", alignSelf:"center"}}>
            <Ionicons
              name="location-sharp"
              size={24}
              color={"gray"}
            />
            <Text style={styles.location}>TP {shop.City}</Text>
          </View>
     </TouchableOpacity>
    )
  } 
  render(){
    const {
      categories,
      shop
    }=this.props
    return(
      <View style={styles.container}>
        <View style={styles.header}>
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
                {categories.map(category=>this.renderCategory({category}))}
              </View>
            </View>
            <View style={styles.viewShop}>
              <Text style={styles.categories}>SHOP NEARBY</Text>
              <FlatList
                horizontal
                data={shop}
                keyExtractor={(item,index)=>item.UID}
                renderItem={({item})=>this.renderShop(item)}/>
            </View>
        </ScrollView>
    </View>
    ) 
  }
}

const mapStateToProps = state => ({
  categories:getCategoriesField(state,"categories"),
  shop:getShopField(state,"shop")
});

const mapDispatchToProps =(dispatch)=> {
    return{
      getCategories:bindActionCreators(CategoriesAction.getCategories,dispatch),
      changeField:bindActionCreators(CategoriesAction.changeField,dispatch),
      getProductStore:bindActionCreators(ProductAction.getProductStore,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
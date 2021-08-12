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
import auth from '@react-native-firebase/auth'

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
    <View 
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
      <View style={styles.bottombutton}>
        <TouchableOpacity
          style={styles.cancelbutton}
          onPress={()=>this.handleDeleteProduct({product})}>
          <Text style={styles.cancel}>DELETE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>this.handleEditProduct({product})}
          style={styles.addbutton}>
          <Text  style={styles.add}>EDIT</Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
  handleEditProduct=({product})=>{
    this.props.changeProductField("productform",product)
    this.props.changeProductField("isLoadingEdit",false)
    this.props.navigation.navigate(Router.EditProduct)
  }
  handleAddProduct=()=>{
    this.props.changeProductField("isLoadingAdd",false)
    this.props.navigation.navigate(Router.AddProduct)
  }
  handleDeleteProduct=({product})=>{
    this.props.deleteProduct(product.UID_Product)
  }
  filterProduct=()=>{
    const {
      productstore,
      selectCategory
    }=this.props
    let filterproduct=productstore.filter(product=>product.Category===selectCategory)
    return (filterproduct)
  }
  componentWillMount(){
    this.props.getProductStore(auth().currentUser.uid)
  }
  componenDidMount(){
    this.props.getProductStore(auth().currentUser.uid)
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
          <Text style={styles.textHeader}>Product Manager</Text>
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
                {this.props.selectCategory!=""&&
                  <TouchableOpacity
                    onPress={()=>this.handleAddProduct()}
                    style={styles.buttonAdd}>
                    <Ionicons
                      name="add"
                      size={24}
                      color={"white"}
                    />
                  </TouchableOpacity>}
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
  productstore:getProductField(state,"productstore"),
  user:getAuthField(state,"user")
});

const mapDispatchToProps =(dispatch)=> {
    return{
      changeField:bindActionCreators(CategoriesAction.changeField,dispatch),
      changeProductField:bindActionCreators(ProductAction.changeField,dispatch),
      getProduct:bindActionCreators(ProductAction.getProduct,dispatch),
      getProductStore:bindActionCreators(ProductAction.getProductStore,dispatch),
      deleteProduct:bindActionCreators(ProductAction.deleteProduct,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
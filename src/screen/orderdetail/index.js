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
  getCategoriesField
} from '../../selector/categories'
import CategoriesAction from '../../action/categories'
import OrderAction from '../../action/order'
import {Router} from '../../navigation/route'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  getProductField
} from '../../selector/product'

class index extends Component{
  state={
    orderdetail:this.props.route.params.orderdetail,
  }
  renderProduct=({productItem})=>{
    const {product}=this.props
    let selectproduct=product.filter(productx=>productx.UID_Product===productItem.UID_Product)
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
          <Text style={styles.categoryName}>Quanity: {productItem.Quanity}</Text>
        </View>
      </View>
    </TouchableOpacity>
    )
  }
  totalCart=()=>{
    const {product}=this.props
    let selectproduct
    let sum=0
    if (this.state.orderdetail!=null) {
      this.state.orderdetail.Product.forEach(pro=>{
          selectproduct=product.filter(product=>product.UID_Product===pro.UID_Product)
          sum=selectproduct[0].Price*pro.Quanity+sum
        })
    }
    return sum

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
          <Text style={styles.textHeader}>Order Detail</Text>
        </View>
        <ScrollView
          style={styles.scrollView}>
            <View style={styles.viewCategory}>
            <Text style={styles.categories}>Name Customer:    
                       <Text> {this.state.orderdetail.NameCustomer}</Text>
                     </Text>
                     <Text style={styles.categories}>PhoneNumber:    
                       <Text> {this.state.orderdetail.PhoneNumber}</Text>
                     </Text>
                     <Text style={styles.categories}>Address:    
                       <Text> {this.state.orderdetail.Address}</Text>
                     </Text>
                     <Text style={styles.categories}>Name Store:    
                       <Text> {this.state.orderdetail.Name_Store}</Text>
                     </Text>
                     <Text style={styles.categories}>Time:    
                       <Text> {this.state.orderdetail.Time}</Text>
                     </Text>
            </View>
            
            <View
              style={styles.viewCategory}>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
              <Text style={styles.delivery}>Product</Text>
              </View>
              {this.state.orderdetail.Product!=[]&&this.state.orderdetail.Product.map(productItem=>this.renderProduct({productItem}))}
             
            </View>
        </ScrollView>
        <View style={styles.bottomView}>
      <Text style={styles.Total}>Total:
        <Text style={styles.price}> {this.totalCart()} VND</Text>
        </Text>
      </View>
      <TouchableOpacity 
      onPress={()=>{
        this.props.DeleteOrder(this.state.orderdetail.UID_Order)
        this.props.navigation.goBack()
      }
       
      }
        style={styles.buttonCart}>
          <Text style={styles.textCart}>DELETE</Text>
        </TouchableOpacity>
    </View>
    ) 
  }
}

const mapStateToProps = state => ({
  categories:getCategoriesField(state,"categories"),
  product:getProductField(state,"product"),
});

const mapDispatchToProps =(dispatch)=> {
    return{
      getCategories:bindActionCreators(CategoriesAction.getCategories,dispatch),
      changeField:bindActionCreators(CategoriesAction.changeField,dispatch),
      DeleteOrder:bindActionCreators(OrderAction.deleteOrder,dispatch),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(index);
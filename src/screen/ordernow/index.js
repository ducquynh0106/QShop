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
import {
  getOrderField
} from '../../selector/order'
import OrderAction from '../../action/order'
import CategoriesAction from '../../action/categories'
import {Router} from '../../navigation/route'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProductAction from '../../action/product'
import AntDesign from 'react-native-vector-icons/AntDesign'
import order from '../../action/order'

class index extends Component{
  componentWillMount(){
    this.props.getOrderNow();
  }
  componentDidMount(){
    this.props.getOrderNow();
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Order Now</Text>
        </View>
      <ScrollView
          style={styles.scrollView}>
            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
            <TouchableOpacity
            onPress={()=>{
              this.props.getOrderNow();
            }}
            style={styles.viewCategory}>
              <Text style={styles.categories}>Order Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              this.props.navigation.navigate(Router.MyOrder_Cus)
              this.props.getMyOrderCus()
            }}
            style={[styles.viewCategory,{flexDirection:"row",justifyContent:"space-between"}]}>
              <Text style={styles.categories}>My Order</Text>
            </TouchableOpacity>
            </View>
            
            {this.props.getOrderNowdata!=null&&
              this.props.getOrderNowdata.map(orderNowdata=>{
                return(
                  <TouchableOpacity
                    onPress={()=>{
                      this.props.navigation.navigate(Router.OrderNow_Store,{orderNowCus:orderNowdata})
                      this.props.changeField('orderProduct',[])
                    }}
                    key={orderNowdata.UID_Order}
                   
                      style={styles.viewCategory}>
                      <Text style={styles.textorder}>Name Customer:    
                        <Text> {orderNowdata.NameCustomer}</Text>
                      </Text>
                      <Text style={styles.textorder}>PhoneNumber:    
                        <Text> {orderNowdata.PhoneNumber}</Text>
                      </Text>
                      <Text style={styles.textorder}>Address:    
                        <Text> {orderNowdata.Address}</Text>
                      </Text>
                      <Text style={styles.textorder}>Time:    
                        <Text> {orderNowdata.Time}</Text>
                      </Text>
                  </TouchableOpacity>
                )
              })
            }
      </ScrollView>
      <TouchableOpacity 
        onPress={()=>
        {
          this.props.navigation.navigate(Router.AddOrder)
          this.props.changeField('orderNow',[])
        }}
        style={styles.buttonCart}>
          <Text style={styles.textCart}>ADD ORDER</Text>
        </TouchableOpacity>
    </View>
    ) 
  }
}

const mapStateToProps = state => ({
  getOrderNowdata:getOrderField(state,'getOrderNow')
});

const mapDispatchToProps =(dispatch)=> {
    return{
      changeField:bindActionCreators(OrderAction.changeField,dispatch),
      getOrderNow:bindActionCreators(OrderAction.getOrderNow,dispatch),
      getMyOrderCus:bindActionCreators(OrderAction.getMyOrderCus,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
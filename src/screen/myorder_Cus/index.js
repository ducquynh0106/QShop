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

class index extends Component{
  componentWillMount(){
    this.props.getMyOrderCus();
  }
  componentDidMount(){
    this.props.getMyOrderCus();
  }
  filterMyOrder_Cus=()=>{
    this.props.MyOrder_Cus!=[]&&
    this.props.MyOrder_Cus.sort(function(a,b){return a.Total-b.Total})
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
            onPress={()=>this.props.navigation.navigate(Router.OrderNow)}
            style={[styles.viewCategory,{flexDirection:"row",justifyContent:"space-between"}]}>
              
              <Text style={styles.categories}>Order Now</Text>
             
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>this.props.getMyOrderCus()}
              style={[styles.viewCategory,{flexDirection:"row",justifyContent:"space-between"}]}>
              <Text style={styles.categories}>My Order</Text>
             
            </TouchableOpacity>
            </View>
            {this.filterMyOrder_Cus()}
            {this.props.MyOrder_Cus!=[]&&
              this.props.MyOrder_Cus.map(MyOrder_Cusdata=>{
                return(
                  <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate(Router.MyOrder_CusDetail,{myorder_cus:MyOrder_Cusdata})}
                    key={MyOrder_Cusdata.UID_Order}
                      style={styles.viewCategory}>
                      <Text style={styles.textorder}>NameStore:    
                        <Text> {MyOrder_Cusdata.NameStore}</Text>
                      </Text>
                      <Text style={styles.textorder}>PhoneNumber:    
                        <Text> {MyOrder_Cusdata.PhoneNumberStore}</Text>
                      </Text>
                      <Text style={styles.textorder}>AddressStore:    
                        <Text> {MyOrder_Cusdata.AddressStore}</Text>
                      </Text>
                      <Text style={styles.textorder}>Time:    
                        <Text> {MyOrder_Cusdata.Time}</Text>
                      </Text>
                      <Text style={styles.textorder}>Total:    
                        <Text> {MyOrder_Cusdata.Total} VND</Text>
                      </Text>
                  </TouchableOpacity>
                )
              })
            }
      </ScrollView>
     
    </View>
    ) 
  }
}

const mapStateToProps = state => ({
  getOrderNowdata:getOrderField(state,'getOrderNow'),
  MyOrder_Cus:getOrderField(state,'MyOrder_Cus')
});

const mapDispatchToProps =(dispatch)=> {
    return{
      changeField:bindActionCreators(OrderAction.changeField,dispatch),
      getOrderNow:bindActionCreators(OrderAction.getOrderNow,dispatch),
      getMyOrderCus:bindActionCreators(OrderAction.getMyOrderCus,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);